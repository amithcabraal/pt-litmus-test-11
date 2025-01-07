import React, { useState } from 'react';
import { TestRun } from '../types/TestRun';
import { ColorScheme } from '../types/ColorScheme';
import { ColorMode } from '../types/ColorMode';
import { getColor } from '../utils/colorUtils';
import { Eye, EyeOff, GripVertical } from 'lucide-react';
import TestTooltip from './timeline/TestTooltip';

interface TimelineRowProps {
  testName: string;
  runs: TestRun[];
  width: number;
  minDate: number;
  maxDate: number;
  y: number;
  labelWidth: number;
  colorScheme: ColorScheme;
  colorMode: ColorMode;
  isExcluded: boolean;
  onToggleExclude: () => void;
  isDragging?: boolean;
  isDragOver?: boolean;
  onDragStart: () => void;
  onDragOver: () => void;
  onDrop: () => void;
}

const TimelineRow: React.FC<TimelineRowProps> = ({
  testName,
  runs = [],
  width,
  minDate,
  maxDate,
  labelWidth,
  colorScheme,
  colorMode,
  isExcluded,
  onToggleExclude,
  isDragging,
  isDragOver,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  const [selectedRun, setSelectedRun] = useState<TestRun | null>(null);
  const [detailsPosition, setDetailsPosition] = useState({ x: 0, y: 0 });

  if (!Array.isArray(runs)) {
    console.error(`Invalid runs data for test "${testName}"`);
    return null;
  }

  const getXPosition = (timestamp: string) => {
    const time = parseInt(timestamp);
    if (isNaN(time)) return labelWidth;
    return labelWidth + ((time - minDate) / (maxDate - minDate)) * (width - labelWidth - 100);
  };

  const handleClick = (run: TestRun, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setSelectedRun(run);
    setDetailsPosition({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY
    });
  };

  return (
    <div
      className={`relative h-[50px] flex items-center group transition-colors duration-200
        ${isDragging ? 'opacity-50 bg-gray-50' : ''}
        ${isDragOver ? 'bg-blue-50' : 'hover:bg-gray-50'}
      `}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move';
        onDragStart();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver();
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
      }}
    >
      <div className="absolute left-0 top-0 w-full h-full border-b border-gray-200" />
      <div className="absolute left-2 flex items-center gap-2 z-10">
        <div className="cursor-grab active:cursor-grabbing">
          <GripVertical size={16} className="text-gray-400" />
        </div>
        <span className="text-sm text-gray-700 truncate max-w-[200px]">{testName}</span>
        <button
          onClick={onToggleExclude}
          className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isExcluded ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      <svg width={width - labelWidth} height={50} className="absolute left-[300px]">
        {runs.map((run) => (
          <g 
            key={run.run_id}
            onClick={(e) => handleClick(run, e)}
            className="cursor-pointer"
          >
            <line
              x1={getXPosition(run.loadtestbegintime) - labelWidth}
              y1={15}
              x2={getXPosition(run.loadtestbegintime) - labelWidth}
              y2={35}
              stroke="#C0C0C0"
              strokeWidth={4}
            />
            <line
              x1={getXPosition(run.loadtestbegintime) - labelWidth}
              y1={15}
              x2={getXPosition(run.loadtestbegintime) - labelWidth}
              y2={35}
              stroke={getColor(run, colorMode, colorScheme)}
              strokeWidth={2}
            />
          </g>
        ))}
      </svg>
      {selectedRun && (
        <TestTooltip
          run={selectedRun}
          position={detailsPosition}
          onClose={() => setSelectedRun(null)}
        />
      )}
    </div>
  );
};

export default TimelineRow;