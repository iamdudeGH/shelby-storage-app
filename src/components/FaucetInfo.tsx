export default function FaucetInfo() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Get Test Tokens</h2>
          <p className="text-sm text-gray-600">Free tokens for testing</p>
        </div>
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
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                  <span>Get APT Tokens</span>
                </a>
                
                <a
                  href="https://docs.shelby.xyz/tools/cli#shelbyusd-tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  <span>Get ShelbyUSD Tokens</span>
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
