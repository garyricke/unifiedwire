#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# domain-watch.sh — continuous check of the Unified Wire domain endpoints.
#
# Exists because www.unifiedwireandcable.com sat broken for ~3 months: it was
# reported fixed on 2026-05-19 based on a DNS-panel screenshot, nobody ran an
# actual lookup, and the failure was only rediscovered when the client chased
# it again. This script is the lookup, run on a schedule, so a regression or a
# still-broken "fix" surfaces in minutes instead of months.
#
# Writes a one-line-per-run log, keeps the last state, and fires a macOS
# notification ONLY when a check changes state (healthy <-> broken), so it is
# quiet until something actually happens.
#
# Run:      bash scripts/domain-watch.sh
# Schedule: bash scripts/domain-watch.sh --install-cron   (every 10 minutes)
#           bash scripts/domain-watch.sh --uninstall-cron
#           bash scripts/domain-watch.sh --status         (last result + log tail)
# ─────────────────────────────────────────────────────────────────────────────

set -uo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATE_DIR="${UWC_WATCH_HOME:-$DIR/.domain-watch}"
LOG="$STATE_DIR/history.log"
STATE="$STATE_DIR/state.txt"
LATEST="$STATE_DIR/latest.txt"
mkdir -p "$STATE_DIR"

CRON_LINE="*/10 * * * * /bin/bash $DIR/scripts/domain-watch.sh >/dev/null 2>&1"

case "${1:-}" in
  --install-cron)
    ( crontab -l 2>/dev/null | grep -v 'domain-watch.sh'; echo "$CRON_LINE" ) | crontab -
    echo "Installed. Runs every 10 minutes:"; echo "  $CRON_LINE"; exit 0 ;;
  --uninstall-cron)
    crontab -l 2>/dev/null | grep -v 'domain-watch.sh' | crontab -
    echo "Removed the domain-watch cron entry."; exit 0 ;;
  --status)
    cat "$LATEST" 2>/dev/null || echo "No run yet."
    echo; echo "Last 10 runs:"; tail -10 "$LOG" 2>/dev/null | cut -c1-96
    exit 0 ;;
esac

TS="$(date '+%Y-%m-%d %H:%M:%S')"
RESULTS=()
FAILED=0

note() {  # note <name> <ok|fail> <detail>
  local name="$1" ok="$2" detail="$3"
  RESULTS+=("$name|$ok|$detail")
  [ "$ok" = "fail" ] && FAILED=$((FAILED+1))
  return 0
}

# ── 1. the missing record: www CNAME must exist in DNS ──────────────────────
CNAME="$(dig +short +time=5 +tries=2 CNAME www.unifiedwireandcable.com @8.8.8.8 2>/dev/null | head -1)"
if [ -n "$CNAME" ]; then
  note "dns-www-cname" ok "-> $CNAME"
else
  note "dns-www-cname" fail "no CNAME (this is the outstanding fix)"
fi

# ── 2. www must actually answer over HTTPS ──────────────────────────────────
WWW_CODE="$(curl -s -o /dev/null -m 15 -w '%{http_code}' https://www.unifiedwireandcable.com/ 2>/dev/null)"
if [ "$WWW_CODE" != "000" ] && [ -n "$WWW_CODE" ]; then
  note "www-https" ok "HTTP $WWW_CODE"
else
  note "www-https" fail "unreachable (does not resolve)"
fi

# ── 3. legacy apex must redirect to the canonical domain, not serve a copy ──
APEX_TARGET="$(curl -s -o /dev/null -m 15 -w '%{redirect_url}' https://unifiedwireandcable.com/ 2>/dev/null)"
APEX_CODE="$(curl -s -o /dev/null -m 15 -w '%{http_code}' https://unifiedwireandcable.com/ 2>/dev/null)"
case "$APEX_TARGET" in
  https://unifiedwire.com/*) note "apex-canonical" ok "$APEX_CODE -> unifiedwire.com" ;;
  "")                        note "apex-canonical" fail "$APEX_CODE, serves a duplicate copy (no redirect)" ;;
  *)                         note "apex-canonical" fail "$APEX_CODE -> $APEX_TARGET" ;;
esac

