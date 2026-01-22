import { useParams } from "react-router-dom";
import SharedFileViewer from "../components/SharedFileViewer";

export default function SharedFilePage() {
  const { account, filename } = useParams<{ account: string; filename: string }>();

  if (!account || !filename) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-gray-200 max-w-md w-full text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Invalid Link</h2>
          <p className="text-gray-600">This link is not valid.</p>
        </div>
      </div>
    );
  }

  return <SharedFileViewer account={account} filename={decodeURIComponent(filename)} />;
}
