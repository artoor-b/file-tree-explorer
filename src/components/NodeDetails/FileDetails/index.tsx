import { FileNode } from '../../../types/tree';
import { formatSize } from '../../../utils/treeUtils';
import { File, HardDrive, Hash } from 'lucide-react';
import Breadcrumbs from '../Breadcrumbs';
import NodeHeader from '../NodeHeader';
import StatCard from '../StatCard';

interface FileDetailsProps {
  node: FileNode;
  path: string;
}

export default function FileDetails({ node, path }: FileDetailsProps) {
  return (
    <div className="p-8 max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumbs path={path} />
      <NodeHeader 
        name={node.name} 
        path={path} 
        icon={<File className="w-10 h-10 text-gray-400" />} 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          label="File Size"
          value={formatSize(node.size)}
          icon={<HardDrive className="w-6 h-6" />}
          iconClassName="bg-blue-50/50 text-blue-600 group-hover:bg-blue-100"
        />
        <StatCard
          label="Node Type"
          value={<span className="capitalize">{node.type}</span>}
          icon={<Hash className="w-6 h-6" />}
          iconClassName="bg-purple-50/50 text-purple-600 group-hover:bg-purple-100"
        />
      </div>
    </div>
  );
}
