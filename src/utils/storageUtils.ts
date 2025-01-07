import { ColorScheme } from '../types/ColorScheme';

const STORAGE_KEYS = {
  COLOR_SCHEME: 'pt-color-scheme',
  DATE_RANGE: 'pt-date-range',
  EXCLUDED_TESTS: 'pt-excluded-tests',
  SORT_ORDER: 'pt-sort-order',
  TEST_ORDER: 'pt-test-order'
};

export interface StorageSettings {
  colorScheme: ColorScheme;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  excludedTests: string[];
  sortOrder: 'asc' | 'desc';
  testOrder: string[];
}

export const saveSettings = (settings: Partial<StorageSettings>) => {
  Object.entries(settings).forEach(([key, value]) => {
    localStorage.setItem(STORAGE_KEYS[key as keyof typeof STORAGE_KEYS], JSON.stringify(value));
  });
};

export const loadSettings = (): Partial<StorageSettings> => {
  const settings: Partial<StorageSettings> = {};
  
  Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
    const value = localStorage.getItem(storageKey);
    if (value) {
      settings[key as keyof StorageSettings] = JSON.parse(value);
    }
  });
  
  return settings;
};

export const exportSettings = (): string => {
  const settings = loadSettings();
  return JSON.stringify(settings, null, 2);
};