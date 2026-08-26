"""
Eenmalig: haal een OAuth refresh token op voor de Google Ads API.

Wanneer draai je dit? Nadat je in Google Cloud Console een OAuth-client
(type: Desktop app) hebt aangemaakt en de client_id + client_secret in
secrets/google-ads.env hebt gezet.

Draai:
    python google-ads/generate_refresh_token.py

Er opent een browser. Jij logt in met het Google-account dat toegang heeft
tot het Ads-account en klikt op 'Toestaan'. Daarna print dit script het
refresh token, dat je in secrets/google-ads.env zet als
GOOGLE_ADS_REFRESH_TOKEN.

Belangrijk: JIJ autoriseert in de browser. Ik (Claude) voer nooit je
wachtwoord in.
"""

from __future__ import annotations

from pathlib import Path

from client import _load_env  # zelfde env-loader hergebruiken

SCOPES = ["https://www.googleapis.com/auth/adwords"]


def main() -> None:
    from google_auth_oauthlib.flow import InstalledAppFlow

    env = _load_env()
    client_id = env.get("GOOGLE_ADS_CLIENT_ID")
    client_secret = env.get("GOOGLE_ADS_CLIENT_SECRET")

    if not client_id or not client_secret:
        raise SystemExit(
            "Zet eerst GOOGLE_ADS_CLIENT_ID en GOOGLE_ADS_CLIENT_SECRET in "
            "secrets/google-ads.env (uit je OAuth 'Desktop app' client)."
        )

    client_config = {
        "installed": {
            "client_id": client_id,
            "client_secret": client_secret,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "redirect_uris": ["http://localhost"],
        }
    }

    flow = InstalledAppFlow.from_client_config(client_config, scopes=SCOPES)
    # Opent een browser, vangt de redirect lokaal op een vrije poort.
    creds = flow.run_local_server(
        port=0,
        access_type="offline",
        prompt="consent",  # forceer refresh token, ook bij eerdere toestemming
    )

    print("\n===================================================")
    print("Refresh token opgehaald. Zet deze in secrets/google-ads.env:\n")
    print(f"GOOGLE_ADS_REFRESH_TOKEN={creds.refresh_token}")
    print("===================================================\n")

    env_path = Path(__file__).resolve().parent.parent / "secrets" / "google-ads.env"
    print(f"(Bestand: {env_path})")


if __name__ == "__main__":
    main()
