import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  iconClassName: string;
}

export default function StatCard({ label, value, icon, iconClassName }: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-5 shadow-sm hover:shadow-md transition-all group">
      <div className={`p-3.5 rounded-xl transition-colors ${iconClassName}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <p className="text-2xl font-semibold text-gray-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}
