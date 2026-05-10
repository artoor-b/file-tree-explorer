import React from 'react';
import { UploadCloud } from 'lucide-react';

interface FileUploaderProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent<HTMLLabelElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLLabelElement>) => void;
  onDrop: (e: React.DragEvent<HTMLLabelElement>) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileUploader({
  isDragging, onDragOver, onDragLeave, onDrop, onFileUpload
}: FileUploaderProps) {
  return (
    <label 
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
        isDragging ? 'border-blue-400 bg-blue-50 scale-[1.02]' : 'border-gray-300 hover:bg-gray-100 hover:border-gray-400'
      }`}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500 pointer-events-none">
        <UploadCloud className={`w-8 h-8 mb-3 transition-transform ${isDragging ? 'text-blue-500 scale-110' : ''}`} />
        <p className={`mb-1 text-sm font-medium ${isDragging ? 'text-blue-600' : ''}`}>
          {isDragging ? 'Drop JSON file here' : 'Click to upload JSON'}
        </p>
        <p className={`text-xs ${isDragging ? 'text-blue-400' : ''}`}>or drag and drop here</p>
      </div>
      <input type="file" accept=".json" className="hidden" onChange={onFileUpload} />
    </label>
  );
}
