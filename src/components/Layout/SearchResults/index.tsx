import { Link, useLocation } from 'react-router-dom';
import { Folder, File } from 'lucide-react';
import { TreeNode } from '../../../types/tree';

interface SearchResultItem {
  node: TreeNode;
  path: string;
}

interface SearchResultsProps {
  results: SearchResultItem[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  const location = useLocation();

  if (results.length === 0) {
    return <p className="text-sm text-gray-500 text-center mt-4">No results found.</p>;
  }

  return (
    <div className="space-y-1">
      {results.map((res, i) => (
        <Link
          key={i}
          to={`/tree/${encodeURIComponent(res.path)}${location.search}`}
          className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-200 transition-colors group"
        >
          <div className="mt-0.5">
            {res.node.type === 'folder' ? (
              <Folder className="w-4 h-4 text-blue-500 fill-blue-500/20" />
            ) : (
              <File className="w-4 h-4 text-gray-400" />
            )}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {res.node.name}
            </span>
            <span className="text-xs text-gray-500 truncate" title={res.path}>
              {res.path}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
