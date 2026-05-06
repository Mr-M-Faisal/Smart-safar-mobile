import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { Search, Navigation, Bus } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { ToastDemo } from '../components/ToastDemo';

const ROUTES = [
  {
    id: '4',
    label: 'Route 4',
    color: '#0F6E56',
    path: 'M 60 30 C 80 80, 100 130, 130 180 C 160 230, 200 260, 220 310 C 240 350, 230 380, 210 410',
    stops: [
      { x: 60, y: 30, name: 'D-Ground' },
      { x: 118, y: 170, name: 'Millat Chowk' },
      { x: 215, y: 305, name: 'Samanabad' },
    ],
    busAnim: { x: [108, 133] as [number,number], y: [158, 183] as [number,number] },
    eta: '8 min', seats: 12, busId: '4-B',
  },
  {
    id: '2',
    label: 'Route 2',
    color: '#185FA5',
    path: 'M 310 20 C 280 70, 240 110, 200 160 C 160 210, 130 260, 120 320 C 110 360, 120 390, 140 420',
    stops: [
      { x: 310, y: 20, name: 'Millat Chowk' },
      { x: 196, y: 155, name: 'Jinnah Col.' },
      { x: 130, y: 315, name: 'Canal Road' },
    ],
    busAnim: { x: [190, 168] as [number,number], y: [143, 173] as [number,number] },
    eta: '9 min', seats: 5, busId: '2-A',
  },
  {
    id: '7',
    label: 'Route 7',
    color: '#7F77DD',
    path: 'M 30 210 C 80 198, 140 192, 190 205 C 240 218, 280 242, 310 282 C 330 312, 340 342, 330 382',
    stops: [
      { x: 30, y: 210, name: 'Samanabad' },
      { x: 188, y: 205, name: 'Peoples Col.' },
      { x: 325, y: 378, name: 'Madina Town' },
    ],
    busAnim: { x: [148, 183] as [number,number], y: [190, 200] as [number,number] },
    eta: '14 min', seats: 28, busId: '7-C',
  },
  {
    id: '3',
    label: 'Route 3',
    color: '#EF9F27',
    path: 'M 180 390 C 200 350, 250 305, 280 255 C 310 205, 320 155, 300 105 C 280 65, 240 32, 200 22',
    stops: [
      { x: 200, y: 22, name: 'Susan Rd' },
      { x: 293, y: 248, name: 'Tariq Rd' },
      { x: 180, y: 390, name: 'GMA' },
    ],
    busAnim: { x: [285, 293] as [number,number], y: [238, 258] as [number,number] },
    eta: '7 min', seats: 0, busId: '3-D',
  },
];

