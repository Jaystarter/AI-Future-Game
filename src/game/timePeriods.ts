import { TimePeriodDefinition, TimePeriodKey } from './gameFrameworkTypes';
import { homeLocation, officeLocation } from './locations'; 

export const timePeriodDefinitions: TimePeriodDefinition[] = [
  {
    id: '2025',
    year: 'Year 2025',
    title: 'Dawn of Applied AI',
    description: 'AI is becoming more integrated into daily life, with smart assistants and early-stage autonomous systems. Ethical debates are prominent.',
    availableLocations: [homeLocation, officeLocation], 
  },
  {
    id: '2030',
    year: 'Year 2030',
    title: 'The AI Boom',
    description: 'Advanced AI drives significant economic and social change. Autonomous vehicles are common, and AI companions are emerging.',
    availableLocations: [homeLocation, officeLocation], 
  },
  {
    id: '2040',
    year: 'Year 2040',
    title: 'Age of Augmentation',
    description: 'Human augmentation with AI is widespread. Neural interfaces are becoming mainstream, blurring the lines between human and machine intelligence.',
    availableLocations: [homeLocation, officeLocation], 
  },
  {
    id: '2055-2100',
    year: 'Years 2055-2100',
    title: 'Towards Singularity?',
    description: 'Artificial General Intelligence (AGI) or superintelligence is on the horizon or has arrived, leading to profound and unpredictable societal shifts.',
    availableLocations: [homeLocation, officeLocation], 
  },
];

export const initialTimePeriodKey: TimePeriodKey = '2025';
