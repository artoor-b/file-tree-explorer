import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchTree } from '../../../utils/treeUtils';
import TreeView from '../../TreeView';
import SearchBar from '../SearchBar';
import SearchResults from '../SearchResults';
import { TreeNode } from '../../../types/tree';

interface SidebarProps {
  treeData: TreeNode;
  isExactTreeRoute: boolean;
}

export default function Sidebar({ treeData, isExactTreeRoute }: SidebarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);

  // Handle immediate UI updates for typing, debounce URL updates
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm) {
        setSearchParams({ q: searchTerm });
      } else {
        setSearchParams({});
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm, setSearchParams]);

  const isSearching = query.length > 0;
  const searchResults = isSearching ? searchTree(treeData, query) : [];

  return (
    <div className={`w-full md:w-80 border-gray-200 bg-gray-50 flex flex-col shadow-sm z-10 shrink-0 border-b md:border-b-0 md:border-r ${isExactTreeRoute ? 'flex-1 md:h-auto' : 'h-[35%] md:h-auto'}`}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isSearching ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar border-b border-gray-200">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Search Results</div>
            <SearchResults results={searchResults} />
          </div>
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-white/50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">File Tree</div>
            <TreeView data={treeData} />
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <TreeView data={treeData} />
        </div>
      )}
    </div>
  );
}
