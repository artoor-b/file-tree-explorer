import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import React from 'react';

interface BreadcrumbsProps {
  path: string;
}

export default function Breadcrumbs({ path }: BreadcrumbsProps) {
  const location = useLocation();
  const parts = path.split('/').filter(Boolean);
  
  return (
    <div className="flex items-center flex-wrap gap-2 text-sm text-gray-500 mb-6 bg-gray-50 px-4 py-2 rounded-lg max-w-full border border-gray-100">
      {parts.map((part, index) => {
        const currentPath = parts.slice(0, index + 1).join('/');
        const isLast = index === parts.length - 1;
        
        return (
          <React.Fragment key={index}>
            <Link 
              to={`/tree/${encodeURIComponent(currentPath)}${location.search}`}
              className={`hover:text-black transition-colors ${isLast ? 'font-medium text-gray-900' : ''}`}
            >
              {part}
            </Link>
            {!isLast && <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
