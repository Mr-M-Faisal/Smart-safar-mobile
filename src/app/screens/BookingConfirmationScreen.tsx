import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { CheckCircle, Download, Share2, Home } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

export function BookingConfirmationScreen() {
  const navigate = useNavigate();
  const confettiTriggered = useRef(false);
  
  useEffect(() => {
    if (!confettiTriggered.current) {
      confettiTriggered.current = true;
      
      // Trigger confetti
      const duration = 2000;
      const end = Date.now() + duration;
      
      const colors = ['#0F6E56', '#EF9F27', '#ffffff'];
      
      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, []);
  
  return (
    <AppLayout showBottomNav={false}>
      <div className="min-h-[calc(100vh-11rem)] p-6 flex flex-col">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center mb-6 mt-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <CheckCircle className="w-24 h-24 text-green-500" strokeWidth={2} />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute inset-0 bg-green-500/20 rounded-full -z-10 blur-xl"
            />
          </div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-gray-900 mt-6"
          >
            Booking Confirmed!
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 text-center mt-2"
          >
            Your seat has been successfully booked
          </motion.p>
        </motion.div>
        
        {/* Digital Ticket */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-[#0F6E56] to-[#0F6E56]/80 rounded-2xl p-6 text-white mb-6 shadow-xl"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-white/80 text-sm mb-1">Passenger</p>
              <p className="text-xl font-bold">Ayesha Malik</p>
            </div>
            <div className="bg-[#EF9F27] px-3 py-1 rounded-full">
              <p className="text-xs font-semibold">Seat B-7</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-white/70 text-xs mb-1">From</p>
              <p className="font-semibold">Faisalabad</p>
              <p className="text-sm text-white/80">D-Ground</p>
            </div>
            <div>
              <p className="text-white/70 text-xs mb-1">To</p>
              <p className="font-semibold">Lahore</p>
              <p className="text-sm text-white/80">Satiana Road</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center border-t border-white/20 pt-4">
            <div>
              <p className="text-white/70 text-xs mb-1">Departure</p>
              <p className="font-semibold">9:00 AM</p>
              <p className="text-xs text-white/80">May 5, 2026</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs mb-1">Bus</p>
              <p className="font-semibold">4-B</p>
              <p className="text-xs text-white/80">Route 4</p>
            </div>
          </div>
        </motion.div>
        
        {/* QR Code */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6"
        >
          <p className="text-center text-sm text-gray-600 mb-4">Scan to board</p>
          <div className="bg-gray-900 aspect-square rounded-xl flex items-center justify-center">
            {/* QR Code Placeholder */}
            <svg width="200" height="200" viewBox="0 0 200 200">
              <rect width="200" height="200" fill="white" />
              {/* QR code pattern simulation */}
              {[...Array(10)].map((_, i) =>
                [...Array(10)].map((_, j) => (
                  <rect
                    key={`${i}-${j}`}
                    x={i * 20}
                    y={j * 20}
                    width="18"
                    height="18"
                    fill={Math.random() > 0.5 ? 'black' : 'white'}
                  />
                ))
              )}
            </svg>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">Booking ID: SSF-2024-001247</p>
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-3 mt-auto"
        >
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-[#0F6E56] text-[#0F6E56] hover:bg-[#0F6E56]/5 rounded-xl"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-[#0F6E56] text-[#0F6E56] hover:bg-[#0F6E56]/5 rounded-xl"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
          
          <Button
            onClick={() => navigate('/home')}
            className="w-full bg-[#0F6E56] hover:bg-[#0F6E56]/90 text-white rounded-xl"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </motion.div>
      </div>
    </AppLayout>
  );
}
