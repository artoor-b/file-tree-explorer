import { Link } from 'react-router-dom';
import { Search, ArrowLeft, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
}

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className="p-4 border-b border-gray-200 flex items-center gap-2 bg-white">
      <Link to="/" className="p-2 -ml-2 text-gray-500 hover:text-black rounded-md hover:bg-gray-100 transition-colors" title="Back to Home">
        <ArrowLeft className="w-4 h-4" />
      </Link>
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-9 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-2 top-2 p-0.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
