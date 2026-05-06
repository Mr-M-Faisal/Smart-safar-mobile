import { ReactNode } from 'react';
import { StatusBar } from './StatusBar';
import { BottomNav } from './BottomNav';
import { DevNav } from './DevNav';

interface AppLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
  showStatusBar?: boolean;
}

export function AppLayout({ children, showBottomNav = true, showStatusBar = true }: AppLayoutProps) {
  return (
    <div className="relative min-h-screen bg-white max-w-[375px] mx-auto overflow-hidden">
      {showStatusBar && <StatusBar />}
      <div className={`${showStatusBar ? 'pt-11' : ''} ${showBottomNav ? 'pb-16' : ''} min-h-screen`}>
        {children}
      </div>
      {showBottomNav && <BottomNav />}
      <DevNav />
    </div>
  );
}