import { useState, useEffect } from 'react';
import { TestRun } from '../types/TestRun';
import { initialData } from '../data/initialData';

export const useDataLoader = () => {
  const [data, setData] = useState<TestRun[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const params = new URLSearchParams(window.location.search);
      const dataUrl = params.get('data');
      
      if (!dataUrl) return;

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(dataUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, setData, loading, error };
};