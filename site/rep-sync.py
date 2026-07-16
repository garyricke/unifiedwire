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
import datetime as dt
import json
import sys
import urllib.request
from pathlib import Path

BIN_ID = "69bc4cd6aa77b81da9fd805e"
KEY    = "$2a$10$R1cylWk2DnScmcNByb85puFMEA.mHscaOdY4tke8wcJEZRxVMuqrS"
SNAPSHOT_DIR = Path(__file__).resolve().parent / "rep-data-snapshots"


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

    Recipe templates (uncomment and adapt for the next change):

      # Add a contact to an existing rep
      data["reps"]["ohio"]["contacts"].append({
          "name": "Riffle & Associates",
          "office": "513-771-0002",
          "phone": "513-771-0002",
          "email": "riffle@riffleassoc.com",
      })

      # Remove a contact by name match
      data["reps"]["ohio"]["contacts"] = [
          c for c in data["reps"]["ohio"]["contacts"]
          if "winar" not in c.get("name", "").lower()
      ]

      # Add states to an existing rep (idempotent)
      for s in ["Alabama", "Mississippi", "Arkansas"]:
          if s not in data["reps"]["james"]["states"]:
              data["reps"]["james"]["states"].append(s)

      # Promote a contact to its own standalone rep, ordered after HQ
      new_reps = {}
      for key, value in data["reps"].items():
          new_reps[key] = value
          if key == "hq":
              new_reps["riffle"] = {
                  "name": "Riffle & Associates",
                  "address": "",
                  "contacts": [{"name": "Riffle & Associates", ...}],
                  "color": "#d97706",
                  "states": ["Ohio", "Indiana", ...],
              }
      data["reps"] = new_reps
    """
    # 2026-07-16 (Les Tucker): Deb Freeman's address is debrafreeman@, not debora...
    for rep in data.get("reps", {}).values():
        for contact in rep.get("contacts", []):
            if contact.get("email", "").lower() == "deborafreeman@frontier.com":
                contact["email"] = "debrafreeman@frontier.com"
    return data


def write_snapshot(data: dict, label=None) -> Path:
    SNAPSHOT_DIR.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now().strftime("%Y-%m-%d-%H%M")
    suffix = f"-{label}" if label else ""
    path = SNAPSHOT_DIR / f"{stamp}{suffix}.json"
    path.write_text(json.dumps(data, indent=2) + "\n")
    return path


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="print diff and exit without PUTting")
    ap.add_argument("--snapshot", action="store_true", help="GET the bin and save it as a JSON snapshot under site/rep-data-snapshots/")
    ap.add_argument("--label", default=None, help="optional suffix on the snapshot filename (e.g. --label pre-edit)")
    args = ap.parse_args()

    if args.snapshot:
        current = fetch_current()
        path = write_snapshot(current, args.label)
        print(f"snapshot written → {path}")
        return 0

    before = fetch_current()
    after  = mutate(json.loads(json.dumps(before)))  # deep copy

    if before == after:
        print("No changes — mutate() returned the data unchanged.")
        return 0

    # Always snapshot the pre-mutation state so we have a recovery point
    pre_path = write_snapshot(before, "pre-edit")
    print(f"pre-edit snapshot → {pre_path}")

    print("--- before ---")
    print(json.dumps(before, indent=2))
    print("--- after ---")
    print(json.dumps(after, indent=2))

    if args.dry_run:
        print("\nDry run — not PUTting.")
        return 0

    status = put_updated(after)
    print(f"\nPUT → HTTP {status}")

    if status == 200:
        post_path = write_snapshot(after, "post-edit")
        print(f"post-edit snapshot → {post_path}")
    return 0 if status == 200 else 1


if __name__ == "__main__":
    sys.exit(main())
