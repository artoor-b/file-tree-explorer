import { Link, useLocation } from 'react-router-dom';
import { TreeNode } from '../../../types/tree';
import { formatSize } from '../../../utils/treeUtils';
import { Folder, File } from 'lucide-react';

interface FolderContentsProps {
  childrenNodes: TreeNode[];
  parentPath: string;
}

export default function FolderContents({ childrenNodes, parentPath }: FolderContentsProps) {
  const location = useLocation();

  if (!childrenNodes || childrenNodes.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Contents</h3>
        <span className="text-xs font-medium text-gray-400 bg-white px-2 py-1 rounded-md border border-gray-200">{childrenNodes.length} items</span>
      </div>

      <ul className="divide-y divide-gray-100">
        {childrenNodes.map((child, i) => {
          const childPath = `${parentPath}/${child.name}`;
          return (
            <li key={i} className="hover:bg-gray-50 transition-colors group">
              <Link
                to={`/tree/${encodeURIComponent(childPath)}${location.search}`}
                className="flex items-center gap-4 px-6 py-4"
              >
                {child.type === 'folder' ? (
                  <Folder className="w-5 h-5 text-blue-500 fill-blue-500/20 group-hover:scale-110 transition-transform" />
                ) : (
                  <File className="w-5 h-5 text-gray-400 group-hover:scale-110 transition-transform" />
                )}

                <span className="flex-1 text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {child.name}
                </span>

                {child.type === 'file' && (
                  <span className="text-sm text-gray-500 font-mono bg-white border border-gray-100 px-2 py-1 rounded shadow-sm">
                    {formatSize(child.size)}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
