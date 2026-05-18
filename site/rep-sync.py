#!/usr/bin/env python3
"""
Safe read-modify-write helper for the rep-locator jsonbin.

jsonbin is the source of truth for live rep data — admin "Save to Cloud"
edits live there, and the page falls back to defaultRepData() in
find-a-rep.html only if jsonbin is unreachable.

DO NOT PUT defaultRepData() directly to the bin — that overwrites every
in-browser admin edit since the last code sync. Always:
  1. GET the current bin
  2. Mutate only the field you want to change
  3. PUT the result back

Usage examples (edit the `mutate` function below for one-shot fixes):

  python3 site/rep-sync.py --dry-run     # preview what would change
  python3 site/rep-sync.py                # apply the change

The bin id + master key are embedded in find-a-rep.html and are already
client-readable, so they're safe to keep here.
"""
import argparse
import json
import sys
import urllib.request

BIN_ID = "69bc4cd6aa77b81da9fd805e"
KEY    = "$2a$10$R1cylWk2DnScmcNByb85puFMEA.mHscaOdY4tke8wcJEZRxVMuqrS"


_HEADERS = {
    "X-Master-Key": KEY,
    "User-Agent": "rep-sync.py/1.0",
}


def fetch_current() -> dict:
    req = urllib.request.Request(
        f"https://api.jsonbin.io/v3/b/{BIN_ID}/latest",
        headers=_HEADERS,
    )
    return json.loads(urllib.request.urlopen(req).read())["record"]


def put_updated(data: dict) -> int:
    req = urllib.request.Request(
        f"https://api.jsonbin.io/v3/b/{BIN_ID}",
        data=json.dumps(data).encode(),
        method="PUT",
        headers={**_HEADERS, "Content-Type": "application/json"},
    )
    return urllib.request.urlopen(req).status


def mutate(data: dict) -> dict:
    """Edit this function for one-shot maintenance fixes, then run the script.

    Past applied changes (left as recipe templates, not active):

      # Remove a contact from the Ohio Territory rep
      data["reps"]["ohio"]["contacts"] = [
          c for c in data["reps"]["ohio"]["contacts"]
          if "winar" not in c.get("name", "").lower()
      ]

      # Add a contact to an existing rep
      data["reps"]["ohio"]["contacts"].append({
          "name": "Riffle & Associates",
          "office": "513-771-0002",
          "phone": "513-771-0002",
          "email": "riffle@riffleassoc.com",
      })
    """
    return data


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="print diff and exit without PUTting")
    args = ap.parse_args()

    before = fetch_current()
    after  = mutate(json.loads(json.dumps(before)))  # deep copy

    if before == after:
        print("No changes — mutate() returned the data unchanged.")
        return 0

    print("--- before ---")
    print(json.dumps(before, indent=2))
    print("--- after ---")
    print(json.dumps(after, indent=2))

    if args.dry_run:
        print("\nDry run — not PUTting.")
        return 0

    status = put_updated(after)
    print(f"\nPUT → HTTP {status}")
    return 0 if status == 200 else 1


if __name__ == "__main__":
    sys.exit(main())
