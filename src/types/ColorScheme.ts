import { ColorStop } from './types';

export interface ColorScheme {
  name: string;
  stops: ColorStop[];
  isReversed?: boolean;
}

export const defaultColorSchemes: Record<string, ColorScheme> = {
  viridis: {
    name: 'Viridis',
    stops: [
      { position: 0, color: '#FDE725' },
      { position: 0.25, color: '#5DC963' },
      { position: 0.5, color: '#21908C' },
      { position: 0.75, color: '#3B528B' },
      { position: 1, color: '#440154' }
    ]
  },
  magma: {
    name: 'Magma',
    stops: [
      { position: 0, color: '#000004' },
      { position: 0.25, color: '#51127C' },
      { position: 0.5, color: '#B63679' },
      { position: 0.75, color: '#FB8861' },
      { position: 1, color: '#FCFDBF' }
    ]
  },
  plasma: {
    name: 'Plasma',
    stops: [
      { position: 0, color: '#0D0887' },
      { position: 0.25, color: '#7E03A8' },
      { position: 0.5, color: '#CC4778' },
      { position: 0.75, color: '#F89540' },
      { position: 1, color: '#F0F921' }
    ]
  }
};