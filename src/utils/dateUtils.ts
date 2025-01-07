export const formatDateForInput = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toISOString().slice(0, 16); // Format: YYYY-MM-DDThh:mm
};

export const parseInputDate = (dateString: string): number => {
  return new Date(dateString).getTime();
};

export const getDefaultDateRange = () => {
  const now = new Date();
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  
  return {
    startDate: formatDateForInput(twoWeeksAgo.getTime()),
    endDate: formatDateForInput(now.getTime())
  };
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};