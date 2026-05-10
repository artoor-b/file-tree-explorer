import { ReactNode } from 'react';

interface NodeHeaderProps {
  name: string;
  path: string;
  icon: ReactNode;
}

export default function NodeHeader({ name, path, icon }: NodeHeaderProps) {
  return (
    <div className="flex items-center gap-5 mb-10 pb-8 border-b border-gray-100">
      <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight break-all">{name}</h2>
        <p className="text-sm text-gray-500 mt-2 font-mono bg-gray-50 px-2 py-1 rounded inline-block border border-gray-100 break-all">{path}</p>
      </div>
    </div>
  );
}
