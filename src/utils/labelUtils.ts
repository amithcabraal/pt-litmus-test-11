import { Label, TestRun } from '../types/TestRun';

export const getLabelByType = (labels: Label[], type: string): Label | undefined => {
  return labels.find(label => label.fullName.startsWith(type));
};

export const getTestName = (run: TestRun): string => {
  const testNameLabel = getLabelByType(run.labels, 'Test Names/');
  return testNameLabel?.name || run.name;
};

export const getPurpose = (run: TestRun): string => {
  const purposeLabel = getLabelByType(run.labels, 'Purpose/');
  return purposeLabel?.name || 'N/A';
};

export const getSentiment = (run: TestRun): { name: string; color: string } => {
  const sentimentLabel = getLabelByType(run.labels, 'Outcome Sentiment/');
  return {
    name: sentimentLabel?.name || 'N/A',
    color: sentimentLabel?.color || '#C0C0C0'
  };
};