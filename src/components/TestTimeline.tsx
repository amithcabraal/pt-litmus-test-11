import React, { useState } from 'react';
import { TestRun } from '../types/TestRun';
import { ColorScheme } from '../types/ColorScheme';
import { ColorMode } from '../types/ColorMode';
import { getTimelineBounds, getUniqueTestNames, groupTestsByName } from '../utils/timelineUtils';
import TimelineRow from './TimelineRow';
import TimelineLegend from './TimelineLegend';
import TimelineAxis from './timeline/TimelineAxis';
import TimelineControls from './timeline/TimelineControls';
import TimelineWeekends from './timeline/TimelineWeekends';

interface TestTimelineProps {
  data: TestRun[];
  colorScheme: ColorScheme;
  colorMode: ColorMode;
  onColorModeChange: (mode: ColorMode) => void;
  excludedTests: string[];
  onExcludeTest: (testName: string) => void;
  onIncludeTest: (testName: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  testOrder: string[];
  onTestOrderChange: (order: string[]) => void;
  selectedPurpose: string;
  onPurposeChange: (purpose: string) => void;
  width?: number;
}

const TestTimeline: React.FC<TestTimelineProps> = ({
  data = [],
  colorScheme,
  colorMode,
  onColorModeChange,
  excludedTests,
  onExcludeTest,
  onIncludeTest,
  sortOrder,
  onSortOrderChange,
  testOrder,
  onTestOrderChange,
  selectedPurpose,
  onPurposeChange,
  width = window.innerWidth - 80
}) => {
  const [showHidden, setShowHidden] = useState(false);
  const [draggedTest, setDraggedTest] = useState<string | null>(null);
  const [dragOverTest, setDragOverTest] = useState<string | null>(null);

  const { minDate, maxDate } = getTimelineBounds(data);
  let testNames = getUniqueTestNames(data);
  
  if (testOrder.length > 0) {
    testNames = [
      ...testOrder.filter(name => testNames.includes(name)),
      ...testNames.filter(name => !testOrder.includes(name))
    ];
  } else {
    testNames.sort((a, b) => sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a));
  }

  const groupedTests = groupTestsByName(data);
  const rowHeight = 50;
  const labelWidth = 300;
  const visibleTests = showHidden ? testNames : testNames.filter(name => !excludedTests.includes(name));
  const height = Math.max((visibleTests.length + 2) * rowHeight, 200);

  const handleDragStart = (testName: string) => {
    setDraggedTest(testName);
  };

  const handleDragOver = (testName: string) => {
    if (draggedTest && draggedTest !== testName) {
      setDragOverTest(testName);
    }
  };

  const handleDrop = (targetTest: string) => {
    if (!draggedTest || draggedTest === targetTest) return;

    const newOrder = [...(testOrder.length > 0 ? testOrder : testNames)];
    const fromIndex = newOrder.indexOf(draggedTest);
    const toIndex = newOrder.indexOf(targetTest);

    if (fromIndex !== -1 && toIndex !== -1) {
      newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, draggedTest);
      onTestOrderChange(newOrder);
    }

    setDraggedTest(null);
    setDragOverTest(null);
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px]">
        <TimelineControls
          sortOrder={sortOrder}
          onSortOrderChange={onSortOrderChange}
          colorMode={colorMode}
          onColorModeChange={onColorModeChange}
          showHidden={showHidden}
          onToggleHidden={() => setShowHidden(!showHidden)}
          data={data}
          selectedPurpose={selectedPurpose}
          onPurposeChange={onPurposeChange}
        />
        <div className="relative">
          <svg width={width} height={100}>
            <TimelineLegend
              width={width}
              colorScheme={colorScheme}
              colorMode={colorMode}
            />
            <TimelineAxis
              width={width}
              minDate={minDate}
              maxDate={maxDate}
              labelWidth={labelWidth}
            />
          </svg>
          <div className="relative">
            <svg
              width={width}
              height={height}
              className="absolute top-0 left-0 pointer-events-none"
            >
              <TimelineWeekends
                minDate={minDate}
                maxDate={maxDate}
                width={width}
                labelWidth={labelWidth}
              />
            </svg>
            <div className="relative">
              {visibleTests.map((testName) => (
                <TimelineRow
                  key={testName}
                  testName={testName}
                  runs={groupedTests[testName] || []}
                  width={width}
                  minDate={minDate}
                  maxDate={maxDate}
                  y={0}
                  labelWidth={labelWidth}
                  colorScheme={colorScheme}
                  colorMode={colorMode}
                  isExcluded={excludedTests.includes(testName)}
                  onToggleExclude={() =>
                    excludedTests.includes(testName)
                      ? onIncludeTest(testName)
                      : onExcludeTest(testName)
                  }
                  isDragging={draggedTest === testName}
                  isDragOver={dragOverTest === testName}
                  onDragStart={() => handleDragStart(testName)}
                  onDragOver={() => handleDragOver(testName)}
                  onDrop={() => handleDrop(testName)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTimeline;