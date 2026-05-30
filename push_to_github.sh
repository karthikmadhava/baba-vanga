#!/bin/bash

# Exit on error
set -e

echo "=================================================="
echo "🐙 PUSHING GLOBAL CONFLICT TRACKER TO GITHUB"
echo "=================================================="

# Check if gh CLI is authenticated. If not, trigger login.
if ! gh auth status &>/dev/null; then
    echo "🔑 GitHub CLI token is missing or expired. Starting authentication..."
    gh auth login
fi

# Create a public GitHub repository named "baba-vanga" and push the master branch
echo "🚀 Creating GitHub repository 'baba-vanga' and pushing local commit..."
gh repo create baba-vanga --public --source=. --remote=origin --push

echo "=================================================="
echo "✅ SUCCESS: Code checked in to GitHub!"
echo "=================================================="
