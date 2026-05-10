import { HardDrive, Layers } from 'lucide-react';
import StatCard from '../StatCard';
import { formatSize } from '../../../utils/treeUtils';

interface FolderStatsProps {
  childrenCount: number;
  totalSize: number;
}

export default function FolderStats({ childrenCount, totalSize }: FolderStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <StatCard
        label="Direct Children"
        value={<>{childrenCount} <span className="text-lg text-gray-400 font-normal">items</span></>}
        icon={<Layers className="w-6 h-6" />}
        iconClassName="bg-green-50/50 text-green-600 group-hover:bg-green-100"
      />
      <StatCard
        label="Total Subtree Size"
        value={formatSize(totalSize)}
        icon={<HardDrive className="w-6 h-6" />}
        iconClassName="bg-blue-50/50 text-blue-600 group-hover:bg-blue-100"
      />
    </div>
  );
}
