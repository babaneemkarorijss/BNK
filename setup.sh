#!/usr/bin/env bash
set -Eeuo pipefail
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'
log()   { echo -e "${GREEN}✔${NC} $1"; }
warn()  { echo -e "${YELLOW}⚠${NC} $1"; }
err()   { echo -e "${RED}✖${NC} $1"; exit 1; }

# ═══════════════════════════════════════════════════════════════
# 1. Fix Git ownership (idempotent)
# ═══════════════════════════════════════════════════════════════
git config --global --add safe.directory "$(pwd)" 2>/dev/null || true
log "Git safe directory configured."

# ═══════════════════════════════════════════════════════════════
# 2. Set up credential helper with your PAT token
#    (If this token has expired, the push will fail and we'll tell you how to fix it.)
# ═══════════════════════════════════════════════════════════════
PAT="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"
REMOTE_URL="https://x-access-token:${PAT}@github.com/babaneemkarorijss/BNK.git"

# Only set the remote if it doesn't already contain the token
if git remote get-url origin 2>/dev/null | grep -q "x-access-token"; then
    log "Remote already uses PAT token."
else
    log "Configuring remote with PAT token..."
    git remote set-url origin "$REMOTE_URL"
    log "Remote configured."
fi

# Also store credentials so 'git push' works without prompting
git config --global credential.helper store
echo "https://x-access-token:${PAT}@github.com" > ~/.git-credentials 2>/dev/null || true
log "Git credentials stored."

# ═══════════════════════════════════════════════════════════════
# 3. Clean up any stale rebase/merge
# ═══════════════════════════════════════════════════════════════
git rebase --abort 2>/dev/null || true
git merge --abort 2>/dev/null || true
log "Git state cleaned (no stale rebase/merge)."

# ═══════════════════════════════════════════════════════════════
# 4. Stash any uncommitted local changes
# ═══════════════════════════════════════════════════════════════
STASHED=false
if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git ls-files --others --exclude-standard)" ]; then
    log "Stashing uncommitted work..."
    git stash push -u -m "auto-stash-$(date +%s)" || true
    STASHED=true
    log "Work stashed."
else
    log "Working tree is clean."
fi

# ═══════════════════════════════════════════════════════════════
# 5. Pull latest from remote (rebase to keep history linear)
# ═══════════════════════════════════════════════════════════════
log "Fetching and rebasing onto origin/master..."
if git pull --rebase origin master; then
    log "Rebase successful."
else
    warn "Rebase failed. Aborting and restoring stash..."
    git rebase --abort 2>/dev/null || true
    if [ "$STASHED" = true ]; then
        git stash pop 2>/dev/null || true
    fi
    err "Could not rebase. Please resolve conflicts manually, then re‑run this script."
fi

# ═══════════════════════════════════════════════════════════════
# 6. Restore stashed work
# ═══════════════════════════════════════════════════════════════
if [ "$STASHED" = true ]; then
    log "Restoring stashed work..."
    git stash pop 2>/dev/null || warn "Stash pop had minor issues – check 'git stash list'."
fi

# ═══════════════════════════════════════════════════════════════
# 7. Stage all changes and commit (if anything to commit)
# ═══════════════════════════════════════════════════════════════
git add .
if ! git diff --cached --quiet; then
    log "Committing changes..."
    git commit -m "🔄 Auto-commit: sync all local changes"
else
    log "Nothing to commit."
fi

# ═══════════════════════════════════════════════════════════════
# 8. Push to GitHub
# ═══════════════════════════════════════════════════════════════
log "Pushing to origin master..."
if git push origin master; then
    log "✅ Push successful! Your changes are live on GitHub."
else
    warn "Push failed (likely the PAT token has expired)."
    echo ""
    echo "   To fix this:"
    echo "   1. Go to https://github.com/settings/tokens"
    echo "   2. Generate a new classic PAT with 'repo' scope"
    echo "   3. Copy the new token"
    echo "   4. Run this script again, replacing the PAT variable with your new token"
    echo ""
    echo "   For now, your local changes are safely committed."
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🎉 All done – repository is fully synced."
echo "  Vercel will automatically deploy the latest commit."
echo "  Visit https://www.babaneemkarori.com to see the updates."
echo "  Jai Baba! 🙏"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"