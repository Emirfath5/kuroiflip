#!/bin/bash

# Deploy Rocket Crash Contract to Aptos
echo "🚀 Deploying Rocket Crash Contract to Aptos..."

# Initialize Aptos project (if not already done)
if [ ! -f "Aptos.toml" ]; then
    echo "Initializing Aptos project..."
    aptos init --package-dir . --name kuroi_flip
fi

# Compile the contract
echo "📦 Compiling contract..."
aptos move compile --package-dir .

# Run tests (if any)
echo "🧪 Running tests..."
aptos move test --package-dir .

# Publish to mainnet
echo "🌐 Publishing to Aptos mainnet..."
aptos move publish --package-dir . --named-addresses kuroi_flip=0x891bdbd410600de9973cda45e61154f48500c1f0eb37eb0c2ff8d58b65be816c

echo "✅ Contract deployed successfully!"
echo "📋 Contract address: 0x891bdbd410600de9973cda45e61154f48500c1f0eb37eb0c2ff8d58b65be816c::rocket_crash"
echo "🔗 View on explorer: https://explorer.aptoslabs.com/account/0x891bdbd410600de9973cda45e61154f48500c1f0eb37eb0c2ff8d58b65be816c"

# Optional: Publish to testnet first
echo ""
echo "🧪 To deploy to testnet first, run:"
echo "aptos move publish --package-dir . --named-addresses kuroi_flip=0x891bdbd410600de9973cda45e61154f48500c1f0eb37eb0c2ff8d58b65be816c --profile testnet" 