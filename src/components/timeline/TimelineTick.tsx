import React from 'react';

interface TimelineTickProps {
  x: number;
  date: string;
  time: string;
}

const TimelineTick: React.FC<TimelineTickProps> = ({ x, date, time }) => {
  return (
    <g transform={`translate(${x}, 0)`}>
      <line
        y1={-5}
        y2={5}
        stroke="#666"
        strokeWidth={1}
      />
      <text
        y={20}
        textAnchor="middle"
        className="text-xs fill-gray-700"
      >
        {date}
      </text>
      <text
        y={35}
        textAnchor="middle"
        className="text-xs fill-gray-700"
      >
        {time}
      </text>
    </g>
  );
};

export default TimelineTick;