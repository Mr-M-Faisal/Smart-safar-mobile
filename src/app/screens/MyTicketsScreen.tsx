import { AppLayout } from '../components/AppLayout';
import { Calendar, MapPin, Ticket as TicketIcon, Clock } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export function MyTicketsScreen() {
  const tickets = [
    {
      id: 'SSF-001247',
      from: 'D-Ground',
      to: 'Satiana Road',
      date: 'May 5, 2026',
      time: '9:00 AM',
      seat: 'B-7',
      bus: '4-B',
      route: 'Route 4',
      status: 'upcoming',
      price: 'PKR 970'
    },
    {
      id: 'SSF-001189',
      from: 'Millat Chowk',
      to: 'Canal Road',
      date: 'May 3, 2026',
      time: '2:30 PM',
      seat: 'A-5',
      bus: '2-A',
      route: 'Route 2',
      status: 'completed',
      price: 'PKR 450'
    },
    {
      id: 'SSF-001156',
      from: 'Samanabad',
      to: 'D-Ground',
      date: 'May 1, 2026',
      time: '11:00 AM',
      seat: 'C-3',
      bus: '4-C',
      route: 'Route 4',
      status: 'completed',
      price: 'PKR 350'
    },
    {
      id: 'SSF-001098',
      from: 'Susan Road',
      to: 'Madina Town',
      date: 'Apr 28, 2026',
      time: '4:00 PM',
      seat: 'D-2',
      bus: '2-B',
      route: 'Route 2',
      status: 'cancelled',
      price: 'PKR 280',
      refund: 'Refunded'
    }
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-[#EF9F27] hover:bg-[#EF9F27] text-white">Upcoming</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-500 text-white">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <AppLayout>
      {/* Header */}
      <div className="bg-[#0F6E56] px-4 py-6">
        <h1 className="text-white text-2xl font-bold">My Tickets</h1>
        <p className="text-white/80 text-sm mt-1">View your booking history</p>
      </div>
      
      {/* Tickets List */}
      <div className="p-4 space-y-4 pb-20">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className={`bg-white border-2 rounded-2xl overflow-hidden shadow-sm ${
              ticket.status === 'upcoming'
                ? 'border-[#0F6E56]'
                : 'border-gray-200'
            }`}
          >
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-[#F4F4F2] to-white px-4 py-3 flex justify-between items-center border-b">
              <div className="flex items-center gap-2">
                <TicketIcon className="w-4 h-4 text-[#0F6E56]" />
                <span className="text-xs font-medium text-gray-600">{ticket.id}</span>
              </div>
              {getStatusBadge(ticket.status)}
            </div>
            
            {/* Route Info */}
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">From</span>
                  </div>
                  <p className="font-semibold text-gray-900">{ticket.from}</p>
                </div>
                
                <div className="px-4">
                  <div className="w-12 h-0.5 bg-gray-300 relative">
                    <div className="absolute -right-1 -top-1 w-2 h-2 bg-gray-300 rounded-full" />
                  </div>
                </div>
                
                <div className="flex-1 text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <span className="text-sm text-gray-500">To</span>
                    <MapPin className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="font-semibold text-gray-900">{ticket.to}</p>
                </div>
              </div>
              
              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-medium">{ticket.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="text-sm font-medium">{ticket.time}</p>
                  </div>
                </div>
              </div>
              
              {/* Bottom Info */}
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="flex gap-4 text-sm">
                  <span className="text-gray-600">
                    Seat: <span className="font-semibold text-gray-900">{ticket.seat}</span>
                  </span>
                  <span className="text-gray-600">
                    Bus: <span className="font-semibold text-gray-900">{ticket.bus}</span>
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#0F6E56]">{ticket.price}</p>
                  {ticket.refund && (
                    <p className="text-xs text-green-600">{ticket.refund}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Empty State */}
        {tickets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <TicketIcon className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-center">No tickets found</p>
            <p className="text-gray-400 text-sm text-center mt-1">
              Your bookings will appear here
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
