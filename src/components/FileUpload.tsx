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
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📤 Upload File</h2>

      {!connected && (
        <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🔐</span>
            <div>
              <p className="font-semibold text-yellow-800">Wallet Required</p>
              <p className="text-sm text-yellow-700 mt-1">
                Connect your Petra Wallet to upload files.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); handleUpload(); }} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Select File
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-700 disabled:bg-gray-100"
            required
            disabled={isUploading || !connected}
          />
          {file && (
            <p className="mt-2 text-sm text-gray-600">
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            File Name
          </label>
          <input
            type="text"
            value={remotePath}
            onChange={(e) => setRemotePath(e.target.value)}
            placeholder="my-file.txt"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-700 disabled:bg-gray-100"
            disabled={isUploading || !connected}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Expiration
          </label>
          <input
            type="text"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-700 disabled:bg-gray-100"
            disabled={isUploading || !connected}
          />
        </div>

        <button
          type="submit"
          disabled={isUploading || !file || !connected}
          className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 shadow-lg hover:shadow-xl"
        >
          {!connected ? "🔐 Connect Wallet" : isUploading ? "⏳ Uploading..." : "🚀 Upload"}
        </button>
      </form>

      {isUploading && (
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-gray-700 to-gray-900 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">{progress}%</p>
        </div>
      )}

      {message && (
        <div className={`mt-4 p-4 rounded-lg border-l-4 ${message.type === "success" ? "bg-green-50 border-green-500 text-green-800" : "bg-red-50 border-red-500 text-red-800"}`}>
          {message.type === "success" ? "✅" : "❌"} {message.text}
        </div>
      )}
    </div>
  );
}