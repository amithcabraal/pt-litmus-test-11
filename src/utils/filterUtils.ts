import { TestRun } from '../types/TestRun';
import { getLabelByType } from './labelUtils';

export const filterTestsByDateRange = (
  data: TestRun[],
  startDate: number | null,
  endDate: number | null
): TestRun[] => {
  if (!startDate && !endDate) return data;
  
  return data.filter(run => {
    const testStart = parseInt(run.loadtestbegintime);
    if (isNaN(testStart)) return false;
    
    if (startDate && testStart < startDate) return false;
    if (endDate && testStart > endDate) return false;
    
    return true;
  });
};

export const filterTestsByPurpose = (
  data: TestRun[],
  purpose: string
): TestRun[] => {
  if (!purpose || purpose === 'All') return data;
  
  return data.filter(run => {
    const purposeLabel = getLabelByType(run.labels, 'Purpose/');
    return purposeLabel?.name === purpose;
  });
};