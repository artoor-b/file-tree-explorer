import { FolderNode } from '../../../types/tree';
import { getFolderSize, getChildrenCount } from '../../../utils/treeUtils';
import { Folder } from 'lucide-react';
import Breadcrumbs from '../Breadcrumbs';
import NodeHeader from '../NodeHeader';
import FolderStats from './FolderStats';
import FolderContents from './FolderContents';

interface FolderDetailsProps {
  node: FolderNode;
  path: string;
}

export default function FolderDetails({ node, path }: FolderDetailsProps) {
  const childrenCount = getChildrenCount(node);
  const totalSize = getFolderSize(node);

  return (
    <div className="p-8 max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumbs path={path} />
      <NodeHeader 
        name={node.name} 
        path={path} 
        icon={<Folder className="w-10 h-10 text-blue-500 fill-blue-500/20" />} 
      />
      <FolderStats childrenCount={childrenCount} totalSize={totalSize} />
      <FolderContents childrenNodes={node.children || []} parentPath={path} />
    </div>
  );
}
