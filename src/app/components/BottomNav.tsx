import { Link, useLocation } from 'react-router';
import { Map, List, Ticket, User } from 'lucide-react';

export function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    { path: '/home', icon: Map, label: 'Home' },
    { path: '/routes', icon: List, label: 'Routes' },
    { path: '/tickets', icon: Ticket, label: 'My Tickets' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom z-50">
      <div className="flex justify-around items-center h-16 max-w-[375px] mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path === '/home' && location.pathname === '/');
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center flex-1 h-full"
            >
              <Icon 
                className={`w-6 h-6 mb-1 ${isActive ? 'text-[#0F6E56]' : 'text-gray-400'}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-xs ${isActive ? 'text-[#0F6E56] font-medium' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
