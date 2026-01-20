export default function FaucetInfo() {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">💰</span>
        <h2 className="text-2xl font-bold text-gray-800">Get Test Tokens</h2>
      </div>

      <div className="space-y-6">
        {/* Info Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <span className="text-4xl">🚰</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Need Tokens for Testing?
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                To test file uploads and other features on Shelby Storage, you'll need both APT tokens (for gas fees) and ShelbyUSD tokens (for storage payments).
                Get free test tokens from the official Shelby faucets!
              </p>
              
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://docs.shelby.xyz/tools/cli#aptos-tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span>💎</span>
                  <span>Get APT Tokens</span>
                  <span>→</span>
                </a>
                
                <a
                  href="https://docs.shelby.xyz/tools/cli#shelbyusd-tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span>💵</span>
                  <span>Get ShelbyUSD Tokens</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <p className="text-sm text-gray-700 font-medium mb-2">
                How to Get Tokens:
              </p>
              <ol className="text-xs text-gray-600 space-y-2 list-decimal list-inside">
                <li>Click the buttons above to visit the Shelby documentation</li>
                <li>Follow the instructions to get <strong>APT tokens</strong> (for gas fees)</li>
                <li>Then get <strong>ShelbyUSD tokens</strong> (for storage payments)</li>
                <li>Come back and start uploading files!</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💎</span>
              <div>
                <p className="text-sm text-gray-800 font-medium mb-1">
                  APT Tokens
                </p>
                <p className="text-xs text-gray-600">
                  Aptos native cryptocurrency used for transaction fees (gas) on the network.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💵</span>
              <div>
                <p className="text-sm text-gray-800 font-medium mb-1">
                  ShelbyUSD Tokens
                </p>
                <p className="text-xs text-gray-600">
                  Stablecoin used on Shelby network for storage payments and transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
