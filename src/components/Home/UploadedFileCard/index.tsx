import { FileJson, X } from 'lucide-react';

interface UploadedFileCardProps {
  fileName: string;
  hasError: boolean;
  onClear: () => void;
}

export default function UploadedFileCard({ fileName, hasError, onClear }: UploadedFileCardProps) {
  return (
    <div className={`flex items-center justify-between w-full h-32 border-2 border-dashed rounded-xl px-6 ${hasError ? 'border-red-300 bg-red-50' : 'border-green-400 bg-green-50'}`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${hasError ? 'bg-red-100' : 'bg-green-100'}`}>
          <FileJson className={`w-8 h-8 ${hasError ? 'text-red-500' : 'text-green-600'}`} />
        </div>
        <div>
          <p className={`text-sm font-medium ${hasError ? 'text-red-900' : 'text-green-900'}`}>{fileName}</p>
          <p className={`text-xs mt-1 ${hasError ? 'text-red-500' : 'text-green-600'}`}>
            {hasError ? 'File contains errors' : 'Ready to explore'}
          </p>
        </div>
      </div>
      <button 
        onClick={onClear}
        className={`p-2 rounded-lg transition-colors ${hasError ? 'text-red-500 hover:bg-red-100' : 'text-green-600 hover:bg-green-100'} cursor-pointer`}
        title="Remove file"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
