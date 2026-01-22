import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Network } from "@aptos-labs/ts-sdk";
import { Routes, Route } from "react-router-dom";
import WalletSelector from "./components/WalletSelector";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import FaucetInfo from "./components/FaucetInfo";
import GettingStarted from "./components/GettingStarted";
import SharedFilePage from "./pages/SharedFilePage";
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
          network: Network.DEVNET
        }}
        onError={(error) => {
          console.error("Wallet error:", error);
        }}
      >
        <Routes>
          {/* Shared File Route */}
          <Route path="/file/:account/:filename" element={<SharedFilePage />} />
          
          {/* Main App Route */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen bg-gradient-to-br from-gray-900 via-zinc-900 to-black">
                {/* Hero Header */}
                <header className="bg-zinc-900/95 border-b border-pink-500/20 shadow-lg shadow-pink-500/10 sticky top-0 z-50 backdrop-blur-md">
                  <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img 
                          src={shelbyLogo} 
                          alt="Shelby Logo" 
                          className="w-14 h-14 rounded-2xl shadow-lg shadow-pink-500/50 border-2 border-pink-500/30 hover:scale-105 hover:border-pink-500/60 transition-all"
                        />
                        <div>
                          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                            Shelby Storage
                          </h1>
                          <p className="text-gray-400 text-sm font-medium">
                            Decentralized Cloud Storage on Aptos
                          </p>
                        </div>
                      </div>
                      <WalletSelector />
                    </div>
                  </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-8 space-y-8">
                  {/* Hero Banner */}
                  <div className="bg-gradient-to-r from-pink-600 via-fuchsia-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl shadow-pink-500/20 border border-pink-500/30">
                    <div className="max-w-3xl">
                      <h2 className="text-4xl font-bold mb-3">
                        Welcome to Decentralized Storage 🚀
                      </h2>
                      <p className="text-pink-100 text-lg leading-relaxed">
                        Store your files securely on the blockchain. Upload, share, and access your data from anywhere with complete ownership and privacy.
                      </p>
                    </div>
                  </div>

                  {/* Getting Started Section */}
                  <GettingStarted />

                  {/* Faucet Info Section */}
                  <FaucetInfo />

                  {/* File Management Section */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <FileUpload onUploadSuccess={handleUploadSuccess} />
                    <FileList files={uploadedFiles} />
                  </div>

                  {/* Footer */}
                  <footer className="text-center pt-8 pb-4 text-gray-400 text-sm border-t border-pink-500/20 mt-12">
                    <p className="font-medium">
                      Powered by <span className="text-pink-400 font-bold">Shelby Protocol</span> • Built with ❤️ on Aptos
                    </p>
                  </footer>
                </main>
              </div>
            } 
          />
        </Routes>
      </AptosWalletAdapterProvider>
    </QueryClientProvider>
  );
}

export default App;