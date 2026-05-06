import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { ArrowLeft, Bus, Clock, MapPin, Navigation } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';

// ─── Per-route data ────────────────────────────────────────────────────────
// Each route has its own colour, stops list, and SVG map path so every route
// opens a DIFFERENT map feed (fixes issue #2 and issue #1).
const ROUTE_DATA: Record<
  string,
  {
    name: string;
    color: string;
    from: string;
    to: string;
    fare: string;
    busId: string;
    speed: number;
    seatsLeft: number;
    totalSeats: number;
    currentStop: string;
    nextStop: string;
    etaNext: string;
    // SVG path for the route line (drawn inside a 200×460 viewBox)
    svgPath: string;
    // Stop positions along the SVG path [cx, cy]
    stopPositions: [number, number][];
    // Active bus position on the path (initial)
    busStart: [number, number];
    busEnd: [number, number];
    stops: { name: string; eta: string; passed: boolean; active?: boolean }[];
  }
> = {
  '4': {
    name: 'Route 4',
    color: '#0F6E56',
    from: 'D-Ground Chowk',
    to: 'Satiana Road',
    fare: 'PKR 950',
    busId: '4-B',
    speed: 35,
    seatsLeft: 12,
    totalSeats: 40,
    currentStop: 'Millat Chowk',
    nextStop: 'Susan Road',
    etaNext: '8 min',
    svgPath: 'M 100 20 C 80 80, 60 140, 70 200 C 80 260, 120 300, 110 360 C 100 400, 90 430, 100 460',
    stopPositions: [[100,20],[78,90],[68,160],[88,230],[112,300],[106,370],[100,440]],
    busStart: [80, 150],
    busEnd: [88, 220],
    stops: [
      { name: 'D-Ground Chowk', eta: 'Departed', passed: true },
      { name: 'Ghulam Muhammad Abad', eta: 'Departed', passed: true },
      { name: 'Millat Chowk', eta: '3 min', passed: false, active: true },
      { name: 'Susan Road', eta: '8 min', passed: false },
      { name: 'Samanabad', eta: '12 min', passed: false },
      { name: 'Madina Town', eta: '18 min', passed: false },
      { name: 'Satiana Road', eta: '32 min', passed: false },
    ],
  },
  '2': {
    name: 'Route 2',
    color: '#185FA5',
    from: 'Millat Chowk',
    to: 'Canal Road',
    fare: 'PKR 650',
    busId: '2-A',
    speed: 28,
    seatsLeft: 5,
    totalSeats: 35,
    currentStop: 'Jinnah Colony',
    nextStop: 'Canal Road',
    etaNext: '9 min',
    svgPath: 'M 40 20 C 80 60, 140 100, 160 160 C 180 220, 140 280, 120 340 C 100 390, 80 420, 100 460',
    stopPositions: [[40,20],[90,60],[150,130],[165,200],[130,270],[110,350],[100,440]],
    busStart: [160, 160],
    busEnd: [145, 230],
    stops: [
      { name: 'Millat Chowk', eta: 'Departed', passed: true },
      { name: 'People\'s Colony', eta: 'Departed', passed: true },
      { name: 'Jinnah Colony', eta: '2 min', passed: false, active: true },
      { name: 'Nishatabad', eta: '9 min', passed: false },
      { name: 'Gulshan-e-Iqbal', eta: '15 min', passed: false },
      { name: 'Canal Road', eta: '22 min', passed: false },
    ],
  },
  '7': {
    name: 'Route 7',
    color: '#7F77DD',
    from: 'Samanabad',
    to: 'Madina Town',
    fare: 'PKR 750',
    busId: '7-C',
    speed: 22,
    seatsLeft: 28,
    totalSeats: 45,
    currentStop: 'Peoples Colony',
    nextStop: 'Gulshan Iqbal',
    etaNext: '14 min',
    svgPath: 'M 160 20 C 140 70, 100 120, 80 180 C 60 240, 70 300, 90 360 C 110 410, 130 440, 100 460',
    stopPositions: [[160,20],[130,80],[85,155],[68,230],[75,310],[100,380],[100,450]],
    busStart: [80, 170],
    busEnd: [68, 240],
    stops: [
      { name: 'Samanabad', eta: 'Departed', passed: true },
      { name: 'Peoples Colony', eta: '1 min', passed: false, active: true },
      { name: 'Gulshan Iqbal', eta: '14 min', passed: false },
      { name: 'Chenab Chowk', eta: '21 min', passed: false },
      { name: 'Sargodha Road', eta: '28 min', passed: false },
      { name: 'Madina Town', eta: '36 min', passed: false },
    ],
  },
  '3': {
    name: 'Route 3',
    color: '#EF9F27',
    from: 'Susan Road',
    to: 'Ghulam Muhammad Abad',
    fare: 'PKR 450',
    busId: '3-D',
    speed: 18,
    seatsLeft: 0,
    totalSeats: 30,
    currentStop: 'Tariq Road',
    nextStop: 'Ghulam Muhammad Abad',
    etaNext: '7 min',
    svgPath: 'M 50 20 Q 100 80 150 140 Q 180 200 160 270 Q 140 330 120 390 Q 110 430 100 460',
    stopPositions: [[50,20],[100,80],[148,138],[168,210],[148,280],[122,360],[100,450]],
    busStart: [165, 210],
    busEnd: [150, 280],
    stops: [
      { name: 'Susan Road', eta: 'Departed', passed: true },
      { name: 'D-Type Colony', eta: 'Departed', passed: true },
      { name: 'Tariq Road', eta: '2 min', passed: false, active: true },
      { name: 'Ghulam Muhammad Abad', eta: '7 min', passed: false },
    ],
  },
};

