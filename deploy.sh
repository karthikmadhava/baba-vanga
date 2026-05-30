#!/bin/bash

# Exit on any error
set -e

echo "=================================================="
echo "🚀 GLOBAL CRISIS TRACKER 2026 - GCP DEPLOYER"
echo "=================================================="

# Determine workspace path
WORKSPACE_DIR="/Users/karthikmadhava/projects/baba-vanga"
cd "$WORKSPACE_DIR"

# 1. Check for gcloud CLI
if ! command -v gcloud &> /dev/null; then
    echo "🔍 Google Cloud CLI (gcloud) not found. Attempting install via Homebrew..."
    if command -v brew &> /dev/null; then
        echo "🍺 Homebrew found. Installing gcloud-cli..."
        brew install --cask gcloud-cli
        if [ -f "/opt/homebrew/Caskroom/google-cloud-sdk/latest/google-cloud-sdk/path.zsh.inc" ]; then
            source "/opt/homebrew/Caskroom/google-cloud-sdk/latest/google-cloud-sdk/path.zsh.inc"
        fi
        export PATH="/opt/homebrew/bin:$PATH"
    else
        echo "❌ Homebrew is not installed. Please install Homebrew or Google Cloud SDK manually."
        exit 1
    fi
fi

# Double check shell path mapping
if ! command -v gcloud &> /dev/null; then
    echo "⚠️ gcloud CLI installed but not in current shell path. Mapping Brew path..."
    export PATH="/opt/homebrew/share/google-cloud-sdk/bin:$PATH"
    export PATH="/usr/local/share/google-cloud-sdk/bin:$PATH"
    if ! command -v gcloud &> /dev/null; then
        echo "❌ Could not locate gcloud binary. Please restart terminal or add gcloud to PATH."
        exit 1
    fi
fi

echo "✅ Google Cloud CLI is active."

# 2. Authentication Check
echo "=================================================="
echo "🔑 AUTHENTICATING GCP ACCOUNT..."
echo "=================================================="
echo "A browser window will open to authenticate. Please log in and authorize."
gcloud auth login

# 3. Create a unique GCP Project ID
UNIQUE_SUFFIX=$(jot -r 1 100000 999999 2>/dev/null || echo $((100000 + RANDOM % 900000)))
PROJECT_ID="crisis-tracker-2026-$UNIQUE_SUFFIX"
echo "=================================================="
echo "⚙️ CREATING GCP PROJECT: $PROJECT_ID..."
echo "=================================================="
gcloud projects create "$PROJECT_ID" --name="Global Conflict Tracker"

# Link Billing Account to enable GCS Bucket creation
echo "Linking Billing Account 00F166-8DF6F7-987373..."
gcloud billing projects link "$PROJECT_ID" --billing-account="00F166-8DF6F7-987373"

# Set as active project
gcloud config set project "$PROJECT_ID"

# 4. Provision GCS Static Web Bucket
echo "=================================================="
echo "🪣 PROVISIONING STATIC WEBSITE BUCKET..."
echo "=================================================="
echo "Creating GCS Bucket: gs://$PROJECT_ID in us-central1..."
gcloud storage buckets create "gs://$PROJECT_ID" --location=us-central1 || {
    echo "❌ Failed to create bucket. Check your GCP quotas or billing linkages."
    exit 1
}

# Wait for GCP IAM policy propagation (Owner roles sync in backend)
echo "Waiting 15 seconds for GCP IAM role propagation..."
sleep 15

# 5. Configure public read access permissions
echo "Configuring public read permission (objectViewer) for everyone..."
set +e
SUCCESS=false
for i in {1..6}; do
    echo "Attempt $i of 6 to configure bucket permissions..."
    # Disable Public Access Prevention (PAP)
    gcloud storage buckets update "gs://$PROJECT_ID" --no-public-access-prevention
    # Set public-read IAM binding
    if gcloud storage buckets add-iam-policy-binding "gs://$PROJECT_ID" \
        --member="allUsers" \
        --role="roles/storage.objectViewer"; then
        echo "✅ Public permissions set successfully."
        SUCCESS=true
        break
    fi
    echo "⚠️ IAM policy binding failed. Waiting 10 seconds for role propagation..."
    sleep 10
done
set -e

if [ "$SUCCESS" = false ]; then
    echo "❌ Failed to set public permissions after 6 attempts."
    exit 1
fi

# 6. Configure static website routing
echo "Configuring web index page (index.html)..."
gcloud storage buckets update "gs://$PROJECT_ID" \
    --web-main-page-suffix="index.html" \
    --web-error-page="index.html"

# 7. Generate first dataset via python crawler locally
echo "=================================================="
echo "🕷️ RUNNING GEOPOLITICAL CRAWLER FOR INITIAL DATA..."
echo "=================================================="
if [ -f "./crawler.py" ]; then
    chmod +x ./crawler.py
    python3 ./crawler.py
else
    echo "⚠️ crawler.py not found. Creating empty conflicts.json..."
    echo "[]" > conflicts.json
fi

# 8. Upload website assets
echo "=================================================="
echo "📤 UPLOADING APPLICATION FILES..."
echo "=================================================="
gcloud storage cp index.html styles.css app.js conflicts.json "gs://$PROJECT_ID/"

# 9. Register 30-minute local cron task
echo "=================================================="
echo "⏰ SCHEDULING 30-MIN AUTO-REFRESH (CRONTAB)..."
echo "=================================================="
CRON_JOB="*/30 * * * * cd $WORKSPACE_DIR && ./crawler.py >> crawler_cron.log 2>&1"

# Backup existing cron, filtering out any existing lines matching the crawler pattern
CURRENT_CRON=$(crontab -l 2>/dev/null | grep -v "$WORKSPACE_DIR/crawler.py" || true)

# Write back new cron job
(echo "$CURRENT_CRON"; echo "$CRON_JOB") | crontab -
echo "✅ Cron task registered successfully. The crawler will query news and sync updates to GCS every 30 minutes."

# 10. Cost Control Safeguard Warnings
echo "=================================================="
echo "💰 GCP SPEND SAFEGUARDS (<$100)"
echo "=================================================="
echo "Hosting via a static GCS bucket is 100% serverless. Under ordinary traffic,"
echo "your monthly cost will be \$0.00, well below your \$100 limit."
echo ""
echo "To set a hard billing alert cap at \$100, run this command using your Billing Account ID:"
echo "👉 gcloud billing budgets create --billing-account=YOUR_BILLING_ACCOUNT_ID \\"
echo "       --display-name=\"Crisis Tracker Budget Cap\" \\"
echo "       --budget-amount=100USD \\"
echo "       --threshold-rule=percent=0.8,percent=1.0"
echo "=================================================="
echo "🎉 DEPLOYMENT COMPLETE!"
echo "=================================================="
echo "Hosted URL (Google Cloud Storage URL):"
echo "👉 https://storage.googleapis.com/$PROJECT_ID/index.html"
echo "=================================================="
