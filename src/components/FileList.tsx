import { useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { shelbyClient } from "../lib/shelby";

interface FileListProps {
  files: any[];
}

export default function FileList({ files: uploadedFiles }: FileListProps) {
  const { connected, account } = useWallet();
  const [downloading, setDownloading] = useState<string | null>(null);
  const [allFiles, setAllFiles] = useState<any[]>([]);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  // Simple: Just use localStorage + uploadedFiles
  useEffect(() => {
    const stored = localStorage.getItem('shelbyUploadedFiles');
    console.log('Raw localStorage:', stored);
    
    const storedFiles = stored ? JSON.parse(stored) : [];
    console.log('Parsed stored files:', storedFiles);
    console.log('Uploaded files prop:', uploadedFiles);
    
    // Combine both
    const combined = [...uploadedFiles];
    storedFiles.forEach((file: any) => {
      if (!combined.find(f => f.name === file.name)) {
        combined.push(file);
      }
    });
    
    console.log('Combined files:', combined);
    setAllFiles(combined);
  }, [uploadedFiles]);

  // Save new uploads to localStorage
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      const stored = localStorage.getItem('shelbyUploadedFiles');
      const storedFiles = stored ? JSON.parse(stored) : [];
      
      uploadedFiles.forEach(file => {
        if (!storedFiles.find((f: any) => f.name === file.name)) {
          storedFiles.unshift(file);
        }
      });
      
      localStorage.setItem('shelbyUploadedFiles', JSON.stringify(storedFiles));
      console.log('Saved to localStorage:', storedFiles);
    }
  }, [uploadedFiles]);

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 10) / 10 + " " + sizes[i];
  };

  const copyShareLink = async (filename: string) => {
    try {
      if (!account) {
        alert("Wallet not connected");
        return;
      }

      // Generate shareable link - format: https://your-app.vercel.app/file/{account}/{filename}
      const shareUrl = `${window.location.origin}/file/${account.address}/${encodeURIComponent(filename)}`;
      
      await navigator.clipboard.writeText(shareUrl);
      setCopiedFile(filename);
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopiedFile(null), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
      alert("Failed to copy link to clipboard");
    }
  };

  const downloadFile = async (filename: string) => {
    try {
      setDownloading(filename);
      console.log("Downloading file from Shelby:", filename);
      
      if (!account) {
        throw new Error("Wallet not connected properly");
      }
      
      // Download file from Shelby storage using SDK client
      const shelbyBlob = await shelbyClient.download({
        account: account.address,
        blobName: filename,
      });
      console.log("Downloaded blob:", shelbyBlob);
      
      if (!shelbyBlob || !shelbyBlob.readable) {
        throw new Error("No data received from storage");
      }
      
      // Read the stream into a Uint8Array
      const reader = shelbyBlob.readable.getReader();
      const chunks: Uint8Array[] = [];
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }
      
      // Combine all chunks into a single Uint8Array
      const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      const blobData = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        blobData.set(chunk, offset);
        offset += chunk.length;
      }
      
      // Convert to Blob and download
      const blob = new Blob([blobData], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log("Download successful!");
    } catch (error: any) {
      console.error("Download error:", error);
      alert(`Download failed: ${error.message || "Unknown error"}`);
    } finally {
      setDownloading(null);
    }
  };

  if (!connected) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-pink-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Files</h2>
            <p className="text-sm text-gray-600">Manage your stored files</p>
          </div>
        </div>
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">Connect wallet to view your files</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-pink-200 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Files</h2>
            <p className="text-sm text-gray-600">{allFiles.length} file{allFiles.length !== 1 ? 's' : ''} stored</p>
          </div>
        </div>
      </div>

      {allFiles.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-700 text-lg font-semibold mb-2">No files yet</p>
          <p className="text-gray-500 text-sm">Upload your first file to get started!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {allFiles.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white hover:from-pink-50 hover:to-fuchsia-50 rounded-xl transition-all duration-200 group border border-gray-200 hover:border-pink-300 hover:shadow-md"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-fuchsia-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate text-sm" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => copyShareLink(file.name)}
                  className="group/share relative flex items-center gap-2 bg-gradient-to-br from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                  title="Copy shareable link"
                >
                  {copiedFile === file.name ? (
                    <>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg 
                        className="h-5 w-5 transition-transform duration-300 group-hover/share:rotate-12" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      <span className="text-sm">Share</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => downloadFile(file.name)}
                  disabled={downloading === file.name}
                  className="group/btn relative flex items-center gap-2 bg-gradient-to-br from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  {downloading === file.name ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-sm">Downloading...</span>
                    </>
                  ) : (
                    <>
                      <svg 
                        className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-y-0.5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      <span className="text-sm">Download</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}