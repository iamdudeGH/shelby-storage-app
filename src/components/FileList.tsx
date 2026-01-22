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
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📁 Your Files</h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔐</div>
          <p className="text-gray-500">Connect wallet to view files</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📁 Your Files</h2>
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold border border-gray-300">
          {allFiles.length}
        </span>
      </div>

      {allFiles.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📂</div>
          <p className="text-gray-500 text-lg">No files yet</p>
          <p className="text-gray-400 text-sm mt-2">Upload your first file!</p>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-left border border-blue-200">
            <p className="text-sm text-blue-800 font-semibold mb-2">🔍 Debug Info:</p>
            <p className="text-xs text-blue-700">
              Check browser console (F12) for localStorage data
            </p>
            <button
              onClick={() => {
                const stored = localStorage.getItem('shelbyUploadedFiles');
                console.log('=== STORAGE DEBUG ===');
                console.log('Raw:', stored);
                console.log('Parsed:', stored ? JSON.parse(stored) : null);
                alert('Check console for debug info!');
              }}
              className="mt-2 bg-blue-200 hover:bg-blue-300 px-3 py-1 rounded text-xs transition-all"
            >
              Show localStorage in Console
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
          {allFiles.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all group border border-gray-200 hover:border-gray-400"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-2xl">📄</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => downloadFile(file.name)}
                disabled={downloading === file.name}
                className="group/btn relative flex items-center gap-2 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-blue-400/20"
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
          ))}
        </div>
      )}

      <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs border border-gray-200">
        <strong className="text-gray-800">Debug:</strong> Uploaded Files Prop: {uploadedFiles.length}, 
        All Files: {allFiles.length}
      </div>
    </div>
  );
}