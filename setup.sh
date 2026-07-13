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
# 1. Fix Git safe‑directory
# ═══════════════════════════════════════════════════════════════
git config --global --add safe.directory "$(pwd)" 2>/dev/null || true
log "Git safe directory configured."

# ═══════════════════════════════════════════════════════════════
# 2. Remove the old tokenized remote & use normal HTTPS
# ═══════════════════════════════════════════════════════════════
log "Resetting remote to standard HTTPS (no token)..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/babaneemkarorijss/BNK.git"
log "Remote set to: https://github.com/babaneemkarorijss/BNK.git"

# ═══════════════════════════════════════════════════════════════
# 3. Use Git Credential Manager (Windows) so you can log in normally
# ═══════════════════════════════════════════════════════════════
git config --global credential.helper manager-core 2>/dev/null || \
git config --global credential.helper manager 2>/dev/null || \
git config --global credential.helper store 2>/dev/null || true
log "Git credential helper set to 'manager' (Windows default)."

# ═══════════════════════════════════════════════════════════════
# 4. Clean stale rebase/merge
# ═══════════════════════════════════════════════════════════════
git rebase --abort 2>/dev/null || true
git merge --abort 2>/dev/null || true
log "Git state cleaned."

# ═══════════════════════════════════════════════════════════════
# 5. Stash any uncommitted changes
# ═══════════════════════════════════════════════════════════════
STASHED=false
if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git ls-files --others --exclude-standard)" ]; then
    log "Stashing local work..."
    git stash push -u -m "auto-stash-$(date +%s)" || true
    STASHED=true
    log "Work stashed."
else
    log "Working tree is clean."
fi

# ═══════════════════════════════════════════════════════════════
# 6. Pull latest & rebase local commits
# ═══════════════════════════════════════════════════════════════
log "Pulling latest from GitHub..."
if git pull --rebase origin master; then
    log "Rebase successful."
else
    warn "Rebase failed – aborting and restoring stash..."
    git rebase --abort 2>/dev/null || true
    if [ "$STASHED" = true ]; then git stash pop 2>/dev/null || true; fi
    err "Please resolve conflicts manually, then re‑run this script."
fi

# ═══════════════════════════════════════════════════════════════
# 7. Restore stashed changes
# ═══════════════════════════════════════════════════════════════
if [ "$STASHED" = true ]; then
    log "Restoring stashed work..."
    git stash pop 2>/dev/null || warn "Stash pop had minor issues – check 'git stash list'."
fi

# ═══════════════════════════════════════════════════════════════
# 8. Commit any new changes
# ═══════════════════════════════════════════════════════════════
git add .
if ! git diff --cached --quiet; then
    log "Committing changes..."
    git commit -m "🔄 Auto-commit: sync all updates"
else
    log "Nothing new to commit."
fi

# ═══════════════════════════════════════════════════════════════
# 9. Push – if it asks for username/password, enter your GitHub
#    username and a CLASSIC PAT (or your GitHub password if 2FA is off)
# ═══════════════════════════════════════════════════════════════
log "Pushing to origin master..."
if git push origin master; then
    log "✅ Push successful! Vercel will now deploy your site."
else
    echo ""
    warn "Push failed. Usually this means you need to enter your GitHub credentials."
    echo "   When prompted, use:"
    echo "   Username: your GitHub username"
    echo "   Password: a NEW classic PAT with 'repo' scope"
    echo "   (Create one at https://github.com/settings/tokens)"
    echo ""
    echo "   After creating the token, run this script again – it will now work."
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🎉 Repository pushed successfully."
echo "  Your site is live at https://www.babaneemkarori.com"
echo "  Jai Baba! 🙏"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"