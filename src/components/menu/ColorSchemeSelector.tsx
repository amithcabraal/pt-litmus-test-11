import React, { useState } from 'react';
import { ColorScheme, defaultColorSchemes, ColorStop } from '../../types/ColorScheme';
import { saveSettings } from '../../utils/storageUtils';
import { Plus, X } from 'lucide-react';

interface ColorSchemeSelectorProps {
  currentScheme: ColorScheme;
  onSchemeChange: (scheme: ColorScheme) => void;
  onClose: () => void;
}

const ColorSchemePicker: React.FC<{
  onSave: (scheme: ColorScheme) => void;
  onCancel: () => void;
}> = ({ onSave, onCancel }) => {
  const [name, setName] = useState('Custom Scheme');
  const [stops, setStops] = useState<ColorStop[]>([
    { position: 0, color: '#000000' },
    { position: 1, color: '#ffffff' }
  ]);

  const handleAddStop = () => {
    const newPosition = stops.length > 1 
      ? (stops[stops.length - 2].position + stops[stops.length - 1].position) / 2 
      : 0.5;
    setStops([...stops.slice(0, -1), 
      { position: newPosition, color: '#808080' },
      stops[stops.length - 1]
    ].sort((a, b) => a.position - b.position));
  };

  const handleRemoveStop = (index: number) => {
    if (stops.length > 2) {
      setStops(stops.filter((_, i) => i !== index));
    }
  };

  const handleStopChange = (index: number, color: string) => {
    const newStops = [...stops];
    newStops[index] = { ...newStops[index], color };
    setStops(newStops);
  };

  const handlePositionChange = (index: number, position: number) => {
    if (index === 0) position = 0;
    if (index === stops.length - 1) position = 1;
    const newStops = [...stops];
    newStops[index] = { ...newStops[index], position };
    setStops(newStops.sort((a, b) => a.position - b.position));
  };

  return (
    <div className="p-4 border-t mt-4">
      <h3 className="text-sm font-medium mb-2">Custom Color Scheme</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg mb-4"
        placeholder="Scheme Name"
      />
      
      <div className="space-y-2 mb-4">
        {stops.map((stop, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="color"
              value={stop.color}
              onChange={(e) => handleStopChange(index, e.target.value)}
              className="w-8 h-8"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={stop.position * 100}
              onChange={(e) => handlePositionChange(index, Number(e.target.value) / 100)}
              disabled={index === 0 || index === stops.length - 1}
              className="flex-1"
            />
            {stops.length > 2 && index !== 0 && index !== stops.length - 1 && (
              <button
                onClick={() => handleRemoveStop(index)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={handleAddStop}
          className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          <Plus size={16} className="mr-1" />
          Add Stop
        </button>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-3 py-1 text-sm hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave({ name, stops })}
          className="px-3 py-1 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
};

const ColorSchemeSelector: React.FC<ColorSchemeSelectorProps> = ({
  currentScheme,
  onSchemeChange,
  onClose
}) => {
  const [isCustomizing, setIsCustomizing] = useState(false);

  const handleSchemeChange = (scheme: ColorScheme) => {
    onSchemeChange(scheme);
    saveSettings({ colorScheme: scheme });
    onClose();
  };

  const handleCustomSave = (scheme: ColorScheme) => {
    handleSchemeChange(scheme);
    setIsCustomizing(false);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Color Schemes</h2>
      {!isCustomizing ? (
        <>
          <div className="space-y-2">
            {Object.entries(defaultColorSchemes).map(([key, scheme]) => (
              <button
                key={key}
                onClick={() => handleSchemeChange(scheme)}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  currentScheme.name === scheme.name
                    ? 'bg-blue-100'
                    : 'hover:bg-gray-100'
                }`}
              >
                {scheme.name}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsCustomizing(true)}
            className="w-full mt-2 px-4 py-2 text-left rounded-lg hover:bg-gray-100"
          >
            Create Custom Scheme
          </button>
        </>
      ) : (
        <ColorSchemePicker
          onSave={handleCustomSave}
          onCancel={() => setIsCustomizing(false)}
        />
      )}
    </div>
  );
};

export default ColorSchemeSelector;