import React from 'react';
import { ColorMode } from '../../types/ColorMode';

interface ColorModeSelectorProps {
  colorMode: ColorMode;
  onColorModeChange: (mode: ColorMode) => void;
}

const ColorModeSelector: React.FC<ColorModeSelectorProps> = ({
  colorMode,
  onColorModeChange,
}) => {
  return (
    <select
      value={colorMode}
      onChange={(e) => onColorModeChange(e.target.value as ColorMode)}
      className="px-3 py-2 border rounded-lg text-sm"
    >
      <option value="vusers">Color by VUsers</option>
      <option value="sentiment">Color by Sentiment</option>
    </select>
  );
};

export default ColorModeSelector;