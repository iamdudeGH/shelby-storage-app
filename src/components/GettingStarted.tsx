import { useState } from "react";

export default function GettingStarted() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-pink-500/10 p-8 border border-pink-500/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/50">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Getting Started</h2>
            <p className="text-sm text-gray-400">Quick setup guide</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-gray-200 transition-colors font-medium text-sm px-4 py-2 rounded-lg hover:bg-zinc-700/50"
        >
          {isExpanded ? "Hide" : "Show"}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Introduction */}
          <div className="bg-zinc-900/50 rounded-xl p-4 border border-pink-500/30">
            <p className="text-gray-300 text-sm">
              Welcome to <strong className="text-pink-400">Shelby Storage</strong>! Follow these simple steps to start uploading and managing your files on the decentralized Aptos network.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="bg-zinc-900/50 rounded-xl p-6 border-l-4 border-pink-500 shadow-md hover:shadow-lg hover:shadow-pink-500/10 transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-pink-500/50">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Install Petra Wallet
                  </h3>
                  <p className="text-sm text-gray-300 mb-3">
                    Download and install the Petra Wallet browser extension for Chrome, Brave, or Edge.
                  </p>
                  <a
                    href="https://petra.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
                  >
                    <span>🔗</span>
                    <span>Download Petra Wallet</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-zinc-900/50 rounded-xl p-6 border-l-4 border-fuchsia-500 shadow-md hover:shadow-lg hover:shadow-fuchsia-500/10 transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-fuchsia-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-fuchsia-500/50">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Switch to SHELBYNET
                  </h3>
                  <p className="text-sm text-gray-300 mb-3">
                    Open Petra Wallet → Click Settings (⚙️) → Select <strong className="text-pink-400">Network</strong> → Choose <strong className="text-pink-400">SHELBYNET</strong>
                  </p>
                  <div className="bg-fuchsia-500/10 rounded-lg p-3 border border-fuchsia-500/30">
                    <p className="text-xs text-fuchsia-300 font-medium mb-1">
                      💡 Important:
                    </p>
                    <p className="text-xs text-fuchsia-200/80">
                      SHELBYNET is built-in to Petra Wallet. Just switch to it from the network dropdown!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-zinc-900/50 rounded-xl p-6 border-l-4 border-pink-500 shadow-md hover:shadow-lg hover:shadow-pink-500/10 transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-pink-500/50">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Connect Your Wallet
                  </h3>
                  <p className="text-sm text-gray-300 mb-3">
                    Click the <strong className="text-pink-400">"Connect Wallet"</strong> button in the top right corner and approve the connection.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>👆</span>
                    <span>Look for the button in the header above</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-zinc-900/50 rounded-xl p-6 border-l-4 border-rose-500 shadow-md hover:shadow-lg hover:shadow-rose-500/10 transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-rose-500/50">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Get Test Tokens (Faucet)
                  </h3>
                  <p className="text-sm text-gray-300 mb-3">
                    You need two types of tokens:
                  </p>
                  <ul className="space-y-2 mb-3">
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-gray-400">💎</span>
                      <span className="text-gray-300">
                        <strong className="text-white">APT Tokens</strong> - For transaction fees (gas)
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-gray-400">💵</span>
                      <span className="text-gray-300">
                        <strong className="text-white">ShelbyUSD Tokens</strong> - For storage payments
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-300 mb-3">
                    Click the faucet buttons below to get free test tokens!
                  </p>
                  <div className="flex items-center gap-2 text-sm text-pink-400">
                    <span>👇</span>
                    <span>Scroll down to the "Get Test Tokens" section</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-zinc-900/50 rounded-xl p-6 border-l-4 border-emerald-500 shadow-md hover:shadow-lg hover:shadow-emerald-500/10 transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-emerald-500/50">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Upload Your Files!
                  </h3>
                  <p className="text-sm text-gray-300 mb-3">
                    Once you have tokens, you're ready to go! Select a file, set an expiration, and click upload.
                  </p>
                  <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/30">
                    <p className="text-xs text-emerald-300 font-medium mb-1">
                      🎉 You're all set!
                    </p>
                    <p className="text-xs text-emerald-200/80">
                      Your files will be stored securely on the decentralized Aptos network!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
            <div className="flex items-start gap-3">
              <span className="text-2xl">❓</span>
              <div>
                <p className="text-sm text-amber-300 font-medium mb-1">
                  Need Help?
                </p>
                <p className="text-xs text-amber-200/80 mb-2">
                  If you encounter any issues, check the browser console (F12) or visit the Shelby documentation.
                </p>
                <a
                  href="https://docs.shelby.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-300 font-medium underline hover:text-amber-200"
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
