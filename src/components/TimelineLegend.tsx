import React from 'react';
import { ColorScheme } from '../types/ColorScheme';
import { ColorMode } from '../types/ColorMode';

interface TimelineLegendProps {
  width: number;
  colorScheme: ColorScheme;
  colorMode: ColorMode;
}

const TimelineLegend: React.FC<TimelineLegendProps> = ({ width, colorScheme, colorMode }) => {
  const legendWidth = 200;
  const legendHeight = 20;
  const gradientId = 'vuserGradient';
  
  if (colorMode === 'sentiment') {
    return (
      <g transform={`translate(${width - legendWidth - 20}, 20)`}>
        <text
          x={legendWidth / 2}
          y={-5}
          textAnchor="middle"
          className="text-sm fill-gray-700"
        >
          Test Outcome
        </text>
        <g transform="translate(0, 0)">
          <rect
            width={20}
            height={20}
            fill="#5BBA36"
          />
          <text x={25} y={15} className="text-sm fill-gray-700">Positive</text>
        </g>
        <g transform="translate(100, 0)">
          <rect
            width={20}
            height={20}
            fill="#FF4444"
          />
          <text x={25} y={15} className="text-sm fill-gray-700">Negative</text>
        </g>
      </g>
    );
  }
  
  // VUsers mode legend
  return (
    <g transform={`translate(${width - legendWidth - 20}, 20)`}>
      <defs>
        <linearGradient id={gradientId}>
          {colorScheme.stops.map((stop) => (
            <stop
              key={stop.position}
              offset={`${stop.position * 100}%`}
              stopColor={stop.color}
            />
          ))}
        </linearGradient>
      </defs>
      
      <rect
        width={legendWidth}
        height={legendHeight}
        fill="none"
        stroke="#C0C0C0"
        strokeWidth={1}
      />
      
      <rect
        x={0.5}
        y={0.5}
        width={legendWidth - 1}
        height={legendHeight - 1}
        fill={`url(#${gradientId})`}
      />
      
      {[0, 1000, 2000, 3000, 4000].map((value, index) => (
        <text
          key={value}
          x={index * (legendWidth / 4)}
          y={legendHeight + 15}
          textAnchor="middle"
          className="text-sm fill-gray-700"
        >
          {value}
        </text>
      ))}
      
      <text
        x={legendWidth / 2}
        y={-5}
        textAnchor="middle"
        className="text-sm fill-gray-700"
      >
        vusers
      </text>
    </g>
  );
};

export default TimelineLegend;