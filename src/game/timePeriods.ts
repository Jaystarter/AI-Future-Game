import { TimePeriodDefinition, TimePeriodKey } from './gameFrameworkTypes';
import { homeLocation, officeLocation } from './locations'; 

export const timePeriodDefinitions: TimePeriodDefinition[] = [
  {
    id: '2030',
    year: 'Year 2030',
    title: 'Dawn of Applied AI',
    description: 'AI begins to be applied at scale across society, with the first wave of transformative automation and decision systems.',
    availableLocations: [homeLocation, officeLocation],
  },
  {
    id: '2040',
    year: 'Year 2040',
    title: 'The AI Boom',
    description: 'AI innovation accelerates, touching every industry. Autonomous systems and agents reshape work, life, and governance.',
    availableLocations: [homeLocation, officeLocation],
  },
  {
    id: '2050',
    year: 'Year 2050',
    title: 'Age of Augmentation',
    description: 'AI-driven augmentation is ubiquitous. Neural, physical, and cognitive enhancements are mainstream, blurring human-machine boundaries.',
    availableLocations: [homeLocation, officeLocation],
  },
  {
    id: '2070',
    year: 'Year 2070',
    title: 'Towards Singularity',
    description: 'The threshold of superintelligence approaches. Society grapples with profound change and the unknowns of the Singularity.',
    availableLocations: [homeLocation, officeLocation],
  },
];

export const initialTimePeriodKey: TimePeriodKey = '2030';
