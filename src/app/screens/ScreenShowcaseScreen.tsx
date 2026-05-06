import { useNavigate } from 'react-router';
import { AppLayout } from '../components/AppLayout';

export function ScreenShowcaseScreen() {
  const navigate = useNavigate();
  
  const screens = [
    { 
      id: 1, 
      path: '/', 
      name: 'Splash Screen',
      description: 'App launch with animated logo',
      color: 'bg-[#0F6E56]'
    },
    { 
      id: 2, 
      path: '/home', 
      name: 'Home / Live Map',
      description: 'Real-time bus tracking map',
      color: 'bg-green-50'
    },
    { 
      id: 3, 
      path: '/routes', 
      name: 'Routes List',
      description: 'All available bus routes',
      color: 'bg-blue-50'
    },
    { 
      id: 4, 
      path: '/route-detail', 
      name: 'Route Detail',
      description: 'Specific route with stops',
      color: 'bg-purple-50'
    },
    { 
      id: 5, 
      path: '/bus-detail', 
      name: 'Bus Detail',
      description: 'Live bus information sheet',
      color: 'bg-pink-50'
    },
    { 
      id: 6, 
      path: '/seat-booking', 
      name: 'Seat Booking',
      description: 'Interactive seat selection',
      color: 'bg-yellow-50'
    },
    { 
      id: 7, 
      path: '/payment', 
      name: 'Payment',
      description: 'Secure payment gateway',
      color: 'bg-orange-50'
    },
    { 
      id: 8, 
      path: '/confirmation', 
      name: 'Booking Confirmation',
      description: 'Digital ticket with QR code',
      color: 'bg-green-50'
    },
    { 
      id: 9, 
      path: '/tickets', 
      name: 'My Tickets',
      description: 'Booking history',
      color: 'bg-indigo-50'
    },
    { 
      id: 10, 
      path: '/stop-detail', 
      name: 'Stop Detail',
      description: 'Individual bus stop info',
      color: 'bg-teal-50'
    },
    { 
      id: 11, 
      path: '/otp', 
      name: 'OTP Registration',
      description: 'Phone verification',
      color: 'bg-cyan-50'
    },
    { 
      id: 12, 
      path: '/profile', 
      name: 'User Profile',
      description: 'Account and settings',
      color: 'bg-emerald-50'
    },
    { 
      id: 13, 
      path: '/offline', 
      name: 'Offline Mode',
      description: 'No connection state',
      color: 'bg-gray-50'
    }
  ];
  
  return (
    <AppLayout showBottomNav={false}>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F6E56] to-[#EF9F27] px-6 py-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">smartSafar</h1>
        <p className="text-white/90 text-sm mb-1">Complete UI Kit Showcase</p>
        <p className="text-white/80 text-xs">13 Production-Ready Screens</p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 px-4 -mt-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center border border-gray-100">
          <p className="text-2xl font-bold text-[#0F6E56]">13</p>
          <p className="text-xs text-gray-600 mt-1">Screens</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center border border-gray-100">
          <p className="text-2xl font-bold text-[#EF9F27]">100%</p>
          <p className="text-xs text-gray-600 mt-1">Complete</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center border border-gray-100">
          <p className="text-2xl font-bold text-gray-900">375px</p>
          <p className="text-xs text-gray-600 mt-1">Mobile</p>
        </div>
      </div>
      
      {/* Screen Grid */}
      <div className="px-4 pb-6">
        <h2 className="font-semibold text-gray-900 mb-4">All Screens</h2>
        <div className="grid grid-cols-2 gap-3">
          {screens.map((screen) => (
            <button
              key={screen.id}
              onClick={() => navigate(screen.path)}
              className="text-left bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-[#0F6E56] hover:shadow-lg transition-all"
            >
              <div className={`w-full aspect-[9/16] ${screen.color} rounded-lg mb-3 flex items-center justify-center border border-gray-200`}>
                <span className="text-4xl font-bold text-gray-300">
                  {screen.id}
                </span>
              </div>
              <p className="font-semibold text-sm text-gray-900 mb-1">
                {screen.name}
              </p>
              <p className="text-xs text-gray-500">
                {screen.description}
              </p>
            </button>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-[#F4F4F2] px-6 py-6 mt-4">
        <div className="text-center mb-4">
          <h3 className="font-semibold text-gray-900 mb-2">Project Details</h3>
          <p className="text-sm text-gray-600">NUML University Faisalabad</p>
          <p className="text-sm text-gray-600">Final Year Project (FYP)</p>
          <p className="text-sm text-gray-600 mb-4">UX Design Lab 2024</p>
          
          <div className="bg-white rounded-xl p-4 border-2 border-[#0F6E56]">
            <p className="text-xs text-gray-600 mb-2">Design System</p>
            <div className="flex justify-center gap-3 mb-2">
              <div className="w-12 h-12 bg-[#0F6E56] rounded-lg"></div>
              <div className="w-12 h-12 bg-[#EF9F27] rounded-lg"></div>
              <div className="w-12 h-12 bg-[#F4F4F2] rounded-lg border-2 border-gray-200"></div>
            </div>
            <p className="text-xs text-gray-500">
              Teal • Amber • Light Gray
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
