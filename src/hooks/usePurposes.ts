import { useMemo } from 'react';
import { TestRun } from '../types/TestRun';
import { getLabelByType } from '../utils/labelUtils';

export const usePurposes = (data: TestRun[]): string[] => {
  return useMemo(() => {
    const purposeSet = new Set<string>();
    if (Array.isArray(data)) {
      data.forEach(run => {
        const purposeLabel = getLabelByType(run.labels, 'Purpose/');
        if (purposeLabel) {
          purposeSet.add(purposeLabel.name);
        }
      });
    }
    return ['All', ...Array.from(purposeSet)].sort();
  }, [data]);
};