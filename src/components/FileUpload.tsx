import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState, useCallback } from "react";
import { useUploadBlobs } from "@shelby-protocol/react";
import { shelbyClient } from "../lib/shelby";

interface FileUploadProps {
  onUploadSuccess: (fileInfo: any) => void;
}

export default function FileUpload({ onUploadSuccess }: FileUploadProps) {
  const { connected, account, signAndSubmitTransaction } = useWallet();
  const [file, setFile] = useState<File | null>(null);
  const [remotePath, setRemotePath] = useState("");
  const [expiration, setExpiration] = useState("in 30 days");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const uploadBlobs = useUploadBlobs({
    client: shelbyClient,
    onSuccess: () => {
      setProgress(100);
      const blobName = remotePath || file?.name || "unknown";
      showMessage("success", `File "${blobName}" uploaded successfully!`);
      
      const fileInfo = {
        name: blobName,
        originalName: file?.name,
        size: file?.size || 0,
        uploadedAt: new Date().toISOString(),
        account: account?.address,
        context: "shelbynet",
        expiration: expiration,
      };
      
      console.log('=== UPLOAD SUCCESS ===');
      console.log('Calling onUploadSuccess with:', fileInfo);
      
      // Save to localStorage immediately
      const stored = localStorage.getItem('shelbyUploadedFiles');
      const storedFiles = stored ? JSON.parse(stored) : [];
      storedFiles.unshift(fileInfo);
      localStorage.setItem('shelbyUploadedFiles', JSON.stringify(storedFiles));
      console.log('Saved to localStorage:', storedFiles);
      
      // Call parent callback
      onUploadSuccess(fileInfo);
      
      // Reset form
      setFile(null);
      setRemotePath("");
      setProgress(0);
    },
    onError: (error: any) => {
      console.error("Upload error:", error);
      setProgress(0);
      
      if (error.code === 4001) {
        showMessage("error", "Transaction rejected by user");
      } else {
        showMessage("error", `Upload failed: ${error.message}`);
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (!remotePath) {
        setRemotePath(selectedFile.name);
      }
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 7000);
  };

  const handleUpload = useCallback(async () => {
    if (!file) {
      showMessage("error", "Please select a file");
      return;
    }

    if (!connected || !account || !signAndSubmitTransaction) {
      showMessage("error", "Please connect your wallet first");
      return;
    }

    try {
      setProgress(20);
      showMessage("success", "Reading file...");

      const arrayBuffer = await file.arrayBuffer();
      const blobData = new Uint8Array(arrayBuffer);
      const blobName = remotePath || file.name;

      setProgress(40);
      showMessage("success", "Preparing transaction...");

      let expirationMicros: number;
      if (expiration.startsWith("in ")) {
        const [, amount, unit] = expiration.split(" ");
        const days = unit.includes("day") ? parseInt(amount) : parseInt(amount) * 365;
        expirationMicros = (Date.now() + days * 24 * 60 * 60 * 1000) * 1000;
      } else {
        expirationMicros = new Date(expiration).getTime() * 1000;
      }

      setProgress(60);
      showMessage("success", "Please sign the transaction in your wallet...");

      console.log('Starting upload for:', blobName);
      
      uploadBlobs.mutate({
        options: {
          build: {
            options: {
              maxGasAmount: 200000,
            }
          }
        },
        signer: {
          account: account.address,
          signAndSubmitTransaction,
        },
        blobs: [{ blobName, blobData }],
        expirationMicros,
      });

    } catch (error: any) {
      console.error("Upload error:", error);
      setProgress(0);
      showMessage("error", `Failed to prepare upload: ${error.message}`);
    }
  }, [file, connected, account, signAndSubmitTransaction, remotePath, expiration, uploadBlobs]);

  const isUploading = uploadBlobs.isPending || progress > 0;

  return (
    <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-pink-500/10 p-8 border border-pink-500/20 hover:border-pink-500/40 hover:shadow-xl hover:shadow-pink-500/20 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/50">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Upload File</h2>
          <p className="text-sm text-gray-400">Store your files on blockchain</p>
        </div>
      </div>

      {!connected && (
        <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <p className="font-semibold text-amber-300">Wallet Required</p>
              <p className="text-sm text-amber-200/80 mt-1">
                Connect your Petra Wallet to start uploading files.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); handleUpload(); }} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Choose File
          </label>
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-3 border-2 border-zinc-700 bg-zinc-900/50 text-gray-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 disabled:bg-zinc-900/30 disabled:cursor-not-allowed transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-500/20 file:text-pink-300 hover:file:bg-pink-500/30 cursor-pointer"
              required
              disabled={isUploading || !connected}
            />
          </div>
          {file && (
            <div className="mt-3 p-3 bg-pink-500/10 rounded-lg border border-pink-500/30">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm font-medium text-pink-100">
                  {file.name} <span className="text-pink-400">({(file.size / 1024).toFixed(2)} KB)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            File Name (Optional)
          </label>
          <input
            type="text"
            value={remotePath}
            onChange={(e) => setRemotePath(e.target.value)}
            placeholder="my-awesome-file.txt"
            className="w-full px-4 py-3 border-2 border-zinc-700 bg-zinc-900/50 text-gray-200 placeholder-gray-500 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 disabled:bg-zinc-900/30 transition-all"
            disabled={isUploading || !connected}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Expiration Period
          </label>
          <input
            type="text"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            className="w-full px-4 py-3 border-2 border-zinc-700 bg-zinc-900/50 text-gray-200 placeholder-gray-500 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 disabled:bg-zinc-900/30 transition-all"
            disabled={isUploading || !connected}
          />
          <p className="mt-2 text-xs text-gray-500">Example: "in 30 days" or "in 1 year"</p>
        </div>

        <button
          type="submit"
          disabled={isUploading || !file || !connected}
          className="w-full bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {!connected ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Connect Wallet First
            </>
          ) : isUploading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading to Blockchain...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload to Blockchain
            </>
          )}
        </button>
      </form>

      {isUploading && (
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-300">Upload Progress</span>
            <span className="font-bold text-pink-400">{progress}%</span>
          </div>
          <div className="w-full bg-zinc-700 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 to-fuchsia-500 h-2.5 rounded-full transition-all duration-500 ease-out shadow-lg shadow-pink-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {message && (
        <div className={`mt-4 p-4 rounded-xl border ${message.type === "success" ? "bg-emerald-500/10 border-emerald-500/30" : "bg-red-500/10 border-red-500/30"}`}>
          <div className="flex items-start gap-3">
            {message.type === "success" ? (
              <svg className="w-5 h-5 text-emerald-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <p className={`text-sm font-medium ${message.type === "success" ? "text-emerald-200" : "text-red-200"}`}>
              {message.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}