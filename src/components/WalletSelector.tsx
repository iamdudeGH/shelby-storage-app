import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function WalletSelector() {
  const { connect, disconnect, account, connected, wallets } = useWallet();

  const handleConnect = async () => {
    try {
      const petraWallet = wallets?.find(w => w.name === "Petra");
      if (petraWallet) {
        await connect(petraWallet.name);
      }
    } catch (error: any) {
      console.error("Connection error:", error);
    }
  };

  const formatAddress = (address: string | undefined) => {
    if (!address) return "";
    const addr = String(address);
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  if (connected && account) {
    return (
      <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <code className="text-white font-mono text-sm">
            {formatAddress(account.address)}
          </code>
        </div>
        <button
          onClick={disconnect}
          className="bg-red-500/80 hover:bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-full transition-all"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="bg-white text-purple-600 font-semibold px-6 py-2.5 rounded-full hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl"
    >
      👛 Connect Wallet
    </button>
  );
}