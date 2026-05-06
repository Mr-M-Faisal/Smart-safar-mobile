import { useNavigate } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { Bus, Clock, Users, Gauge, MapPin, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';

export function BusDetailScreen() {
  const navigate = useNavigate();
  
  return (
    <AppLayout showBottomNav={false}>
      <div className="h-[calc(100vh-11rem)] flex items-end">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => navigate('/route-detail')}
        />
        
        {/* Bottom Sheet */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative z-50 bg-white rounded-t-3xl shadow-2xl w-full max-w-[375px] mx-auto"
        >
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>
          
          {/* Close Button */}
          <button
            onClick={() => navigate('/route-detail')}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="px-6 pb-8 pt-2">
            {/* Bus Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#0F6E56] rounded-2xl p-4">
                <Bus className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">Bus 4-B</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-[#EF9F27]" />
                  <span className="text-[#EF9F27] font-semibold">Arriving in 8 min</span>
                </div>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Seat Availability */}
              <div className="bg-[#F4F4F2] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-[#0F6E56]" />
                  <span className="text-xs text-gray-600">Seats Available</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">12</span>
                  <span className="text-sm text-gray-500">/40 seats</span>
                </div>
                <div className="mt-2 bg-gray-300 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }} />
                </div>
              </div>
              
              {/* Speed */}
              <div className="bg-[#F4F4F2] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-5 h-5 text-[#0F6E56]" />
                  <span className="text-xs text-gray-600">Current Speed</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">35</span>
                  <span className="text-sm text-gray-500">km/h</span>
                </div>
              </div>
            </div>
            
            {/* Current Location */}
            <div className="bg-gradient-to-r from-[#0F6E56]/10 to-[#EF9F27]/10 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0F6E56] mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600 mb-1">Currently near</p>
                  <p className="font-semibold text-gray-900">Millat Chowk</p>
                  <p className="text-xs text-gray-500 mt-1">Moving towards Susan Road</p>
                </div>
              </div>
            </div>
            
            {/* Route Info */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-xs text-gray-500">From</p>
                  <p className="font-semibold">D-Ground</p>
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-0.5 bg-gray-300 relative">
                    <div className="absolute inset-0 bg-[#0F6E56] w-1/3" />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">To</p>
                  <p className="font-semibold">Satiana Road</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-[#0F6E56] text-[#0F6E56] hover:bg-[#0F6E56]/5 rounded-xl"
                onClick={() => navigate('/route-detail')}
              >
                Track This Bus
              </Button>
              <Button
                className="flex-1 bg-[#0F6E56] hover:bg-[#0F6E56]/90 text-white rounded-xl"
                onClick={() => navigate('/seat-booking')}
              >
                Book a Seat
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
