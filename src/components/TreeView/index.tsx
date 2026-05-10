import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { TreeNode } from '../../types/tree';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface TreeViewProps {
  data: TreeNode;
  basePath?: string;
}

export default function TreeView({ data, basePath = '' }: TreeViewProps) {
  const { nodePath } = useParams<{ nodePath: string }>();
  const location = useLocation();
  const nodeRef = useRef<HTMLAnchorElement>(null);
  
  const currentPath = basePath ? `${basePath}/${data.name}` : data.name;
  const encodedPath = encodeURIComponent(currentPath);

  const decodedNodePath = nodePath ? decodeURIComponent(nodePath) : '';
  const isNodeInActivePath = 
    decodedNodePath === currentPath || 
    decodedNodePath.startsWith(`${currentPath}/`) ||
    nodePath === currentPath || 
    (nodePath && nodePath.startsWith(`${currentPath}/`));

  const isActiveNode = decodedNodePath === currentPath || nodePath === currentPath;

  const [isOpen, setIsOpen] = useState(
    data.name === 'root' || !basePath || isNodeInActivePath
  );

  useEffect(() => {
    if (isNodeInActivePath) {
      setIsOpen(true);
    }
  }, [isNodeInActivePath]);

  useEffect(() => {
    if (isActiveNode && nodeRef.current) {
      // Small timeout
      const timeout = setTimeout(() => {
        nodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isActiveNode]);

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const isFolder = data.type === 'folder';

  return (
    <div className="select-none mt-0.5">
      <div className="flex items-center">
        {isFolder ? (
          <button onClick={toggleOpen} className="p-1 -ml-1 text-gray-400 hover:text-gray-900 transition-colors">
            {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        ) : (
          <div className="w-3.5 h-3.5 ml-1 mr-1" />
        )}
        <NavLink
          ref={nodeRef}
          to={`/tree/${encodedPath}${location.search}`}
          className={({ isActive }) =>
            twMerge(
              clsx(
                "flex items-center gap-2 py-1.5 px-2 rounded-md text-sm transition-colors flex-1",
                isActive ? "bg-gray-100 text-black font-medium" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )
            )
          }
        >
          {isFolder ? <Folder className="w-4 h-4 text-blue-500 fill-blue-500/20" /> : <File className="w-4 h-4 text-gray-400" />}
          <span className="truncate">{data.name}</span>
        </NavLink>
      </div>

      {isFolder && isOpen && data.children && (
        <div className="ml-3 pl-3 border-l border-gray-100">
          {data.children.map((child, i) => (
            <TreeView key={i} data={child} basePath={currentPath} />
          ))}
        </div>
      )}
    </div>
  );
}
