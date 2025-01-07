import React, { useCallback } from 'react';
import { TestRun } from '../types/TestRun';

interface DataImportProps {
  onDataImport: (data: TestRun[]) => void;
}

const DataImport: React.FC<DataImportProps> = ({ onDataImport }) => {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        onDataImport(jsonData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        alert('Error parsing JSON file. Please ensure it\'s a valid JSON file.');
      }
    };
    reader.readAsText(file);
  }, [onDataImport]);

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Import Test Data (JSON)
      </label>
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
  );
};

export default DataImport;