export function HomeScreen() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string>('all');

  const visibleRoutes = activeId === 'all' ? ROUTES : ROUTES.filter((r) => r.id === activeId);
  const activeRoute = activeId === 'all' ? ROUTES[0] : (ROUTES.find((r) => r.id === activeId) ?? ROUTES[0]);

  return (
    <AppLayout>
      <ToastDemo />
      <div className="relative bg-[#EAF3DE]" style={{ height: 'calc(100vh - 11rem)' }}>

        {/* SVG map with real route paths + animated buses */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 375 480"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Road grid */}
          <line x1="0" y1="150" x2="375" y2="150" stroke="white" strokeWidth="12" opacity="0.6" />
          <line x1="0" y1="280" x2="375" y2="280" stroke="white" strokeWidth="12" opacity="0.6" />
          <line x1="0" y1="385" x2="375" y2="385" stroke="white" strokeWidth="8" opacity="0.5" />
          <line x1="100" y1="0" x2="100" y2="480" stroke="white" strokeWidth="12" opacity="0.6" />
          <line x1="230" y1="0" x2="230" y2="480" stroke="white" strokeWidth="12" opacity="0.6" />
          <line x1="330" y1="0" x2="330" y2="480" stroke="white" strokeWidth="8" opacity="0.5" />
          <rect x="105" y="155" width="120" height="120" rx="4" fill="white" opacity="0.12" />
          <rect x="235" y="155" width="90" height="120" rx="4" fill="white" opacity="0.12" />

          {visibleRoutes.map((route) => (
            <g key={route.id}>
              <path d={route.path} stroke="rgba(0,0,0,0.15)" strokeWidth="9" fill="none" strokeLinecap="round" />
              <motion.path
                d={route.path}
                stroke={route.color}
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="10 5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
              {route.stops.map((s, i) => (
                <g key={i} onClick={() => navigate('/stop-detail')} style={{ cursor: 'pointer' }}>
                  <circle cx={s.x} cy={s.y} r="7" fill="white" stroke={route.color} strokeWidth="2.5" />
                  <text x={s.x + 9} y={s.y + 4} fontSize="8" fill="#1f2937" fontFamily="sans-serif">{s.name}</text>
                </g>
              ))}
              <motion.g
                animate={{ x: route.busAnim.x, y: route.busAnim.y }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              >
                <rect x="-14" y="-9" width="28" height="18" rx="4" fill={route.color} />
                <text x="0" y="5" fontSize="7" fill="white" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">
                  {route.label.split(' ')[1]}
                </text>
              </motion.g>
            </g>
          ))}
        </svg>

        {/* Search */}
        <div className="absolute top-3 left-3 right-3 z-20">
          <div className="bg-white rounded-2xl shadow-lg flex items-center px-4 py-2.5">
            <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
            <input type="text" placeholder="Search stop or route..." className="flex-1 outline-none text-sm bg-transparent text-gray-800" />
          </div>
        </div>

        {/* Location button */}
        <button className="absolute z-20 bg-white rounded-full p-2.5 shadow-lg" style={{ top: '3.5rem', right: '0.75rem' }}>
          <Navigation className="w-4 h-4 text-[#0F6E56]" />
        </button>

        {/* Filter chips — each chip filters the map AND sets context for bottom drawer */}
        <div className="absolute z-20 flex gap-2 overflow-x-auto" style={{ top: '3.5rem', left: '0.75rem', maxWidth: 'calc(100% - 3.5rem)' }}>
          <button
            onClick={() => setActiveId('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-md whitespace-nowrap transition-all ${
              activeId === 'all' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'
            }`}
          >
            All Routes
          </button>
          {ROUTES.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveId(r.id)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold shadow-md whitespace-nowrap transition-all border-2"
              style={
                activeId === r.id
                  ? { backgroundColor: r.color, borderColor: r.color, color: 'white' }
                  : { backgroundColor: 'white', borderColor: r.color, color: r.color }
              }
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Bottom drawer — updates when filter changes */}
        <motion.div
          key={activeId}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 25 }}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl px-5 pt-3 pb-5 z-20"
        >
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-3" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl p-2.5" style={{ backgroundColor: activeRoute.color }}>
                <Bus className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-gray-900 text-base leading-tight">
                    {activeId === 'all' ? 'All Routes' : activeRoute.label}
                  </p>
                  {activeId !== 'all' && (
                    <span className="text-xs text-gray-400">Bus {activeRoute.busId}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block animate-pulse" />
                    <span className="text-xs font-semibold" style={{ color: activeRoute.color }}>
                      {activeRoute.eta} away
                    </span>
                  </span>
                  <span className="text-xs text-gray-500">
                    {activeRoute.seats === 0 ? '⚠ No seats' : `${activeRoute.seats} seats free`}
                  </span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => activeId === 'all' ? navigate('/routes') : navigate(`/route-detail/${activeId}`)}
              className="rounded-xl px-5 text-sm font-semibold text-white"
              style={{ backgroundColor: activeRoute.color }}
            >
              {activeId === 'all' ? 'All' : 'View'}
            </Button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
