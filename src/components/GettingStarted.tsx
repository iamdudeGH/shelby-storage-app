import { useState } from "react";

export default function GettingStarted() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-blue-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🚀</span>
          <h2 className="text-2xl font-bold text-gray-800">Getting Started</h2>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          {isExpanded ? "▼ Collapse" : "▶ Expand"}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Introduction */}
          <div className="bg-white rounded-xl p-4 border border-blue-200">
            <p className="text-gray-700 text-sm">
              Welcome to <strong>Shelby Storage</strong>! Follow these simple steps to start uploading and managing your files on the decentralized Aptos network.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Install Petra Wallet
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Download and install the Petra Wallet browser extension for Chrome, Brave, or Edge.
                  </p>
                  <a
                    href="https://petra.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
                  >
                    <span>🔗</span>
                    <span>Download Petra Wallet</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-6 border-l-4 border-indigo-500 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Add SHELBYNET to Your Wallet
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Open Petra Wallet → Settings (⚙️) → Network → Click <strong>"Add Custom Network"</strong>
                  </p>
                  <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200 mb-3">
                    <p className="text-xs text-indigo-800 font-medium mb-2">
                      Network Details:
                    </p>
                    <ul className="text-xs text-indigo-700 space-y-1">
                      <li>• <strong>Name:</strong> SHELBYNET</li>
                      <li>• <strong>RPC URL:</strong> https://fullnode.shelbynet.aptoslabs.com/v1</li>
                      <li>• <strong>Chain ID:</strong> Check Shelby docs</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                    <p className="text-xs text-yellow-800 font-medium mb-1">
                      💡 Important:
                    </p>
                    <p className="text-xs text-yellow-700">
                      Make sure you're on <strong>SHELBYNET</strong> to use the Shelby Storage app!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Connect Your Wallet
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Click the <strong>"Connect Wallet"</strong> button in the top right corner and approve the connection.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>👆</span>
                    <span>Look for the button in the header above</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-xl p-6 border-l-4 border-pink-500 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Get Test Tokens (Faucet)
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    You need two types of tokens:
                  </p>
                  <ul className="space-y-2 mb-3">
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-gray-600">💎</span>
                      <span className="text-gray-700">
                        <strong>APT Tokens</strong> - For transaction fees (gas)
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-gray-600">💵</span>
                      <span className="text-gray-700">
                        <strong>ShelbyUSD Tokens</strong> - For storage payments
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mb-3">
                    Click the faucet buttons below to get free test tokens!
                  </p>
                  <div className="flex items-center gap-2 text-sm text-purple-600">
                    <span>👇</span>
                    <span>Scroll down to the "Get Test Tokens" section</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-xl p-6 border-l-4 border-green-500 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Upload Your Files!
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Once you have tokens, you're ready to go! Select a file, set an expiration, and click upload.
                  </p>
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <p className="text-xs text-green-800 font-medium mb-1">
                      🎉 You're all set!
                    </p>
                    <p className="text-xs text-green-700">
                      Your files will be stored securely on the decentralized Aptos network!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">❓</span>
              <div>
                <p className="text-sm text-yellow-800 font-medium mb-1">
                  Need Help?
                </p>
                <p className="text-xs text-yellow-700 mb-2">
                  If you encounter any issues, check the browser console (F12) or visit the Shelby documentation.
                </p>
                <a
                  href="https://docs.shelby.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-yellow-800 font-medium underline hover:text-yellow-900"
                >
                  📚 Visit Documentation →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
