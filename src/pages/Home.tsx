import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTree } from '@/context/TreeContext';
import { validateTreeStructure } from '@/utils/treeUtils';
import { TreeNode } from '@/types/tree';

import Header from '@/components/Home/Header';
import FileUploader from '@/components/Home/FileUploader';
import UploadedFileCard from '@/components/Home/UploadedFileCard';
import JsonEditor from '@/components/Home/JsonEditor';
import ActionArea from '@/components/Home/ActionArea';


export default function Home() {
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState('');
  const [parsedData, setParsedData] = useState<TreeNode | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { setTreeData } = useTree();
  const navigate = useNavigate();

  useEffect(() => {
    if (!jsonText.trim()) {
      setError('');
      setParsedData(null);
      return;
    }
    try {
      const data = JSON.parse(jsonText);
      const validationError = validateTreeStructure(data);
      if (validationError) {
        setError(`Structure error: ${validationError}`);
        setParsedData(null);
      } else {
        setError('');
        setParsedData(data);
      }
    } catch (e: any) {
      setError('JSON syntax error: Ensure the input is a valid JSON file.');
      setParsedData(null);
    }
  }, [jsonText]);

  const handleProcess = () => {
    if (parsedData && !error) {
      setTreeData(parsedData);
      navigate('/tree');
    }
  };

  const processFile = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonText(content);
      setUploadedFileName(file.name);
    };
    reader.onerror = () => setError('Error reading file');
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.name.endsWith('.json')) {
      processFile(file);
    } else if (file) {
      setError('Please drop a valid .json file.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = '';
  };

  const clearFile = () => {
    setUploadedFileName(null);
    setJsonText('');
    setError('');
    setParsedData(null);
  };

  const handleJsonChange = (value: string) => {
    setJsonText(value);
    if (uploadedFileName) setUploadedFileName(null);
  };

  const isFileValid = !!uploadedFileName && !!parsedData && !error;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-4">
      <div className="max-w-2xl w-full space-y-8">
        <Header />

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm">
          {!uploadedFileName ? (
            <FileUploader
              isDragging={isDragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onFileUpload={handleFileUpload}
            />
          ) : (
            <UploadedFileCard
              fileName={uploadedFileName}
              hasError={!!error}
              onClear={clearFile}
            />
          )}

          <JsonEditor
            value={jsonText}
            onChange={handleJsonChange}
            disabled={isFileValid}
            hasError={!!error}
          />

          <ActionArea
            error={error}
            isReady={!!parsedData && !error}
            onProcess={handleProcess}
          />
        </div>
      </div>
    </div>
  );
}
