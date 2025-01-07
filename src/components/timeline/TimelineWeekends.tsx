import React from 'react';

interface TimelineWeekendsProps {
  minDate: number;
  maxDate: number;
  width: number;
  labelWidth: number;
}

const TimelineWeekends: React.FC<TimelineWeekendsProps> = ({
  minDate,
  maxDate,
  width,
  labelWidth,
}) => {
  const timeWidth = width - labelWidth - 100;
  const weekendRanges: { start: number; end: number }[] = [];
  
  // Start from the beginning of the day of minDate
  let currentDate = new Date(minDate);
  currentDate.setHours(0, 0, 0, 0);
  
  // Go until the end of the day of maxDate
  const endDate = new Date(maxDate);
  endDate.setHours(23, 59, 59, 999);
  
  while (currentDate <= endDate) {
    const day = currentDate.getDay();
    
    // If it's Saturday (6), mark the weekend start
    if (day === 6) {
      const weekendStart = new Date(currentDate);
      const weekendEnd = new Date(currentDate);
      weekendEnd.setDate(weekendEnd.getDate() + 1); // Add one day for Sunday
      
      weekendRanges.push({
        start: weekendStart.getTime(),
        end: weekendEnd.getTime(),
      });
    }
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  const getXPosition = (timestamp: number) => {
    return labelWidth + ((timestamp - minDate) / (maxDate - minDate)) * timeWidth;
  };
  
  return (
    <>
      {weekendRanges.map((range, index) => {
        const x1 = getXPosition(range.start);
        const x2 = getXPosition(range.end);
        const width = x2 - x1;
        
        return (
          <rect
            key={index}
            x={x1}
            y={0}
            width={width}
            height="100%"
            fill="#f3f4f6"
            className="weekend-highlight"
          />
        );
      })}
    </>
  );
};

export default TimelineWeekends;