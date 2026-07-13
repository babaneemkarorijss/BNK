#!/usr/bin/env bash
set -Eeuo pipefail
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'
log()   { echo -e "${GREEN}✔${NC} $1"; }
warn()  { echo -e "${YELLOW}⚠${NC} $1"; }
err()   { echo -e "${RED}✖${NC} $1"; exit 1; }

# 1. Fix Git ownership
git config --global --add safe.directory "$(pwd)" 2>/dev/null || true
log "Git safe directory set."

# 2. Use standard HTTPS remote (no token)
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/babaneemkarorijss/BNK.git"
log "Remote set to plain HTTPS."

# 3. Remove ALL cached credentials so Git forces a new login
git config --global --unset credential.helper 2>/dev/null || true
git config --global --remove-section credential 2>/dev/null || true

# Delete the credential store files if they exist
if [ -f ~/.git-credentials ]; then
    rm ~/.git-credentials
    log "Deleted ~/.git-credentials."
fi
if [ -f ~/.gitconfig ]; then
    sed -i '/helper = /d' ~/.gitconfig 2>/dev/null || true
fi
log "Cleared all cached Git credentials."

# 4. Set the credential helper to the Windows standard (manager-core)
#    This will show a GUI login window when you push.
git config --global credential.helper manager-core 2>/dev/null || \
git config --global credential.helper manager 2>/dev/null || true
log "Credential helper set to 'manager-core'."

# 5. Clean stale rebase/merge
git rebase --abort 2>/dev/null || true
git merge --abort 2>/dev/null || true
log "Git state cleaned."

# 6. Stash uncommitted work if any
STASHED=false
if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git ls-files --others --exclude-standard)" ]; then
    log "Stashing uncommitted changes..."
    git stash push -u -m "auto-stash-$(date +%s)" || true
    STASHED=true
    log "Work stashed."
else
    log "Working tree is clean."
fi

# 7. Pull & rebase
log "Pulling latest from GitHub..."
if git pull --rebase origin master; then
    log "Rebase successful."
else
    warn "Rebase failed – aborting and restoring stash..."
    git rebase --abort 2>/dev/null || true
    if [ "$STASHED" = true ]; then git stash pop 2>/dev/null || true; fi
    err "Please resolve conflicts manually, then re‑run this script."
fi

# 8. Restore stash
if [ "$STASHED" = true ]; then
    log "Restoring stashed work..."
    git stash pop 2>/dev/null || warn "Stash pop had minor issues – check 'git stash list'."
fi

# 9. Commit any new changes
git add .
if ! git diff --cached --quiet; then
    log "Committing changes..."
    git commit -m "🔄 Sync: all local updates"
else
    log "Nothing to commit."
fi

# 10. PUSH – will ask for your GitHub username & password (use PAT)
echo ""
log "Pushing to origin master..."
echo "   A login window may appear – use:"
echo "   Username: your GitHub username"
echo "   Password: a NEW classic PAT with 'repo' scope"
echo "   (Create one at https://github.com/settings/tokens)"
echo ""

if git push origin master; then
    log "✅ Push successful!"
else
    echo ""
    warn "Push still failed. You may need to manually enter your credentials."
    echo "   Try running:"
    echo "   git push origin master"
    echo "   When the login window appears, enter your GitHub username and a NEW classic PAT."
    echo "   If no window appears, you can also use the command line:"
    echo "   git -c credential.helper= push origin master"
    echo "   (It will prompt for username & password in the terminal)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  After the push, Vercel will deploy your site automatically."
echo "  https://www.babaneemkarori.com"
echo "  Jai Baba! 🙏"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"