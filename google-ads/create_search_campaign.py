"""
Maak een complete Search-campagne aan vanuit 1 JSON-spec.

Alles wordt in EEN atomische API-call gebouwd (budget -> campagne -> adgroep ->
keywords -> advertentie) met tijdelijke resource-namen. Dat betekent:
alles-of-niets, en we kunnen de hele bouw eerst valideren zonder iets aan te
maken (validate_only).

VEILIGHEID:
  * Standaard DRY-RUN: er wordt niets aangemaakt, alleen gevalideerd.
    Voeg --live toe om echt aan te maken.
  * Campagnes worden standaard PAUSED aangemaakt, zodat er nooit per ongeluk
    budget wegloopt. Zet in de spec "status": "ENABLED" om live te gaan.

Gebruik:
    python google-ads/create_search_campaign.py google-ads/campaigns/voorbeeld.json
    python google-ads/create_search_campaign.py google-ads/campaigns/voorbeeld.json --live

JSON-spec: zie google-ads/campaigns/voorbeeld-campagne.json
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

from client import get_client


def _eur_to_micros(eur: float) -> int:
    return int(round(float(eur) * 1_000_000))


def _load_spec(path: str) -> dict:
    spec = json.loads(Path(path).read_text(encoding="utf-8"))
    # Minimale validatie met vriendelijke foutmeldingen.
    required = ["campaign_name", "daily_budget_eur", "final_url", "keywords", "ad"]
    missing = [k for k in required if k not in spec]
    if missing:
        raise SystemExit(f"Spec mist verplichte velden: {', '.join(missing)}")

    headlines = spec["ad"].get("headlines", [])
    descriptions = spec["ad"].get("descriptions", [])
    if len(headlines) < 3:
        raise SystemExit("Advertentie heeft minimaal 3 headlines nodig (max 15).")
    if len(descriptions) < 2:
        raise SystemExit("Advertentie heeft minimaal 2 descriptions nodig (max 4).")
    for h in headlines:
        if len(h) > 30:
            print(f"  ! Waarschuwing: headline > 30 tekens wordt geweigerd: {h!r}")
    for d in descriptions:
        if len(d) > 90:
            print(f"  ! Waarschuwing: description > 90 tekens wordt geweigerd: {d!r}")
    if not spec["keywords"]:
        raise SystemExit("Geef minstens 1 keyword op.")
    return spec


def build_operations(client, customer_id: str, spec: dict) -> list:
    """Bouw de lijst MutateOperations in afhankelijkheids-volgorde."""
    ops = []

    # Tijdelijke (negatieve) resource-namen; de API lost ze binnen 1 call op.
    budget_rn = client.get_service("CampaignBudgetService").campaign_budget_path(
        customer_id, "-1"
    )
    campaign_rn = client.get_service("CampaignService").campaign_path(
        customer_id, "-2"
    )
    adgroup_rn = client.get_service("AdGroupService").ad_group_path(
        customer_id, "-3"
    )

    # 1) Budget (dagbudget) --------------------------------------------------
    op = client.get_type("MutateOperation")
    budget = op.campaign_budget_operation.create
    budget.resource_name = budget_rn
    budget.name = f"{spec['campaign_name']} - budget"
    budget.delivery_method = client.enums.BudgetDeliveryMethodEnum.STANDARD
    budget.amount_micros = _eur_to_micros(spec["daily_budget_eur"])
    budget.explicitly_shared = False
    ops.append(op)

    # 2) Campagne ------------------------------------------------------------
    op = client.get_type("MutateOperation")
    campaign = op.campaign_operation.create
    campaign.resource_name = campaign_rn
    campaign.name = spec["campaign_name"]
    campaign.campaign_budget = budget_rn
    campaign.advertising_channel_type = (
        client.enums.AdvertisingChannelTypeEnum.SEARCH
    )
    # Standaard PAUSED tenzij de spec expliciet ENABLED zegt.
    status = str(spec.get("status", "PAUSED")).upper()
    campaign.status = client.enums.CampaignStatusEnum[status]
    # Handmatige CPC: voorspelbaar en werkt zonder conversietracking.
    campaign.manual_cpc = client.get_type("ManualCpc")
    # Netwerk: Google Search aan; zoekpartners standaard uit; display uit.
    campaign.network_settings.target_google_search = True
    campaign.network_settings.target_search_network = bool(
        spec.get("target_search_network", False)
    )
    campaign.network_settings.target_content_network = False
    campaign.network_settings.target_partner_search_network = False
    ops.append(op)

    # 3) Locatie- en taal-targeting (campaign criteria) ----------------------
    for geo_id in spec.get("locations", ["2528"]):  # 2528 = Nederland
        op = client.get_type("MutateOperation")
        crit = op.campaign_criterion_operation.create
        crit.campaign = campaign_rn
        crit.location.geo_target_constant = f"geoTargetConstants/{geo_id}"
        ops.append(op)
    for lang_id in spec.get("languages", ["1010"]):  # 1010 = Nederlands
        op = client.get_type("MutateOperation")
        crit = op.campaign_criterion_operation.create
        crit.campaign = campaign_rn
        crit.language.language_constant = f"languageConstants/{lang_id}"
        ops.append(op)

    # 4) Adgroep -------------------------------------------------------------
    op = client.get_type("MutateOperation")
    ad_group = op.ad_group_operation.create
    ad_group.resource_name = adgroup_rn
    ad_group.name = spec.get("ad_group_name", f"{spec['campaign_name']} - adgroep")
    ad_group.campaign = campaign_rn
    ad_group.type_ = client.enums.AdGroupTypeEnum.SEARCH_STANDARD
    ad_group.status = client.enums.AdGroupStatusEnum.ENABLED
    ad_group.cpc_bid_micros = _eur_to_micros(spec.get("default_cpc_bid_eur", 1.0))
    ops.append(op)

    # 5) Keywords ------------------------------------------------------------
    for kw in spec["keywords"]:
        text = kw["text"] if isinstance(kw, dict) else str(kw)
        match = (kw.get("match") if isinstance(kw, dict) else "PHRASE") or "PHRASE"
        op = client.get_type("MutateOperation")
        crit = op.ad_group_criterion_operation.create
        crit.ad_group = adgroup_rn
        crit.status = client.enums.AdGroupCriterionStatusEnum.ENABLED
        crit.keyword.text = text
        crit.keyword.match_type = client.enums.KeywordMatchTypeEnum[match.upper()]
        ops.append(op)

    # 6) Responsive Search Ad ------------------------------------------------
    op = client.get_type("MutateOperation")
    ad_group_ad = op.ad_group_ad_operation.create
    ad_group_ad.ad_group = adgroup_rn
    ad_group_ad.status = client.enums.AdGroupAdStatusEnum.ENABLED
    ad_group_ad.ad.final_urls.append(spec["final_url"])
    rsa = ad_group_ad.ad.responsive_search_ad
    for headline in spec["ad"]["headlines"]:
        asset = client.get_type("AdTextAsset")
        asset.text = headline
        rsa.headlines.append(asset)
    for description in spec["ad"]["descriptions"]:
        asset = client.get_type("AdTextAsset")
        asset.text = description
        rsa.descriptions.append(asset)
    if spec["ad"].get("path1"):
        rsa.path1 = spec["ad"]["path1"]
    if spec["ad"].get("path2"):
        rsa.path2 = spec["ad"]["path2"]
    ops.append(op)

    return ops


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    live = "--live" in sys.argv
    if not args:
        raise SystemExit(
            "Gebruik: python google-ads/create_search_campaign.py <spec.json> [--live]"
        )

    spec = _load_spec(args[0])
    client, customer_id = get_client()
    if not customer_id:
        raise SystemExit(
            "Geen GOOGLE_ADS_CUSTOMER_ID ingesteld (het account waarop we werken)."
        )

    operations = build_operations(client, customer_id, spec)
    ga_service = client.get_service("GoogleAdsService")

    dry_run = not live
    mode = "DRY-RUN (valideren, niets aanmaken)" if dry_run else "LIVE (echt aanmaken)"
    print(f"\nModus: {mode}")
    print(f"Account: {customer_id}")
    print(f"Campagne: {spec['campaign_name']}  |  status: {spec.get('status', 'PAUSED')}")
    print(f"Dagbudget: EUR {spec['daily_budget_eur']}  |  operaties: {len(operations)}\n")

    from google.ads.googleads.errors import GoogleAdsException

    request = client.get_type("MutateGoogleAdsRequest")
    request.customer_id = customer_id
    request.mutate_operations = operations
    request.validate_only = dry_run
    request.partial_failure = False

    try:
        response = ga_service.mutate(request=request)
    except GoogleAdsException as ex:
        print("FOUT bij het valideren/aanmaken van de campagne:")
        for error in ex.failure.errors:
            print(f"  - {error.message}")
            if error.location:
                for fpe in error.location.field_path_elements:
                    print(f"      veld: {fpe.field_name}")
        sys.exit(1)

    if dry_run:
        print("Dry-run OK: de campagne is geldig. Draai met --live om aan te maken.")
        return

    print("Aangemaakt:")
    for res in response.mutate_operation_responses:
        # Elk resultaat zit in de oneof 'response'; pak het gezette veld generiek.
        which = res._pb.WhichOneof("response")
        if which:
            result = getattr(res, which)
            print(f"  - {which}: {result.resource_name}")


if __name__ == "__main__":
    main()
