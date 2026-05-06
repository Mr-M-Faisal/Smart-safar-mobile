import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { ArrowLeft, Star, MapPin, Bus, Clock, Users } from 'lucide-react';
import { motion } from 'motion/react';

export function StopDetailScreen() {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const upcomingBuses = [
    {
      id: '4-B',
      route: 'Route 4',
      eta: '8 min',
      seats: 12,
      totalSeats: 40,
      progress: 35,
      status: 'arriving'
    },
    {
      id: '4-C',
      route: 'Route 4',
      eta: '23 min',
      seats: 34,
      totalSeats: 40,
      progress: 15,
      status: 'scheduled'
    },
    {
      id: '2-A',
      route: 'Route 2',
      eta: '31 min',
      seats: 0,
      totalSeats: 40,
      progress: 10,
      status: 'full'
    }
  ];
  
  return (
    <AppLayout>
      {/* Header */}
      <div className="bg-[#0F6E56] px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => navigate('/home')} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="text-white"
          >
            <Star
              className="w-6 h-6"
              fill={isFavorite ? 'currentColor' : 'none'}
            />
          </button>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-white/20 rounded-xl p-3">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-white text-2xl font-bold mb-1">D-Ground Chowk</h1>
            <p className="text-white/80 text-sm">Central Bus Stop • Faisalabad</p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#F4F4F2] rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-[#0F6E56]">3</p>
            <p className="text-xs text-gray-600 mt-1">Routes</p>
          </div>
          <div className="bg-[#F4F4F2] rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-[#EF9F27]">8</p>
            <p className="text-xs text-gray-600 mt-1">Buses/hr</p>
          </div>
          <div className="bg-[#F4F4F2] rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-gray-900">5</p>
            <p className="text-xs text-gray-600 mt-1">min avg</p>
          </div>
        </div>
        
        {/* Upcoming Buses */}
        <div className="mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Upcoming Buses</h2>
          <div className="space-y-3">
            {upcomingBuses.map((bus, index) => (
              <motion.div
                key={bus.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate('/bus-detail')}
                className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-[#0F6E56] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-lg p-2 ${
                        bus.status === 'arriving'
                          ? 'bg-[#EF9F27]'
                          : bus.status === 'full'
                          ? 'bg-gray-400'
                          : 'bg-[#0F6E56]'
                      }`}
                    >
                      <Bus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Bus {bus.id}</p>
                      <p className="text-xs text-gray-500">{bus.route}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Clock className="w-4 h-4 text-[#0F6E56]" />
                      <span
                        className={`font-semibold ${
                          bus.status === 'arriving'
                            ? 'text-[#EF9F27]'
                            : 'text-[#0F6E56]'
                        }`}
                      >
                        {bus.eta}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">ETA</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative mb-3">
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${bus.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      className={`h-full rounded-full ${
                        bus.status === 'arriving'
                          ? 'bg-[#EF9F27]'
                          : bus.status === 'full'
                          ? 'bg-gray-400'
                          : 'bg-[#0F6E56]'
                      }`}
                    />
                  </div>
                </div>
                
                {/* Seats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    {bus.status === 'full' ? (
                      <span className="text-sm text-red-500 font-medium">Bus Full</span>
                    ) : (
                      <span className="text-sm text-gray-600">
                        <span className="font-semibold text-green-600">{bus.seats}</span> seats
                        available
                      </span>
                    )}
                  </div>
                  
                  {bus.status === 'arriving' && (
                    <span className="bg-[#EF9F27]/10 text-[#EF9F27] text-xs font-medium px-2 py-1 rounded-full">
                      Arriving Soon
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Routes Available */}
        <div>
          <h2 className="font-semibold text-gray-900 mb-3">Routes from this stop</h2>
          <div className="flex flex-wrap gap-2">
            {['Route 2', 'Route 4', 'Route 7'].map((route) => (
              <div
                key={route}
                className="bg-[#0F6E56] text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                {route}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
