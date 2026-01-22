# Project Memory - Shelby Wallet App

## Project Overview
This is a decentralized file storage application built on the Shelby Protocol (blockchain storage on Aptos network). Users can upload and download files using their Petra Wallet.

## Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS 4
- **Blockchain**: Aptos Network (Shelby Protocol)
- **Wallet**: Petra Wallet Adapter
- **Storage**: Shelby Protocol SDK (@shelby-protocol/sdk, @shelby-protocol/react)

## Deployment Information
- **Version Control**: GitHub (repository with token authentication)
- **Hosting**: Vercel
- **Network**: Shelby Network (ShelbyNet)

## Project Structure
```
src/
├── components/
│   ├── FileUpload.tsx    - File upload component with wallet integration
│   ├── FileList.tsx      - File listing and download component
│   ├── WalletSelector.tsx - Wallet connection UI
│   ├── FaucetInfo.tsx    - Faucet information for getting test tokens
│   └── GettingStarted.tsx - Onboarding guide
├── lib/
│   └── shelby.ts         - Shelby client configuration
└── assets/               - Static assets (logos, icons)
```

## Key Components

### FileUpload.tsx
- Handles file upload to Shelby storage
- Requires wallet connection and transaction signing
- Uses `useUploadBlobs` hook with signer authentication
- Saves file metadata to localStorage

### FileList.tsx
- Displays uploaded files from localStorage
- Handles file downloads from Shelby storage
- Uses `useGetBlobs` hook with signer authentication
- **Important**: Download requires signer object with `account.address` and `signAndSubmitTransaction`

## Environment Variables
Required in `.env` file:
```
VITE_SHELBY_API_KEY=your_api_key_here
```
Get API key from: https://geomi.dev

## Authentication Pattern
Both upload and download operations require wallet authentication:
```typescript
{
  signer: {
    account: account.address,
    signAndSubmitTransaction,
  }
}
```

## Known Issues & Fixes
- **Download Feature Fix (2026-01-22)**: Added signer authentication to `downloadFile` function in FileList.tsx. Downloads were failing because the `useGetBlobs` hook wasn't receiving the required signer object.

## Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Storage Strategy
- Files are uploaded to Shelby Protocol (blockchain storage)
- File metadata is stored in browser localStorage for quick access
- Actual file data is retrieved from blockchain on download

## Best Practices
1. Always include signer authentication for blockchain operations
2. Handle wallet connection states properly
3. Provide clear error messages for transaction failures
4. Test with testnet tokens from faucet before mainnet deployment

## Future Considerations
- Add file deletion capability
- Implement file sharing features
- Add progress indicators for large file downloads
- Consider adding file encryption for privacy
