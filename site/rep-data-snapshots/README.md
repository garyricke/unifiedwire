# Rep Data Snapshots

Point-in-time snapshots of the rep-locator jsonbin (`69bc4cd6aa77b81da9fd805e`),
captured by `../rep-sync.py`. Each file is a full bin state — diffable in git,
restorable by PUT.

## Filename format

`YYYY-MM-DD-HHMM[-label].json`

Common labels:
- `baseline` — taken manually to capture a known-good state before any work
- `pre-edit` — written automatically right before a `mutate()` PUT runs
- `post-edit` — written automatically right after a `mutate()` PUT returns 200

## Take a snapshot

```bash
python3 site/rep-sync.py --snapshot --label baseline
```

`--label` is optional; omit it for a plain timestamp.

## Inspect history

```bash
git log --oneline -- site/rep-data-snapshots/
ls -lt site/rep-data-snapshots/
```

To see what changed between two snapshots:

```bash
diff site/rep-data-snapshots/2026-05-18-1550-baseline.json \
     site/rep-data-snapshots/2026-05-20-1200-pre-edit.json
```

## Restore a snapshot

If a recent change needs to be rolled back to a saved point in time:

```bash
curl -s -X PUT "https://api.jsonbin.io/v3/b/69bc4cd6aa77b81da9fd805e" \
  -H "Content-Type: application/json" \
  -H 'X-Master-Key: $2a$10$R1cylWk2DnScmcNByb85puFMEA.mHscaOdY4tke8wcJEZRxVMuqrS' \
  --data-binary @site/rep-data-snapshots/<chosen-file>.json
```

Then bust the localStorage cache on any open browsers
(`localStorage.removeItem('uwc_repdata_cache')`) so the live page picks
up the restored data immediately instead of waiting 10 minutes.

## Why snapshots exist

The page (`site/find-a-rep.html`) ships with a `defaultRepData()` fallback
for when jsonbin is unreachable. On 2026-05-18 a defaults-PUT to jsonbin
silently clobbered two admin saves from April 3 (the Winar removal and
the Riffle & Associates addition on the Ohio Territory card). We discovered
them only because the user remembered. Snapshots make every historical
state of the bin recoverable without depending on memory.
