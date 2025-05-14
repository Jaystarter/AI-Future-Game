import { Location } from './gameFrameworkTypes';

export const homeLocation: Location = {
  id: 'home',
  name: "Player's Apartment",
};

export const officeLocation: Location = {
  id: 'office',
  name: 'AI Corp Office',
};

// Add more locations here as needed, e.g.:
// export const parkLocation: Location = {
//   id: 'park',
//   name: 'City Park',
// };

export const standardLocations: Location[] = [homeLocation, officeLocation];
