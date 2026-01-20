#!/bin/bash
cd /mnt/d/Shelby/shelby-wallet-app
source ~/.nvm/nvm.sh
nvm use 20.20.0
echo "================================"
echo "Shelby Wallet App (React)"
echo "================================"
echo "Node version: $(node --version)"
echo "Working directory: $(pwd)"
echo ""
echo "Starting Vite dev server..."
echo "App will open at: http://localhost:5173"
echo ""
npm run dev