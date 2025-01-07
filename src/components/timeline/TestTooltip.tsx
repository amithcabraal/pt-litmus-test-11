import React, { useEffect, useRef, useState } from 'react';
import { TestRun } from '../../types/TestRun';
import { formatDate } from '../../utils/dateUtils';
import { getTestName, getPurpose, getSentiment } from '../../utils/labelUtils';
import { X } from 'lucide-react';

interface TestTooltipProps {
  run: TestRun;
  position: { x: number; y: number };
  onClose: () => void;
}

const TestTooltip: React.FC<TestTooltipProps> = ({ run, position, onClose }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState(position);

  useEffect(() => {
    if (tooltipRef.current) {
      const tooltip = tooltipRef.current;
      const rect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let newX = position.x;
      let newY = position.y - 120;

      if (position.x + rect.width > viewportWidth) {
        newX = viewportWidth - rect.width - 20;
      }

      if (newY < 0) {
        newY = position.y + 20;
      } else if (newY + rect.height > viewportHeight) {
        newY = viewportHeight - rect.height - 20;
      }

      setTooltipPosition({ x: newX, y: newY });
    }
  }, [position]);

  const totalVUsers = 
    run.dev_vusers_num +
    run.api_vusers_num +
    run.ui_vusers_num +
    run.erp_vusers_num +
    run.legacy_vusers_num +
    run.mobile_vusers_num;

  const sentiment = getSentiment(run);

  return (
    <div
      ref={tooltipRef}
      className="fixed z-50 bg-white rounded-lg shadow-lg p-4 text-sm"
      style={{
        left: `${tooltipPosition.x}px`,
        top: `${tooltipPosition.y}px`,
        minWidth: '300px'
      }}
    >
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
      >
        <X size={16} />
      </button>
      <div className="space-y-2 mt-4">
        <div className="font-semibold text-gray-800">{getTestName(run)}</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <div className="text-gray-600">Status:</div>
          <div className={`font-medium ${
            run.ui_status === 'PASSED' ? 'text-green-600' : 'text-red-600'
          }`}>{run.ui_status}</div>
          
          <div className="text-gray-600">Purpose:</div>
          <div>{getPurpose(run)}</div>
          
          <div className="text-gray-600">Sentiment:</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sentiment.color }} />
            {sentiment.name}
          </div>
          
          <div className="text-gray-600">Start Time:</div>
          <div>{formatDate(parseInt(run.loadtestbegintime))}</div>
          
          <div className="text-gray-600">Duration:</div>
          <div>{Math.round(parseInt(run.duration) / 1000)}s</div>
          
          <div className="text-gray-600">Total VUsers:</div>
          <div>{totalVUsers}</div>
          
          <div className="text-gray-600">Run By:</div>
          <div>{run.test_run_user}</div>
        </div>
      </div>
    </div>
  );
};

export default TestTooltip;