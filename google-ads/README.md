# Google Ads-koppeling (MENT4L)

Campagnes programmatisch aanmaken en beheren via de officiële Google Ads API
(`google-ads` Python-library, v25). Zelfde secrets-patroon als Hostinger:
alle geheimen in `secrets/google-ads.env` (niet in de repo).

## Wat zit hier

| Bestand | Doel |
|---|---|
| `client.py` | Bouwt een geauthenticeerde `GoogleAdsClient` uit `secrets/google-ads.env` |
| `generate_refresh_token.py` | Eenmalige OAuth-flow → refresh token |
| `list_accessible_customers.py` | Sanity-check: welke accounts kan het token bereiken |
| `create_search_campaign.py` | Complete Search-campagne uit één JSON-spec (dry-run + PAUSED by default) |
| `campaigns/*.json` | Campagne-specs |

## Veiligheid (belangrijk)

- `create_search_campaign.py` draait **standaard in dry-run**: valideert de hele
  campagne bij Google zónder iets aan te maken. Pas met `--live` wordt echt
  aangemaakt.
- Campagnes worden **standaard PAUSED** aangemaakt. Er loopt dus nooit budget
  weg tot jij ze bewust op ENABLED zet.
- De hele campagne wordt in één atomische call gebouwd: alles-of-niets.

## Eenmalige setup

### 0. Installeer dependencies
```bash
pip install -r google-ads/requirements.txt
```

### 1. Manager-account (MCC) + developer token
Een developer token kan alleen vanuit een **Manager-account (MCC)**.
1. Maak (gratis) een MCC aan: https://ads.google.com/home/tools/manager-accounts/
2. Koppel je bestaande Ads-account onder de MCC.
3. Ga naar het **API Center**: https://ads.google.com/aw/apicenter (ingelogd op de MCC),
   accepteer de voorwaarden → je krijgt een **developer token** (start op *Test*).
4. Vraag **Basic access** aan via het API Center (drop-down bij Access level).
   Goedkeuring duurt doorgaans 1–3 werkdagen; met de brand-verification pilot
   (sinds juli 2026) soms enkele uren. **Zonder Basic access werkt het token
   alleen op testaccounts** — geen echte campagnes.

> Zet het token vast in `secrets/google-ads.env` als `GOOGLE_ADS_DEVELOPER_TOKEN`
> en de MCC-id als `GOOGLE_ADS_LOGIN_CUSTOMER_ID` (cijfers, zonder streepjes).

### 2. OAuth-credentials (Google Cloud Console)
1. Maak/kies een project: https://console.cloud.google.com/
2. Schakel de **Google Ads API** in (APIs & Services → Library).
3. Configureer het **OAuth consent screen** (External, jouw Google-account als testgebruiker).
4. Maak **OAuth client-ID** aan, type **Desktop app**.
5. Zet `client_id` en `client_secret` in `secrets/google-ads.env`.

### 3. Refresh token
```bash
python google-ads/generate_refresh_token.py
```
Er opent een browser; jij logt in en klikt op *Toestaan*. Plak het geprinte
token in `secrets/google-ads.env` als `GOOGLE_ADS_REFRESH_TOKEN`.

### 4. Doel-account instellen
Zet in `secrets/google-ads.env` de `GOOGLE_ADS_CUSTOMER_ID` = het advertentie-
account (10 cijfers, zonder streepjes) waarop je campagnes wilt maken.

### 5. Test de keten
```bash
python google-ads/list_accessible_customers.py
```
Zie je je account-id's? Dan staat de hele auth-keten goed.

## Campagne aanmaken

1. Kopieer `campaigns/voorbeeld-campagne.json` en vul echte teksten in
   (headlines ≤ 30 tekens, descriptions ≤ 90 tekens).
2. Valideer (dry-run, maakt niets aan):
   ```bash
   python google-ads/create_search_campaign.py google-ads/campaigns/mijn-campagne.json
   ```
3. Echt aanmaken (blijft PAUSED tot je `"status": "ENABLED"` zet):
   ```bash
   python google-ads/create_search_campaign.py google-ads/campaigns/mijn-campagne.json --live
   ```

### Handige constanten
- `locations`: geo target constant-id's. **2528 = Nederland**.
- `languages`: language constant-id's. **1010 = Nederlands**.
- Budget/bod in euro's in de spec; de code rekent om naar micros.

## Referentie
- Onboarding: https://developers.google.com/google-ads/api/docs/get-started/onboarding
- Developer token / access levels: https://developers.google.com/google-ads/api/docs/api-policy/access-levels
- Library: https://github.com/googleads/google-ads-python
