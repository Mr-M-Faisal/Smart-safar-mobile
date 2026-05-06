import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { Bus, Clock, MapPin, ChevronRight, Radio } from 'lucide-react';

// Live bus counts per route — swap for real API data later
const LIVE_DATA: Record<string, { buses: number; nextEta: string; seatsLeft: number }> = {
  '4': { buses: 3, nextEta: '4 min', seatsLeft: 12 },
  '2': { buses: 2, nextEta: '9 min', seatsLeft: 5 },
  '7': { buses: 1, nextEta: '14 min', seatsLeft: 28 },
  '3': { buses: 2, nextEta: '7 min', seatsLeft: 0 },
};

export function RoutesListScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const routes = [
    {
      id: '4',
      name: 'Route 4',
      from: 'D-Ground Chowk',
      to: 'Satiana Road',
      stops: 12,
      frequency: '5-8 min',
      distance: '18 km',
      fare: 'PKR 950',
      color: '#0F6E56',
    },
    {
      id: '2',
      name: 'Route 2',
      from: 'Millat Chowk',
      to: 'Canal Road',
      stops: 8,
      frequency: '8-12 min',
      distance: '12 km',
      fare: 'PKR 650',
      color: '#185FA5',
    },
    {
      id: '7',
      name: 'Route 7',
      from: 'Samanabad',
      to: 'Madina Town',
      stops: 10,
      frequency: '10-15 min',
      distance: '15 km',
      fare: 'PKR 750',
      color: '#7F77DD',
    },
    {
      id: '3',
      name: 'Route 3',
      from: 'Susan Road',
      to: 'Ghulam Muhammad Abad',
      stops: 6,
      frequency: '12-18 min',
      distance: '9 km',
      fare: 'PKR 450',
      color: '#EF9F27',
    },
  ];

  const filtered = routes.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      {/* Header */}
      <div className="bg-[#0F6E56] px-4 pt-6 pb-4">
        <h1 className="text-white text-2xl font-bold">All Routes</h1>
        <p className="text-white/80 text-sm mt-1">Tap a route to see live map & buses</p>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-gray-200 bg-white sticky top-0 z-10">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search routes, stops..."
          className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#0F6E56] outline-none text-sm"
        />
      </div>

      {/* Routes List */}
      <div className="p-4 space-y-3 pb-24">
        {filtered.map((route) => {
          const live = LIVE_DATA[route.id];
          const isFull = live.seatsLeft === 0;
          return (
            <div
              key={route.id}
              // FIX #2: navigate to /route-detail/:routeId — each route opens its OWN map
              onClick={() => navigate(`/route-detail/${route.id}`)}
              className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:border-[#0F6E56] hover:shadow-md transition-all active:scale-[0.98]"
            >
              {/* Colored top stripe — unique per route for instant visual ID */}
              <div className="h-1.5 w-full" style={{ backgroundColor: route.color }} />

              <div className="p-4">
                {/* Header row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-xl p-2.5 flex-shrink-0"
                      style={{ backgroundColor: route.color }}
                    >
                      <Bus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      {/* FIX #3: route name is large and clearly labeled */}
                      <h3 className="font-bold text-lg text-gray-900 leading-tight">{route.name}</h3>
                      <p className="text-xs text-gray-400">{route.distance} · {route.stops} stops</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Live badge */}
                    <div className="flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                      <Radio className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-700 font-medium">{live.buses} live</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                </div>

                {/* Route path */}
                <div className="flex items-center gap-2 mb-3 pl-1">
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <div className="w-px h-5 bg-gray-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <p className="text-sm font-medium text-gray-800 leading-none">{route.from}</p>
                    <p className="text-sm font-medium text-gray-800 leading-none">{route.to}</p>
                  </div>
                </div>

                {/* Footer stats */}
                <div
                  className="flex items-center gap-3 pt-3 border-t border-gray-100 text-xs"
                  style={{ borderTopColor: `${route.color}22` }}
                >
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Every {route.frequency}</span>
                  </div>
                  {/* Next bus ETA pill */}
                  <div
                    className="flex items-center gap-1 rounded-full px-2 py-0.5 font-medium"
                    style={{ backgroundColor: `${route.color}18`, color: route.color }}
                  >
                    <MapPin className="w-3 h-3" />
                    <span>Next {live.nextEta}</span>
                  </div>
                  {/* Seats indicator */}
                  <div className={`ml-auto font-semibold text-sm ${isFull ? 'text-red-500' : 'text-[#0F6E56]'}`}>
                    {isFull ? 'Full' : `${live.seatsLeft} seats`}
                  </div>
                  <div className="font-bold text-gray-700">{route.fare}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