# ── 4. the canonical site itself must be up ─────────────────────────────────
MAIN_CODE="$(curl -s -o /dev/null -m 15 -w '%{http_code}' -L https://unifiedwire.com/ 2>/dev/null)"
if [ "$MAIN_CODE" = "200" ]; then
  note "canonical-site" ok "HTTP 200"
else
  note "canonical-site" fail "HTTP $MAIN_CODE"
fi

# ── 5. gated tools must still resolve (not 404 after a deploy) ──────────────
for path in products product-data-draft; do
  code="$(curl -s -o /dev/null -m 15 -w '%{http_code}' "https://unifiedwire.com/$path" 2>/dev/null)"
  if [ "$code" = "200" ]; then note "page-$path" ok "HTTP 200"
  else note "page-$path" fail "HTTP $code"; fi
done

# ── report ──────────────────────────────────────────────────────────────────
if [ "$FAILED" -eq 0 ]; then SUMMARY="HEALTHY"; else SUMMARY="BROKEN($FAILED)"; fi

{
  echo "Unified Wire domain check — $TS"
  echo "Overall: $SUMMARY"
  echo
  for r in "${RESULTS[@]}"; do
    IFS='|' read -r n o d <<< "$r"
    if [ "$o" = "ok" ]; then printf '  [ OK ] %-18s %s\n' "$n" "$d"
    else printf '  [FAIL] %-18s %s\n' "$n" "$d"; fi
  done
} > "$LATEST"

echo "$TS  $SUMMARY  $(printf '%s;' "${RESULTS[@]}")" >> "$LOG"
cat "$LATEST"

# ── notify on a state change ────────────────────────────────────────────────
PREV="$(cat "$STATE" 2>/dev/null || echo 'UNKNOWN')"
NOW_EPOCH="$(date +%s)"
SINCE_F="$STATE_DIR/failing_since"
ESC_F="$STATE_DIR/last_escalation"

notify() { osascript -e "display notification \"$1\" with title \"Unified Wire domain watch\" sound name \"Glass\"" 2>/dev/null; }

if [ "$PREV" != "$SUMMARY" ]; then
  echo "$SUMMARY" > "$STATE"
  if [ "$PREV" != "UNKNOWN" ]; then
    if [ "$SUMMARY" = "HEALTHY" ]; then
      MSG="All domain checks passing. www.unifiedwireandcable.com is live."
    else
      MSG="Domain check FAILING ($FAILED). Was: $PREV."
    fi
    notify "$MSG"
    echo ">>> STATE CHANGE: $PREV -> $SUMMARY"
  fi
fi

# ── escalate a failure that is simply being ignored ─────────────────────────
# A state-change alert is useless if the other party never acts: the check just
# stays BROKEN and stays quiet. This is the exact failure mode that let the www
# record sit dead for three months. So: nag on a schedule while it stays broken.
FIRST_ESCALATE=${UWC_FIRST_ESCALATE:-14400}   # 4 hours before the first nag
ESCALATE_EVERY=${UWC_ESCALATE_EVERY:-86400}   # then once a day

if [ "$FAILED" -gt 0 ]; then
  [ -f "$SINCE_F" ] || echo "$NOW_EPOCH" > "$SINCE_F"
  SINCE="$(cat "$SINCE_F")"
  LAST_ESC="$(cat "$ESC_F" 2>/dev/null || echo 0)"
  BROKEN_FOR=$(( NOW_EPOCH - SINCE ))
  SINCE_ESC=$(( NOW_EPOCH - LAST_ESC ))
  if [ "$BROKEN_FOR" -ge "$FIRST_ESCALATE" ] && [ "$SINCE_ESC" -ge "$ESCALATE_EVERY" ]; then
    HRS=$(( BROKEN_FOR / 3600 ))
    notify "Still broken after ${HRS}h with no fix. Time to chase Entre (dmaggio@entrerock.com)."
    echo "$NOW_EPOCH" > "$ESC_F"
    echo ">>> ESCALATION: unresolved for ${HRS}h — chase the vendor"
  else
    echo "    (failing for $(( BROKEN_FOR / 60 ))m; first nag at $(( FIRST_ESCALATE / 3600 ))h, then daily)"
  fi
else
  rm -f "$SINCE_F" "$ESC_F"
fi

[ "$FAILED" -eq 0 ] && exit 0 || exit 1
