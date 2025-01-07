import React from 'react';
import TimelineTick from './TimelineTick';

interface TimelineAxisProps {
  width: number;
  minDate: number;
  maxDate: number;
  labelWidth: number;
}

const TimelineAxis: React.FC<TimelineAxisProps> = ({
  width,
  minDate,
  maxDate,
  labelWidth
}) => {
  const timeWidth = width - labelWidth - 100;
  const numTicks = 5;
  const ticks = Array.from({ length: numTicks }, (_, i) => {
    const timestamp = minDate + (maxDate - minDate) * (i / (numTicks - 1));
    const date = new Date(timestamp);
    return {
      x: labelWidth + (i * timeWidth) / (numTicks - 1),
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString()
    };
  });

  return (
    <g transform="translate(0, 60)">
      <line
        x1={labelWidth}
        y1={0}
        x2={width - 100}
        y2={0}
        stroke="#666"
        strokeWidth={1}
      />
      {ticks.map((tick, i) => (
        <TimelineTick key={i} {...tick} />
      ))}
    </g>
  );
};

export default TimelineAxis;