export function RouteDetailScreen() {
  const navigate = useNavigate();
  // FIX #2: read routeId from URL so each route renders its own data
  const { routeId } = useParams<{ routeId: string }>();
  const route = ROUTE_DATA[routeId ?? '4'] ?? ROUTE_DATA['4'];

  const [selectedStop, setSelectedStop] = useState(
    route.stops.findIndex((s) => s.active) ?? 2
  );

  // Reset selected stop when route changes
  useEffect(() => {
    setSelectedStop(route.stops.findIndex((s) => s.active) ?? 0);
  }, [routeId]);

  const seatsPercent = Math.round((route.seatsLeft / route.totalSeats) * 100);

  return (
    <AppLayout>
      {/* ── Header: shows which route is selected clearly (FIX #3) ── */}
      <div className="px-4 py-3" style={{ backgroundColor: route.color }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-white p-1">
            <ArrowLeft className="w-5 h-5" />
          </button>
          {/* FIX #3: large clear route name + from→to so user always knows which route */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="bg-white/25 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {route.name}
              </span>
              <span className="text-white/80 text-xs truncate">
                {route.from} → {route.to}
              </span>
            </div>
            <p className="text-white text-sm font-semibold mt-0.5">
              Bus {route.busId} · {route.speed} km/h · {route.etaNext} to next stop
            </p>
          </div>
        </div>
      </div>

      <div className="flex" style={{ height: 'calc(100vh - 11rem - 3.5rem)' }}>

        {/* ── Stops Sidebar ── */}
        <div className="w-[42%] bg-white border-r border-gray-100 overflow-y-auto flex-shrink-0">
          <div className="px-3 pt-3 pb-1">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Stops</p>
            {route.stops.map((stop, index) => (
              <button
                key={index}
                onClick={() => setSelectedStop(index)}
                className={`w-full text-left mb-1 rounded-lg px-2 py-1.5 transition-colors ${
                  selectedStop === index
                    ? 'bg-opacity-10 ring-1'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={
                  selectedStop === index
                    ? { backgroundColor: `${route.color}18`, ringColor: route.color }
                    : {}
                }
              >
                <div className="flex items-start gap-2">
                  <div className="flex flex-col items-center mt-0.5 flex-shrink-0">
                    <div
                      className={`w-2.5 h-2.5 rounded-full border-2 ${
                        stop.passed
                          ? 'border-gray-300 bg-gray-300'
                          : stop.active
                          ? 'bg-white border-2'
                          : 'bg-white border-gray-300'
                      }`}
                      style={
                        stop.active
                          ? { borderColor: route.color, backgroundColor: route.color }
                          : stop.passed
                          ? {}
                          : { borderColor: route.color }
                      }
                    />
                    {index < route.stops.length - 1 && (
                      <div
                        className="w-px my-0.5"
                        style={{
                          height: '18px',
                          backgroundColor: stop.passed ? '#D1D5DB' : `${route.color}55`,
                        }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 leading-tight truncate">
                      {stop.name}
                    </p>
                    <p
                      className="text-[10px] font-semibold"
                      style={{
                        color: stop.passed ? '#9CA3AF' : stop.active ? route.color : '#6B7280',
                      }}
                    >
                      {stop.active ? `● ${stop.eta}` : stop.eta}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Map Area: FIX #1 — actual route path + animated bus ── */}
        <div className="flex-1 relative overflow-hidden" style={{ backgroundColor: '#EAF3DE' }}>

          {/* Road grid background */}
          <svg className="absolute inset-0 w-full h-full opacity-30">
            <line x1="0" y1="35%" x2="100%" y2="35%" stroke="#fff" strokeWidth="10" />
            <line x1="0" y1="65%" x2="100%" y2="65%" stroke="#fff" strokeWidth="10" />
            <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#fff" strokeWidth="10" />
            <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#fff" strokeWidth="10" />
          </svg>

          {/* Route SVG — unique path per route */}
          <svg
            viewBox="0 0 200 480"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Grey base road */}
            <path
              d={route.svgPath}
              stroke="#CBD5E1"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
            />
            {/* Coloured route line — animated draw-on */}
            <motion.path
              d={route.svgPath}
              stroke={route.color}
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />

            {/* Stop circles */}
            {route.stopPositions.map(([cx, cy], i) => (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="7"
                  fill={
                    route.stops[i]?.passed
                      ? '#CBD5E1'
                      : route.stops[i]?.active
                      ? route.color
                      : '#fff'
                  }
                  stroke={route.stops[i]?.passed ? '#9CA3AF' : route.color}
                  strokeWidth="2.5"
                />
                {/* Stop name label on right side */}
                <text
                  x={cx + 10}
                  y={cy + 4}
                  fontSize="8"
                  fill="#374151"
                  fontFamily="sans-serif"
                >
                  {route.stops[i]?.name?.split(' ')[0]}
                </text>
              </g>
            ))}

            {/* Animated bus marker */}
            <motion.g
              animate={{
                x: [route.busStart[0] - 12, route.busEnd[0] - 12],
                y: [route.busStart[1] - 8, route.busEnd[1] - 8],
              }}
              transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            >
              <rect width="24" height="16" rx="4" fill={route.color} />
              <text x="12" y="11" fontSize="7" fill="white" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">
                BUS
              </text>
            </motion.g>
          </svg>

          {/* North indicator */}
          <div className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5">
            <Navigation className="w-4 h-4" style={{ color: route.color }} />
          </div>

          {/* ── Bottom info card ── */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl px-4 pt-3 pb-4">
            {/* Bus badge row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="rounded-lg p-2" style={{ backgroundColor: route.color }}>
                  <Bus className="w-4 h-4 text-white" />
                </div>
                <div>
                  {/* FIX #3: clear "Bus X-Y · Route N" label */}
                  <p className="font-bold text-gray-900 text-sm leading-tight">
                    Bus {route.busId}
                    <span
                      className="ml-1.5 text-xs font-semibold px-1.5 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: route.color }}
                    >
                      {route.name}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">Near {route.currentStop}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm" style={{ color: route.color }}>
                  {route.etaNext}
                </p>
                <p className="text-[10px] text-gray-400">to {route.nextStop}</p>
              </div>
            </div>

            {/* Seats bar */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${seatsPercent}%`,
                    backgroundColor: seatsPercent < 20 ? '#EF4444' : route.color,
                  }}
                />
              </div>
              <span className="text-xs text-gray-600 whitespace-nowrap">
                {route.seatsLeft === 0
                  ? 'Full — no seats'
                  : `${route.seatsLeft}/${route.totalSeats} free`}
              </span>
            </div>

            {/* CTA */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 rounded-xl text-xs py-2 h-auto"
                style={{ borderColor: route.color, color: route.color }}
                onClick={() => navigate('/bus-detail')}
              >
                Bus details
              </Button>
              <Button
                className="flex-1 rounded-xl text-xs py-2 h-auto text-white"
                style={{ backgroundColor: route.color }}
                disabled={route.seatsLeft === 0}
                onClick={() => navigate('/seat-booking')}
              >
                {route.seatsLeft === 0 ? 'Seats Full' : 'Book Seat'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
