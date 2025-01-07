import React, { useState, useEffect } from 'react';
import TestTimeline from './components/TestTimeline';
import DataImport from './components/DataImport';
import DateRangeFilter from './components/DateRangeFilter';
import Header from './components/Header';
import WelcomeDialog from './components/dialog/WelcomeDialog';
import { useWelcomeDialog } from './hooks/useWelcomeDialog';
import { useDataLoader } from './hooks/useDataLoader';
import { TestRun } from './types/TestRun';
import { ColorScheme, defaultColorSchemes } from './types/ColorScheme';
import { ColorMode } from './types/ColorMode';
import { filterTestsByDateRange, filterTestsByPurpose } from './utils/filterUtils';
import { loadSettings, saveSettings } from './utils/storageUtils';

function App() {
  const { data, setData, loading, error } = useDataLoader();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [colorScheme, setColorScheme] = useState<ColorScheme>(defaultColorSchemes.viridis);
  const [colorMode, setColorMode] = useState<ColorMode>('vusers');
  const [excludedTests, setExcludedTests] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [testOrder, setTestOrder] = useState<string[]>([]);
  const [selectedPurpose, setSelectedPurpose] = useState<string>('All');
  const { isWelcomeOpen, closeWelcome } = useWelcomeDialog();

  useEffect(() => {
    const settings = loadSettings();
    if (settings.colorScheme) setColorScheme(settings.colorScheme);
    if (settings.dateRange) {
      setStartDate(settings.dateRange.startDate);
      setEndDate(settings.dateRange.endDate);
    }
    if (settings.excludedTests) setExcludedTests(settings.excludedTests);
    if (settings.sortOrder) setSortOrder(settings.sortOrder);
    if (settings.testOrder) setTestOrder(settings.testOrder);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading data...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-600">Error loading data: {error}</div>;
  }

  const filteredByDate = filterTestsByDateRange(
    data,
    startDate ? new Date(startDate).getTime() : null,
    endDate ? new Date(endDate).getTime() : null
  );

  const filteredData = filterTestsByPurpose(filteredByDate, selectedPurpose);

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    saveSettings({ dateRange: { startDate: start, endDate: end } });
  };

  const handleExcludeTest = (testName: string) => {
    const newExcludedTests = [...excludedTests, testName];
    setExcludedTests(newExcludedTests);
    saveSettings({ excludedTests: newExcludedTests });
  };

  const handleIncludeTest = (testName: string) => {
    const newExcludedTests = excludedTests.filter(t => t !== testName);
    setExcludedTests(newExcludedTests);
    saveSettings({ excludedTests: newExcludedTests });
  };

  const handleSortOrderChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    saveSettings({ sortOrder: order });
  };

  const handleTestOrderChange = (newOrder: string[]) => {
    setTestOrder(newOrder);
    saveSettings({ testOrder: newOrder });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <WelcomeDialog isOpen={isWelcomeOpen} onClose={closeWelcome} />
      <Header
        onColorSchemeChange={setColorScheme}
        currentColorScheme={colorScheme}
      />
      <div className="bg-white shadow-md">
        <div className="max-w-[2000px] mx-auto p-6">
          <DataImport onDataImport={setData} />
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={(start) => handleDateChange(start, endDate)}
            onEndDateChange={(end) => handleDateChange(startDate, end)}
          />
          <TestTimeline
            data={filteredData}
            colorScheme={colorScheme}
            colorMode={colorMode}
            onColorModeChange={setColorMode}
            excludedTests={excludedTests}
            onExcludeTest={handleExcludeTest}
            onIncludeTest={handleIncludeTest}
            sortOrder={sortOrder}
            onSortOrderChange={handleSortOrderChange}
            testOrder={testOrder}
            onTestOrderChange={handleTestOrderChange}
            selectedPurpose={selectedPurpose}
            onPurposeChange={setSelectedPurpose}
          />
        </div>
      </div>
    </div>
  );
}

export default App;