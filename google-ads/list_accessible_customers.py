"""
Sanity-check: welke Google Ads-accounts kan dit token bereiken?

Draai dit als eerste echte API-call nadat de credentials staan. Als dit
werkt, is de hele auth-keten (developer token, OAuth, MCC) in orde.

    python google-ads/list_accessible_customers.py
"""

from __future__ import annotations

from client import get_client


def main() -> None:
    client, _customer_id = get_client()
    customer_service = client.get_service("CustomerService")

    accessible = customer_service.list_accessible_customers()
    resource_names = list(accessible.resource_names)

    if not resource_names:
        print("Geen toegankelijke accounts gevonden voor dit token.")
        return

    print(f"Toegankelijke accounts ({len(resource_names)}):")
    for name in resource_names:
        # name is 'customers/1234567890'
        cid = name.split("/")[-1]
        print(f"  - {cid}")


if __name__ == "__main__":
    main()
