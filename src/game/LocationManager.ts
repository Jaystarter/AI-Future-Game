import { TimePeriodDefinition, Location } from './gameFrameworkTypes';
import { timePeriodDefinitions } from './timePeriods'; // To access all period definitions
import { standardLocations } from './locations'; // To access all defined locations

export class LocationManager {
  private _currentLocationId: string | null;
  private _allTimePeriodDefinitions: TimePeriodDefinition[];
  private _allDefinedLocations: Location[];

  constructor(initialLocationId: string | null, allTimeDefs: TimePeriodDefinition[], allLocations: Location[]) {
    this._currentLocationId = initialLocationId;
    this._allTimePeriodDefinitions = allTimeDefs;
    this._allDefinedLocations = allLocations;

    // Ensure initial location is valid if provided
    if (initialLocationId) {
      const initialPeriodDef = this._allTimePeriodDefinitions.find(p => 
        p.availableLocations.some(loc => loc.id === initialLocationId)
      );
      if (!initialPeriodDef) {
        console.warn(`Initial location ID "${initialLocationId}" not found in any time period's available locations. Manager defaulting to null.`);
        this._currentLocationId = null;
      } else {
        const currentPeriodDefForInitial = this._allTimePeriodDefinitions.find(p => p.id === initialPeriodDef.id);
        if (!this.isLocationValidForPeriod(initialLocationId, currentPeriodDefForInitial)) {
          console.warn(`Initial location ID "${initialLocationId}" is not valid for its apparent initial period. Manager defaulting to null or first valid.`);
          // Fallback logic might be needed here if strict initial validation is required.
          // For now, if it's in *any* period's available list, we assume it's okay at construction,
          // active period validation happens during transition/retrieval.
        }
      }
    }
  }

  public getCurrentLocationId(): string | null {
    return this._currentLocationId;
  }

  private isLocationValidForPeriod(locationId: string, periodDefinition?: TimePeriodDefinition): boolean {
    if (!periodDefinition) return false;
    return periodDefinition.availableLocations.some(loc => loc.id === locationId);
  }

  public getCurrentLocationObject(currentPeriodDefinition: TimePeriodDefinition): Location | null {
    if (!this._currentLocationId || !this.isLocationValidForPeriod(this._currentLocationId, currentPeriodDefinition)) {
      return null;
    }
    return this._allDefinedLocations.find(loc => loc.id === this._currentLocationId) || null;
  }

  public transitionTo(newLocationId: string, currentPeriodDefinition: TimePeriodDefinition): boolean {
    if (!this.isLocationValidForPeriod(newLocationId, currentPeriodDefinition)) {
      console.warn(`Transition failed: Location "${newLocationId}" is not available in period "${currentPeriodDefinition.id}".`);
      return false;
    }
    this._currentLocationId = newLocationId;
    console.log(`LocationManager: Transitioned to ${newLocationId}`);
    return true;
  }

  /**
   * When the time period changes, this method ensures the current location is still valid.
   * If not, it attempts to set a default valid location for the new period.
   * @param newPeriodDefinition The definition of the new time period.
   * @returns True if the location was changed, false otherwise.
   */
  public validateLocationForNewPeriod(newPeriodDefinition: TimePeriodDefinition): boolean {
    if (this._currentLocationId && this.isLocationValidForPeriod(this._currentLocationId, newPeriodDefinition)) {
      return false; // Current location is still valid, no change needed
    }

    // Current location is invalid or not set, find the first available location for the new period
    const firstValidLocationForNewPeriod = newPeriodDefinition.availableLocations[0]?.id;
    if (firstValidLocationForNewPeriod) {
      this._currentLocationId = firstValidLocationForNewPeriod;
      console.log(`LocationManager: Location set to "${firstValidLocationForNewPeriod}" for new period "${newPeriodDefinition.id}".`);
      return true;
    } else {
      console.warn(`LocationManager: No available locations found for period "${newPeriodDefinition.id}". Location set to null.`);
      this._currentLocationId = null;
      return true; // Location was changed (to null)
    }
  }
}
