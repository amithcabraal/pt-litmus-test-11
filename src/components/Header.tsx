import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ColorScheme } from '../types/ColorScheme';
import { saveSettings } from '../utils/storageUtils';
import ColorSchemeSelector from './menu/ColorSchemeSelector';
import SettingsActions from './menu/SettingsActions';

interface HeaderProps {
  onColorSchemeChange: (scheme: ColorScheme) => void;
  currentColorScheme: ColorScheme;
}

const Header: React.FC<HeaderProps> = ({
  onColorSchemeChange,
  currentColorScheme
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const settings = JSON.parse(e.target?.result as string);
        if (settings.colorScheme) {
          onColorSchemeChange(settings.colorScheme);
          saveSettings({ colorScheme: settings.colorScheme });
        }
      } catch (error) {
        console.error('Error importing settings:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="ml-4 text-xl font-semibold text-gray-800">
            Performance Test Execution Summary
          </h1>
        </div>

        {isMenuOpen && (
          <div className="fixed top-16 left-0 w-64 bg-white shadow-lg rounded-lg mt-2 p-4 z-50">
            <ColorSchemeSelector
              currentScheme={currentColorScheme}
              onSchemeChange={onColorSchemeChange}
              onClose={() => setIsMenuOpen(false)}
            />
            <SettingsActions onImport={handleImportSettings} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;