import { useEffect } from 'react';
import { toast } from 'sonner';
import { Bus } from 'lucide-react';

export function ToastDemo() {
  useEffect(() => {
    // Demo toast after 5 seconds on home screen
    const timer = setTimeout(() => {
      toast.custom((t) => (
        <div className="bg-white rounded-xl shadow-2xl p-4 border-2 border-[#EF9F27] flex items-center gap-3 max-w-sm">
          <div className="bg-[#EF9F27] rounded-lg p-2">
            <Bus className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">Bus Arriving Soon!</p>
            <p className="text-sm text-gray-600">Bus 4-B arriving in 2 min</p>
          </div>
        </div>
      ), {
        duration: 4000,
      });
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return null;
}
