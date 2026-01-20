import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Network } from "@aptos-labs/ts-sdk";
import WalletSelector from "./components/WalletSelector";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import FaucetInfo from "./components/FaucetInfo";
import GettingStarted from "./components/GettingStarted";
import { useState } from "react";
import shelbyLogo from "./assets/shelbylogo.jpg";

// Create QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000, // 30 seconds
      gcTime: 300000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const handleUploadSuccess = (fileInfo: any) => {
    setUploadedFiles(prev => [fileInfo, ...prev]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AptosWalletAdapterProvider
        autoConnect={true}
        dappConfig={{ 
          network: Network.CUSTOM,
          aptosConnectDappId: import.meta.env.VITE_SHELBY_API_KEY,
        }}
        onError={(error) => {
          console.error("Wallet error:", error);
        }}
      >
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
          {/* Hero Header */}
          <div className="backdrop-blur-sm bg-black/20 border-b-2 border-gray-700/50">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img 
                    src={shelbyLogo} 
                    alt="Shelby Logo" 
                    className="w-16 h-16 rounded-xl shadow-2xl border-2 border-gray-700"
                  />
                  <div>
                    <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                      Shelby Storage
                    </h1>
                    <p className="text-gray-300 text-sm">
                      Decentralized file storage on Aptos
                    </p>
                  </div>
                </div>
                <WalletSelector />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            {/* Getting Started Section */}
            <div className="mb-8">
              <GettingStarted />
            </div>

            {/* Faucet Info Section */}
            <div className="mb-8">
              <FaucetInfo />
            </div>

            {/* File Management Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FileUpload onUploadSuccess={handleUploadSuccess} />
              <FileList files={uploadedFiles} />
            </div>

            {/* Footer */}
            <footer className="text-center mt-12 text-white/80 text-sm">
              <p>Powered by Shelby Protocol • Built with ❤️</p>
            </footer>
          </div>
        </div>
      </AptosWalletAdapterProvider>
    </QueryClientProvider>
  );
}

export default App;