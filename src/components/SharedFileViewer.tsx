import { useState, useEffect } from "react";
import { shelbyClient } from "../lib/shelby";

interface SharedFileViewerProps {
  account: string;
  filename: string;
}

export default function SharedFileViewer({ account, filename }: SharedFileViewerProps) {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileExists, setFileExists] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if file exists
    const checkFile = async () => {
      try {
        const metadata = await shelbyClient.coordination.getBlobMetadata({
          account,
          name: filename,
        });
        setFileExists(!!metadata);
      } catch (err) {
        console.error("Error checking file:", err);
        setFileExists(false);
      }
    };

    checkFile();
  }, [account, filename]);

  const downloadFile = async () => {
    try {
      setDownloading(true);
      setError(null);

      // Download file from Shelby storage
      const shelbyBlob = await shelbyClient.download({
        account,
        blobName: filename,
      });

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

      // Combine all chunks
      const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      const blobData = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        blobData.set(chunk, offset);
        offset += chunk.length;
      }

      // Create download
      const blob = new Blob([blobData], { type: "application/octet-stream" });
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
      setError(error.message || "Download failed");
    } finally {
      setDownloading(false);
    }
  };

  if (fileExists === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-gray-200 max-w-md w-full">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Checking file...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!fileExists) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-gray-200 max-w-md w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">File Not Found</h2>
            <p className="text-gray-600 mb-6">
              This file doesn't exist or may have been removed.
            </p>
            <a
              href="/"
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Go to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-gray-200 max-w-md w-full">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Shared File</h2>
          <p className="text-gray-600 mb-2 break-all font-medium">{filename}</p>
          <p className="text-xs text-gray-500 mb-6 break-all">
            Owner: {account.substring(0, 6)}...{account.substring(account.length - 4)}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={downloadFile}
            disabled={downloading}
            className="w-full group/btn relative flex items-center justify-center gap-2 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-blue-400/20 mb-4"
          >
            {downloading ? (
              <>
                <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <svg className="h-6 w-6 transition-transform duration-300 group-hover/btn:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                <span>Download File</span>
              </>
            )}
          </button>

          <a
            href="/"
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Upload your own files
          </a>
        </div>
      </div>
    </div>
  );
}
