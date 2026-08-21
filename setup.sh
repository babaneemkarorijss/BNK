#!/usr/bin/env bash
set -Eeuo pipefail

cd /d/SHRINEEBKARORIBABAJI

# 1. Show any stashes
echo "Checking stashes..."
git stash list || true

# 2. Pop the latest stash if it exists
if git stash list | grep -q .; then
    echo "Restoring stashed changes..."
    git stash pop
else
    echo "No stashes to restore."
fi

# 3. Show current status
echo "Current status:"
git status

# 4. Add all pending changes
echo "Adding all pending changes..."
git add .

# 5. Commit if there is anything to commit
if git diff --cached --quiet; then
    echo "No new changes to commit."
else
    echo "Committing changes..."
    git commit -m "Update local changes after WhatsApp redirect page"
fi

# 6. Push to origin using SSH
echo "Pushing to origin..."
git push origin master

echo "✅ Done. Repository is fully synced."