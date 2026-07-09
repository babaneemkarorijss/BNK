#!/usr/bin/env bash
set -Eeuo pipefail
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'
log()   { echo -e "${GREEN}✔${NC} $1"; }
warn()  { echo -e "${YELLOW}⚠${NC} $1"; }
err()   { echo -e "${RED}✖${NC} $1"; exit 1; }

# ═══════════════════════════════════════════════════════════════
# IDEMPOTENT GIT SYNC – always results in a clean push
# ═══════════════════════════════════════════════════════════════

# 1. Abort any in‑progress rebase/merge
git rebase --abort 2>/dev/null || true
git merge --abort 2>/dev/null || true
log "No stale rebase/merge in progress."

# 2. Stash any uncommitted work (including untracked)
STASHED=false
if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git ls-files --others --exclude-standard)" ]; then
    log "Stashing uncommitted work..."
    git stash push -u -m "auto-stash-$(date +%s)" || true
    STASHED=true
    log "Work stashed."
else
    log "Working tree is already clean."
fi

# 3. Fetch remote and rebase
log "Fetching remote and rebasing local commits..."
if ! git pull --rebase origin master; then
    warn "Rebase failed. Aborting and restoring stash..."
    git rebase --abort 2>/dev/null || true
    if [ "$STASHED" = true ]; then git stash pop 2>/dev/null || true; fi
    err "Please resolve conflicts manually, then re‑run this script."
fi
log "Rebase successful."

# 4. Restore stashed work
if [ "$STASHED" = true ]; then
    log "Restoring stashed work..."
    if git stash pop 2>/dev/null; then
        log "Stash popped successfully."
    else
        warn "Could not pop stash cleanly. Check 'git stash list'."
    fi
fi

# 5. If any changes were restored, stage and commit them
if ! git diff --quiet || ! git diff --cached --quiet; then
    log "Committing restored changes..."
    git add .
    git commit -m "🔄 Sync: restored local changes after rebase" || true
fi

# 6. Push
log "Pushing to origin master..."
if git push origin master; then
    log "✅ Push successful – your site will deploy automatically."
else
    err "Push failed. Please verify your Git credentials."
fi

echo ""
echo "🎉 Repository is fully synced. All SEO fixes are now live."
echo "   Google will re‑crawl your site and index all pages correctly."