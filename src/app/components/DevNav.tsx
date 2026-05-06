import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export function DevNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const screens = [
    { path: '/showcase', name: '🎨 All Screens Showcase' },
    { path: '/', name: '1. Splash Screen' },
    { path: '/home', name: '2. Home / Map' },
    { path: '/routes', name: '3. Routes List' },
    { path: '/route-detail', name: '4. Route Detail' },
    { path: '/bus-detail', name: '5. Bus Detail' },
    { path: '/seat-booking', name: '6. Seat Booking' },
    { path: '/payment', name: '7. Payment' },
    { path: '/confirmation', name: '8. Confirmation' },
    { path: '/tickets', name: '9. My Tickets' },
    { path: '/stop-detail', name: '10. Stop Detail' },
    { path: '/otp', name: '11. OTP Registration' },
    { path: '/profile', name: '12. Profile' },
    { path: '/offline', name: '13. Offline' }
  ];
  
  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-14 right-4 z-[100] bg-purple-600 text-white rounded-full p-2 shadow-lg hover:bg-purple-700 transition-all"
        title="Screen Navigator"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
      
      {/* Navigation Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[90]"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className="fixed top-14 right-4 bottom-20 w-72 bg-white rounded-2xl shadow-2xl z-[95] overflow-hidden flex flex-col">
            <div className="bg-purple-600 text-white p-4">
              <h3 className="font-bold text-lg">Screen Navigator</h3>
              <p className="text-xs text-purple-100 mt-1">All 13 Screens</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2">
              {screens.map((screen) => (
                <button
                  key={screen.path}
                  onClick={() => {
                    navigate(screen.path);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg mb-1 text-sm transition-all ${
                    location.pathname === screen.path
                      ? 'bg-purple-100 text-purple-900 font-semibold'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {screen.name}
                </button>
              ))}
            </div>
            
            <div className="border-t border-gray-200 p-3 bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                Development Navigation Helper
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}