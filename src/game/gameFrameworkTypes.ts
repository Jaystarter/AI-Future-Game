export interface Location {
  id: string; // e.g., 'home', 'workplace'
  name: string; // e.g., "Player's Apartment", "AI Corp Office"
}

export type TimePeriodKey = '2025' | '2030' | '2040' | '2055-2100';

export interface TimePeriodDefinition {
  id: TimePeriodKey; // The unique key, e.g., '2025'
  year: string; // Display year or range, e.g., "Year 2025", "Years 2055-2100"
  title: string; // Descriptive title, e.g., "Dawn of Applied AI"
  description: string; // A brief summary of the era
  availableLocations: Location[]; // Locations accessible in this period
}
