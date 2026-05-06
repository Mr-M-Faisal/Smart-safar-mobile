import { Battery, Signal, Wifi } from 'lucide-react';

export function StatusBar() {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
  
  return (
    <div className="fixed top-0 left-0 right-0 bg-[#0F6E56] text-white h-11 flex items-center justify-between px-6 z-50 max-w-[375px] mx-auto">
      <div className="text-sm font-medium">
        {currentTime}
      </div>
      <div className="flex items-center gap-1">
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <Battery className="w-4 h-4" />
      </div>
    </div>
  );
}
