# Project Memory - Shelby Wallet App

## Project Overview
This is a decentralized file storage application built on the Shelby Protocol (blockchain storage on Aptos network). Users can upload and download files using their Petra Wallet. Features include file upload/download, shareable links, and a dark theme matching the Shelby brand.

## Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM v7.1.1
- **Blockchain**: Aptos Network (Shelby Protocol)
- **Wallet**: Petra Wallet Adapter
- **Storage**: Shelby Protocol SDK (@shelby-protocol/sdk, @shelby-protocol/react)

## Deployment Information
- **Version Control**: GitHub (repository with token authentication)
- **Hosting**: Vercel (with client-side routing configured)
- **Network**: Shelby Network (ShelbyNet)
- **Environment Variables**: VITE_SHELBY_API_KEY (stored securely in Vercel)

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
- Dark themed card with pink gradient header
- Requires wallet connection and transaction signing
- Uses `useUploadBlobs` hook with signer authentication
- Saves file metadata to localStorage
- Features: drag-and-drop ready, progress bar with pink gradient, real-time feedback

### FileList.tsx
- Displays uploaded files from localStorage
- Handles file downloads from Shelby storage using `shelbyClient.download()`
- **Critical**: Download uses `shelbyClient.download({ account, blobName })` which reads from ReadableStream
- Share button copies shareable link to clipboard
- Download button triggers blockchain file retrieval
- File cards have dark backgrounds with pink hover effects

## Environment Variables
Required in `.env` file:
```
VITE_SHELBY_API_KEY=your_api_key_here
```
Get API key from: https://geomi.dev

## Authentication Pattern

### Upload Pattern
Uses signer authentication with transaction signing:
```typescript
uploadBlobs.mutate({
  signer: {
    account: account.address,
    signAndSubmitTransaction,
  },
  blobs: [{ blobName, blobData }],
  expirationMicros,
});
```

### Download Pattern
Uses direct SDK client method (no transaction signing needed):
```typescript
const shelbyBlob = await shelbyClient.download({
  account: account.address,
  blobName: filename,
});

// Read from ReadableStream
const reader = shelbyBlob.readable.getReader();
const chunks: Uint8Array[] = [];
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  chunks.push(value);
}
```

### Shareable Links
Format: `${window.location.origin}/file/${account}/${filename}`
- Uses React Router for `/file/:account/:filename` routes
- Anyone with link can download (no wallet required for viewing)

## Known Issues & Fixes

### Download Feature Fixes (2026-01-22)
1. **Initial Issue**: Downloads failing due to missing authentication
2. **First Attempt**: Tried using non-existent `useGetBlobs` hook - build failed
3. **Correct Solution**: Use `shelbyClient.download()` method which:
   - Returns a `ShelbyBlob` object with `readable` property (ReadableStream)
   - Doesn't require transaction signing (read-only operation)
   - Requires reading stream chunks and combining them into Uint8Array

### UI/UX Evolution (2026-01-22)
1. **Initial**: Generic indigo/purple gradient theme
2. **Redesign**: Professional light theme with modern cards
3. **Final**: Dark theme with Shelby logo pink/magenta colors
   - Background: gradient from gray-900 to black
   - Cards: semi-transparent zinc-800 with backdrop blur
   - Accents: pink/fuchsia glowing borders and shadows
   - Text: white headings, gray-300/400 body text

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

## Design System

### Color Palette (Shelby Brand)
- **Primary**: Pink (#FF69B4, pink-500), Fuchsia (fuchsia-500/600)
- **Backgrounds**: zinc-800/50, zinc-900/50 (with transparency)
- **Text**: white (headings), gray-300 (body), gray-400 (secondary)
- **Borders**: pink-500/20-30 (subtle), pink-500/50 (hover)
- **Shadows**: shadow-pink-500/10-50 (glowing effects)
- **Accents**: rose-500 (download), amber-500 (warnings), emerald-500 (success)

### Component Styling Pattern
```tsx
// Card container
className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-pink-500/10 p-8 border border-pink-500/20 hover:border-pink-500/40 transition-all"

// Icon header
className="w-12 h-12 bg-gradient-to-br from-pink-500 to-fuchsia-600 rounded-xl shadow-lg shadow-pink-500/50"

// Form inputs
className="border-2 border-zinc-700 bg-zinc-900/50 text-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"

// Buttons
className="bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 shadow-lg hover:shadow-xl"
```

## Best Practices
1. **Upload**: Always include signer authentication with `signAndSubmitTransaction`
2. **Download**: Use `shelbyClient.download()` and read from `ReadableStream`
3. **Error Handling**: Provide clear, user-friendly error messages
4. **UI Consistency**: Maintain dark theme with pink accents throughout
5. **Wallet States**: Handle connected, disconnected, and loading states
6. **Browser Cache**: Hard refresh may be needed after deployments (Ctrl+Shift+R)

## Routing Configuration
- **Main Route** (`/`): Home page with file upload/management
- **Shared File Route** (`/file/:account/:filename`): Public file viewer
- **Vercel Config**: Rewrites all routes to `/index.html` for client-side routing

## Future Considerations
- Add file deletion capability (blockchain limitation may apply)
- Implement batch file operations
- Add file preview for images/PDFs
- Consider file encryption for privacy
- Add download progress indicators for large files
- Implement file search/filter functionality
