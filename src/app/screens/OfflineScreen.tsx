import { AppLayout } from '../components/AppLayout';
import { WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';

export function OfflineScreen() {
  const handleRetry = () => {
    window.location.reload();
  };
  
  return (
    <AppLayout>
      <div className="min-h-[calc(100vh-11rem-4rem)] flex flex-col items-center justify-center p-6">
        {/* Illustration */}
        <div className="mb-8">
          <div className="relative">
            {/* Bus illustration */}
            <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
              {/* Bus Stop */}
              <rect x="150" y="20" width="4" height="80" fill="#CBD5E1" />
              <circle cx="152" cy="15" r="8" fill="#0F6E56" />
              <rect x="140" y="10" width="24" height="3" fill="#0F6E56" />
              
              {/* Bus */}
              <rect x="30" y="40" width="80" height="50" rx="8" fill="#0F6E56" />
              <rect x="35" y="45" width="15" height="12" rx="2" fill="#E0F2F1" opacity="0.6" />
              <rect x="55" y="45" width="15" height="12" rx="2" fill="#E0F2F1" opacity="0.6" />
              <rect x="75" y="45" width="15" height="12" rx="2" fill="#E0F2F1" opacity="0.6" />
              <rect x="95" y="45" width="10" height="12" rx="2" fill="#E0F2F1" opacity="0.6" />
              
              {/* Wheels */}
              <circle cx="50" cy="90" r="8" fill="#1F2937" />
              <circle cx="50" cy="90" r="4" fill="#6B7280" />
              <circle cx="90" cy="90" r="8" fill="#1F2937" />
              <circle cx="90" cy="90" r="4" fill="#6B7280" />
              
              {/* Detail */}
              <rect x="105" y="55" width="3" height="20" rx="1" fill="#EF9F27" />
            </svg>
            
            {/* Offline Icon */}
            <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg">
              <WifiOff className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>
        
        {/* Message */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            No Internet Connection
          </h1>
          <p className="text-gray-600 mb-2">
            Showing cached route information
          </p>
          <p className="text-sm text-gray-500">
            Connect to the internet for real-time updates
          </p>
        </div>
        
        {/* Cached Route Info */}
        <div className="w-full bg-[#F4F4F2] rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Cached Routes</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Route 4</p>
                <p className="text-xs text-gray-500">D-Ground → Satiana Road</p>
              </div>
              <span className="text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded-full">
                Offline
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Route 2</p>
                <p className="text-xs text-gray-500">Millat Chowk → Canal Road</p>
              </div>
              <span className="text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded-full">
                Offline
              </span>
            </div>
          </div>
        </div>
        
        {/* Static Map Preview */}
        <div className="w-full bg-gradient-to-br from-green-50 to-blue-50 rounded-xl h-32 mb-6 flex items-center justify-center border-2 border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Map unavailable</p>
            <p className="text-xs text-gray-400">Requires internet connection</p>
          </div>
        </div>
        
        {/* Retry Button */}
        <Button
          onClick={handleRetry}
          className="w-full bg-[#0F6E56] hover:bg-[#0F6E56]/90 text-white rounded-xl h-12"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Try Again
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          Make sure you're connected to Wi-Fi or mobile data
        </p>
      </div>
    </AppLayout>
  );
}
