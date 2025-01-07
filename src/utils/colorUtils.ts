import { TestRun } from '../types/TestRun';
import { ColorScheme } from '../types/ColorScheme';
import { getSentiment } from './labelUtils';
import { ColorMode } from '../types/ColorMode';

const MAX_VUSERS = 4000;

export const getTotalVUsers = (run: TestRun): number => {
  return (
    run.dev_vusers_num +
    run.api_vusers_num +
    run.ui_vusers_num +
    run.erp_vusers_num +
    run.legacy_vusers_num +
    run.mobile_vusers_num
  );
};

export const getColorForVUsers = (vusers: number, colorScheme: ColorScheme): string => {
  const normalizedValue = Math.min(vusers / MAX_VUSERS, 1);
  
  // Find the two stops that bracket our normalized value
  let lowerStop = colorScheme.stops[0];
  let upperStop = colorScheme.stops[colorScheme.stops.length - 1];
  
  for (let i = 0; i < colorScheme.stops.length - 1; i++) {
    if (normalizedValue >= colorScheme.stops[i].position && 
        normalizedValue <= colorScheme.stops[i + 1].position) {
      lowerStop = colorScheme.stops[i];
      upperStop = colorScheme.stops[i + 1];
      break;
    }
  }

  // Calculate how far between the two stops our value lies
  const range = upperStop.position - lowerStop.position;
  const fraction = range === 0 ? 0 : (normalizedValue - lowerStop.position) / range;

  // Convert hex colors to RGB
  const lowerRGB = hexToRgb(lowerStop.color);
  const upperRGB = hexToRgb(upperStop.color);

  // Interpolate between the colors
  const r = Math.round(lowerRGB.r + (upperRGB.r - lowerRGB.r) * fraction);
  const g = Math.round(lowerRGB.g + (upperRGB.g - lowerRGB.g) * fraction);
  const b = Math.round(lowerRGB.b + (upperRGB.b - lowerRGB.b) * fraction);

  return `rgb(${r},${g},${b})`;
};

export const getColor = (run: TestRun, colorMode: ColorMode, colorScheme: ColorScheme): string => {
  if (colorMode === 'sentiment') {
    return getSentiment(run).color;
  }
  return getColorForVUsers(getTotalVUsers(run), colorScheme);
};

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}