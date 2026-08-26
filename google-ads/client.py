"""
Bouwt een geauthenticeerde GoogleAdsClient uit secrets/google-ads.env.

Zelfde patroon als de Hostinger-koppeling: alle geheimen in een .env-bestand
onder secrets/, nooit in de repo. Dit bestand levert 1 ding: get_client().

Vereiste env-variabelen (zie secrets/google-ads.env.example):
    GOOGLE_ADS_DEVELOPER_TOKEN   developer token uit het API Center (MCC)
    GOOGLE_ADS_CLIENT_ID         OAuth client id  (Google Cloud Console)
    GOOGLE_ADS_CLIENT_SECRET     OAuth client secret
    GOOGLE_ADS_REFRESH_TOKEN     refresh token (via generate_refresh_token.py)
    GOOGLE_ADS_LOGIN_CUSTOMER_ID manager-account (MCC) id, cijfers zonder streepjes
    GOOGLE_ADS_CUSTOMER_ID       het advertentie-account waarop we werken (cijfers)
"""

from __future__ import annotations

import os
from pathlib import Path

# secrets/google-ads.env staat een niveau boven deze map (repo-root/secrets).
_REPO_ROOT = Path(__file__).resolve().parent.parent
_ENV_PATH = _REPO_ROOT / "secrets" / "google-ads.env"


def _load_env(path: Path = _ENV_PATH) -> dict[str, str]:
    """Minimale .env-parser (geen extra dependency). KEY=value per regel."""
    values: dict[str, str] = {}
    if path.exists():
        for raw in path.read_text(encoding="utf-8").splitlines():
            line = raw.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, val = line.partition("=")
            values[key.strip()] = val.strip().strip('"').strip("'")
    # Env-variabelen uit de shell winnen van het bestand (handig voor CI).
    for key in list(values) + [
        "GOOGLE_ADS_DEVELOPER_TOKEN",
        "GOOGLE_ADS_CLIENT_ID",
        "GOOGLE_ADS_CLIENT_SECRET",
        "GOOGLE_ADS_REFRESH_TOKEN",
        "GOOGLE_ADS_LOGIN_CUSTOMER_ID",
        "GOOGLE_ADS_CUSTOMER_ID",
    ]:
        if os.environ.get(key):
            values[key] = os.environ[key]
    return values


def _digits(value: str | None) -> str:
    """Customer-id's moeten cijfers-only zijn (streepjes eruit)."""
    return "".join(ch for ch in (value or "") if ch.isdigit())


def get_client():
    """Return (GoogleAdsClient, target_customer_id).

    target_customer_id is het account waarop je campagnes aanmaakt
    (GOOGLE_ADS_CUSTOMER_ID). De login/MCC gaat als login_customer_id mee.
    """
    from google.ads.googleads.client import GoogleAdsClient  # lazy import

    env = _load_env()

    missing = [
        k
        for k in (
            "GOOGLE_ADS_DEVELOPER_TOKEN",
            "GOOGLE_ADS_CLIENT_ID",
            "GOOGLE_ADS_CLIENT_SECRET",
            "GOOGLE_ADS_REFRESH_TOKEN",
        )
        if not env.get(k)
    ]
    if missing:
        raise SystemExit(
            "Ontbrekende velden in secrets/google-ads.env: "
            + ", ".join(missing)
            + "\nZie google-ads/README.md voor de setup."
        )

    login_customer_id = _digits(env.get("GOOGLE_ADS_LOGIN_CUSTOMER_ID"))
    target_customer_id = _digits(env.get("GOOGLE_ADS_CUSTOMER_ID")) or login_customer_id

    config: dict[str, object] = {
        "developer_token": env["GOOGLE_ADS_DEVELOPER_TOKEN"],
        "client_id": env["GOOGLE_ADS_CLIENT_ID"],
        "client_secret": env["GOOGLE_ADS_CLIENT_SECRET"],
        "refresh_token": env["GOOGLE_ADS_REFRESH_TOKEN"],
        "use_proto_plus": True,
    }
    if login_customer_id:
        config["login_customer_id"] = login_customer_id

    client = GoogleAdsClient.load_from_dict(config)
    return client, target_customer_id


if __name__ == "__main__":
    # Snelle sanity-check: laadt de client zonder een call te doen.
    _client, _cid = get_client()
    print(f"OK - client geladen. Doel-account: {_cid or '(nog niet ingesteld)'}")
