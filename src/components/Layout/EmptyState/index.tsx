import { Folder } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
      <Folder className="w-16 h-16 mb-4 text-gray-200" />
      <p className="text-lg font-medium text-gray-500">Select a file or folder</p>
      <p className="text-sm">Navigate using the sidebar to view details</p>
    </div>
  );
}
