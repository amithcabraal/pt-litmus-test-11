import React from 'react';
import { Download, Upload } from 'lucide-react';
import { exportSettings } from '../../utils/storageUtils';

interface SettingsActionsProps {
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SettingsActions: React.FC<SettingsActionsProps> = ({ onImport }) => {
  const handleExport = () => {
    const settings = exportSettings();
    const blob = new Blob([settings], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'performance-test-settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4 pt-4 border-t">
      <button
        onClick={handleExport}
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg w-full"
      >
        <Download size={16} className="mr-2" />
        Export Settings
      </button>
      <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg w-full cursor-pointer">
        <Upload size={16} className="mr-2" />
        Import Settings
        <input
          type="file"
          accept=".json"
          onChange={onImport}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default SettingsActions;