# 🚀 Shelby Wallet App - React + Petra Wallet Integration

A modern React application for Shelby Protocol with full Petra Wallet support using the official Aptos Wallet Adapter.

## ✨ Features

- ✅ **Petra Wallet Integration** - Full support using Aptos Wallet Adapter
- ✅ **Dual Mode Upload** - Wallet signing or CLI mode
- ✅ **Beautiful UI** - Modern design with Tailwind CSS
- ✅ **TypeScript** - Type-safe development
- ✅ **Fast** - Built with Vite for instant HMR
- ✅ **File Management** - Upload, download, and track files
- ✅ **Wallet Transactions** - Sign with your Petra Wallet

## 🛠️ Tech Stack

- **React 19** - Latest React with hooks
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Aptos Wallet Adapter** - Official wallet integration
- **Petra Wallet** - Aptos wallet support

## 📦 Installation

1. **Install dependencies:**
```bash
cd shelby-wallet-app
npm install --legacy-peer-deps
```

2. **Make sure backend is running:**
The app needs the Node.js backend from `shelby-web-app` to be running on port 3000.

```bash
# In another terminal
cd ../shelby-web-app
wsl bash start.sh
```

## 🚀 Running the App

```bash
# Start the React dev server
npm run dev
```

The app will open at `http://localhost:5173`

## 🎯 How to Use

### 1. Connect Petra Wallet

- Click "Connect Petra Wallet" button
- Approve the connection in Petra popup
- Your wallet address will be displayed

### 2. Upload Files

**Wallet Mode (Recommended):**
- Select "Petra Wallet" mode
- Choose a file
- Sign the transaction with your wallet
- File uploaded to your account

**CLI Mode (Fallback):**
- Select "CLI Mode"
- File uploaded via server's account
- Faster but less secure

### 3. Download Files

- Click "Download" on any file
- File retrieved from Shelby storage

## 🔐 Wallet vs CLI Mode

| Feature | Wallet Mode | CLI Mode |
|---------|-------------|----------|
| **Security** | 🟢 Your keys | 🟡 Server keys |
| **Account** | Your wallet | Server account |
| **Speed** | Slower (popup) | Faster |
| **Cost** | You pay gas | Server pays |
| **Best For** | Production | Development |

## 📁 Project Structure

```
shelby-wallet-app/
├── src/
│   ├── components/
│   │   ├── WalletSelector.tsx    # Wallet connection UI
│   │   ├── FileUpload.tsx        # Upload with wallet/CLI
│   │   └── FileList.tsx          # File listing
│   ├── App.tsx                   # Main app with WalletProvider
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Tailwind imports
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🔧 Configuration

### Backend API URL

Edit `src/components/FileUpload.tsx` and `src/components/FileList.tsx`:

```typescript
const API_BASE_URL = "http://localhost:3000/api";
```

### Wallet Networks

Edit `src/App.tsx` to configure networks:

```typescript
const wallets = [new PetraWallet()];
```

## 🚧 Current Status

### ✅ Working Features

- Petra Wallet connection/disconnection
- Wallet address display
- CLI mode upload (fully functional)
- File download
- Beautiful responsive UI
- Mode switching

### 🚧 In Progress

- **Wallet mode upload** - Requires Shelby TypeScript SDK integration
  - Need erasure coding client-side
  - Smart contract transaction building
  - Wallet transaction signing

## 📝 Next Steps to Complete Wallet Upload

To implement full wallet upload functionality:

1. **Integrate Shelby SDK:**
```typescript
import { ShelbyClient } from '@shelby/sdk'; // Hypothetical
```

2. **Client-side erasure coding:**
   - Read file chunks
   - Apply erasure coding
   - Calculate commitments

3. **Build Aptos transaction:**
   - Call Shelby smart contract
   - Submit blob metadata
   - Include Merkle root

4. **Sign with Petra:**
```typescript
const result = await signAndSubmitTransaction({
  data: {
    function: "shelby::blob::upload",
    arguments: [/* ... */]
  }
});
```

## 🐛 Troubleshooting

**Wallet won't connect?**
- Make sure Petra Wallet extension is installed
- Check browser console for errors
- Try refreshing the page

**Upload fails?**
- Ensure backend server is running on port 3000
- Check Shelby CLI is configured: `shelby config get`
- Verify API key is valid

**Build errors?**
- Try: `rm -rf node_modules package-lock.json && npm install --legacy-peer-deps`

## 📚 Resources

- [Shelby Documentation](https://docs.shelby.xyz/)
- [Petra Wallet](https://petra.app/)
- [Aptos Wallet Adapter](https://aptos.dev/build/sdks/wallet-adapter/)
- [Aptos SDK](https://aptos.dev/build/sdks/ts-sdk/)

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js` to customize the theme:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    }
  }
}
```

### Modify Layout

Components are in `src/components/` - fully customizable!

## 📄 License

MIT

---

**Built with ❤️ for Shelby Protocol**

Need help? Check the [Shelby Discord](https://discord.gg/shelby) or [GitHub Issues](https://github.com/shelby/shelby-wallet-app/issues)
