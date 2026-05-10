import { Outlet } from 'react-router-dom';
import EmptyState from '../EmptyState';

interface MainContentProps {
  isExactTreeRoute: boolean;
}

export default function MainContent({ isExactTreeRoute }: MainContentProps) {
  return (
    <div className={`flex-1 overflow-y-auto bg-white flex-col ${isExactTreeRoute ? 'hidden md:flex' : 'flex'}`}>
      {isExactTreeRoute ? <EmptyState /> : <Outlet />}
    </div>
  );
}
