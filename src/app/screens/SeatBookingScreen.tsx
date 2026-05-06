import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { ArrowLeft, Armchair } from 'lucide-react';
import { Button } from '../components/ui/button';

export function SeatBookingScreen() {
  const navigate = useNavigate();
  const [selectedSeat, setSelectedSeat] = useState<string | null>('B-7');
  
  // 8 rows × 4 seats
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const columns = [1, 2, 3, 4];
  
  const occupiedSeats = ['A-1', 'A-3', 'B-2', 'C-1', 'C-4', 'D-3', 'E-1', 'E-4', 'F-2', 'G-1', 'G-3', 'H-2'];
  const bookedSeats = ['A-2', 'B-1', 'D-4', 'F-3'];
  
  const getSeatStatus = (seatId: string) => {
    if (seatId === selectedSeat) return 'selected';
    if (occupiedSeats.includes(seatId)) return 'occupied';
    if (bookedSeats.includes(seatId)) return 'booked';
    return 'available';
  };
  
  const getSeatColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500 hover:bg-green-600';
      case 'occupied':
        return 'bg-gray-400 cursor-not-allowed';
      case 'booked':
        return 'bg-red-500 cursor-not-allowed';
      case 'selected':
        return 'bg-blue-600 ring-4 ring-blue-300';
      default:
        return 'bg-green-500';
    }
  };
  
  const handleSeatClick = (seatId: string) => {
    const status = getSeatStatus(seatId);
    if (status === 'available' || status === 'selected') {
      setSelectedSeat(selectedSeat === seatId ? null : seatId);
    }
  };
  
  return (
    <AppLayout showBottomNav={false}>
      {/* Header */}
      <div className="bg-[#0F6E56] px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white font-semibold text-lg">Select Your Seat</h1>
          <div className="w-6" />
        </div>

        {/* FIX #3: clear booking context — user always knows which route/bus/fare */}
        <div className="bg-white/15 rounded-xl px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white/25 rounded-lg px-2 py-0.5">
              <span className="text-white text-xs font-bold">Route 4</span>
            </div>
            <span className="text-white/80 text-xs">Bus 4-B · D-Ground → Satiana</span>
          </div>
          <div className="text-right">
            <span className="text-white font-bold text-sm">PKR 950</span>
            <span className="text-white/70 text-xs block">+ PKR 20 fee</span>
          </div>
        </div>
      </div>
      
      <div className="p-6 overflow-y-auto h-[calc(100vh-11rem-4rem-8rem)]">
        {/* Legend */}
        <div className="flex justify-center gap-6 mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded" />
            <span className="text-xs text-gray-600">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded" />
            <span className="text-xs text-gray-600">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded" />
            <span className="text-xs text-gray-600">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded ring-2 ring-blue-300" />
            <span className="text-xs text-gray-600">Selected</span>
          </div>
        </div>
        
        {/* Driver Section */}
        <div className="mb-6">
          <div className="bg-gray-200 rounded-xl p-3 text-center">
            <p className="text-xs font-medium text-gray-600">🚗 Driver</p>
          </div>
        </div>
        
        {/* Seat Map */}
        <div className="space-y-3">
          {rows.map((row) => (
            <div key={row} className="flex items-center gap-2">
              <span className="w-6 text-sm font-semibold text-gray-700">{row}</span>
              <div className="flex gap-2 flex-1 justify-center">
                {/* Left side - 2 seats */}
                {columns.slice(0, 2).map((col) => {
                  const seatId = `${row}-${col}`;
                  const status = getSeatStatus(seatId);
                  return (
                    <button
                      key={col}
                      onClick={() => handleSeatClick(seatId)}
                      disabled={status === 'occupied' || status === 'booked'}
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${getSeatColor(
                        status
                      )}`}
                    >
                      <Armchair className="w-6 h-6 text-white" />
                    </button>
                  );
                })}
                
                {/* Aisle */}
                <div className="w-8" />
                
                {/* Right side - 2 seats */}
                {columns.slice(2, 4).map((col) => {
                  const seatId = `${row}-${col}`;
                  const status = getSeatStatus(seatId);
                  return (
                    <button
                      key={col}
                      onClick={() => handleSeatClick(seatId)}
                      disabled={status === 'occupied' || status === 'booked'}
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${getSeatColor(
                        status
                      )}`}
                    >
                      <Armchair className="w-6 h-6 text-white" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Summary */}
      {selectedSeat && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#0F6E56] p-4 max-w-[375px] mx-auto">
          {/* FIX #3: clear summary — seat, route, total all visible at a glance */}
          <div className="bg-[#0F6E56] rounded-xl p-4 mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-white/80 text-xs">Seat selected</span>
              <span className="font-bold text-2xl text-white">{selectedSeat}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/80 text-xs">Route 4 · Bus 4-B · D-Ground → Satiana</span>
              <span className="font-bold text-white text-base">PKR 970</span>
            </div>
          </div>
          
          <Button
            onClick={() => navigate('/payment')}
            className="w-full bg-[#0F6E56] hover:bg-[#0F6E56]/90 text-white rounded-xl"
          >
            Confirm & Pay
          </Button>
        </div>
      )}
    </AppLayout>
  );
}
