import React from 'react';
import { ArrowUpDown, Eye } from 'lucide-react';
import { ColorMode } from '../../types/ColorMode';
import { TestRun } from '../../types/TestRun';
import { usePurposes } from '../../hooks/usePurposes';

interface TimelineControlsProps {
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  colorMode: ColorMode;
  onColorModeChange: (mode: ColorMode) => void;
  showHidden: boolean;
  onToggleHidden: () => void;
  data: TestRun[];
  selectedPurpose: string;
  onPurposeChange: (purpose: string) => void;
}

const TimelineControls: React.FC<TimelineControlsProps> = ({
  sortOrder,
  onSortOrderChange,
  colorMode,
  onColorModeChange,
  showHidden,
  onToggleHidden,
  data = [],
  selectedPurpose,
  onPurposeChange,
}) => {
  const purposes = usePurposes(data);

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <button
        onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
      >
        <ArrowUpDown size={16} className="mr-2" />
        Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
      </button>

      <select
        value={colorMode}
        onChange={(e) => onColorModeChange(e.target.value as ColorMode)}
        className="px-3 py-2 border rounded-lg text-sm"
      >
        <option value="vusers">Colour by VUsers</option>
        <option value="sentiment">Colour by Sentiment</option>
      </select>

      <select
        value={selectedPurpose}
        onChange={(e) => onPurposeChange(e.target.value)}
        className="px-3 py-2 border rounded-lg text-sm"
      >
        {purposes.map(purpose => (
          <option key={purpose} value={purpose}>
            {purpose === 'All' ? 'All Purposes' : purpose}
          </option>
        ))}
      </select>

      <button
        onClick={onToggleHidden}
        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
      >
        <Eye size={16} className="mr-2" />
        {showHidden ? 'Hide Excluded Tests' : 'Show Excluded Tests'}
      </button>
    </div>
  );
};

export default TimelineControls;