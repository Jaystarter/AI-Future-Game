// eslint-disable-next-line no-unused-vars
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { GameScreen } from './screens/GameScreen';
import { MainMenuScreen } from './screens/MainMenuScreen';
import { LogViewer } from './components/LogViewer';
import { TimePeriodKey, TimePeriodDefinition, Location } from '../game/gameFrameworkTypes';
import { timePeriodDefinitions, initialTimePeriodKey } from '../game/timePeriods';
import { LocationManager } from '../game/LocationManager';
import { standardLocations } from '../game/locations';
import '../style.css';

export type GameState = 'menu' | 'playing';

export const GameApp: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [currentTimePeriodKey, setCurrentTimePeriodKey] = useState<TimePeriodKey>(initialTimePeriodKey);
  
  const locationManager = useMemo(() => {
    const initialPeriodDefForManager = timePeriodDefinitions.find(p => p.id === initialTimePeriodKey);
    const initialLocId = initialPeriodDefForManager?.availableLocations[0]?.id || null;
    return new LocationManager(initialLocId, timePeriodDefinitions, standardLocations);
  }, []);

  const [managedLocationId, setManagedLocationId] = useState<string | null>(locationManager.getCurrentLocationId());

  const [showLogs, setShowLogs] = useState(false);

  const currentPeriodDefinition = timePeriodDefinitions.find(p => p.id === currentTimePeriodKey);
  const currentLocation = useMemo(() => 
    currentPeriodDefinition ? locationManager.getCurrentLocationObject(currentPeriodDefinition) : null, 
    [locationManager, currentPeriodDefinition, managedLocationId]
  );

  const startGame = useCallback((startPeriodKey: TimePeriodKey = initialTimePeriodKey) => {
    const periodDef = timePeriodDefinitions.find(p => p.id === startPeriodKey);
    setCurrentTimePeriodKey(startPeriodKey);
    if (periodDef) {
      const initialLocIdForPeriod = periodDef.availableLocations[0]?.id || null;
      if (initialLocIdForPeriod) {
        locationManager.transitionTo(initialLocIdForPeriod, periodDef);
      } else {
        locationManager.validateLocationForNewPeriod(periodDef);
      }
      setManagedLocationId(locationManager.getCurrentLocationId());
    }
    setGameState('playing');
  }, [locationManager]);

  const quitToMenu = useCallback(() => {
    setGameState('menu');
  }, []);

  const handleSetTimePeriod = useCallback((newPeriodKey: TimePeriodKey) => {
    const newPeriodDef = timePeriodDefinitions.find(p => p.id === newPeriodKey);
    if (newPeriodDef) {
      setCurrentTimePeriodKey(newPeriodKey);
      locationManager.validateLocationForNewPeriod(newPeriodDef);
      setManagedLocationId(locationManager.getCurrentLocationId());
    }
  }, [locationManager]);

  const handleSetCurrentLocationId = useCallback((locationId: string) => {
    if (currentPeriodDefinition) {
      if (locationManager.transitionTo(locationId, currentPeriodDefinition)) {
        setManagedLocationId(locationManager.getCurrentLocationId());
      }
    }
  }, [locationManager, currentPeriodDefinition]);

  useEffect(() => {
    if (gameState === 'playing' && currentPeriodDefinition) {
      if(locationManager.validateLocationForNewPeriod(currentPeriodDefinition)) {
        setManagedLocationId(locationManager.getCurrentLocationId());
      }
    }
  }, [currentTimePeriodKey, gameState, currentPeriodDefinition, locationManager]);

  if (gameState === 'playing' && (!currentPeriodDefinition || !currentLocation)) {
    console.error(`Error: Invalid time period or location. PeriodKey: ${currentTimePeriodKey}, LocationId: ${managedLocationId}`);
    const fallbackPeriodDef = timePeriodDefinitions.find(p => p.id === initialTimePeriodKey) || timePeriodDefinitions[0];
    setCurrentTimePeriodKey(fallbackPeriodDef.id);
    locationManager.validateLocationForNewPeriod(fallbackPeriodDef);
    setManagedLocationId(locationManager.getCurrentLocationId());
    return <div>Error: Critical game state error. Resetting...</div>;
  }

  return (
    <div className="app-container">
      <button onClick={() => setShowLogs(s => !s)} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
        {showLogs ? 'Hide' : 'Show'} Logs
      </button>
      {showLogs && <LogViewer />}

      {gameState === 'menu' && (
        <MainMenuScreen onStartGame={startGame} />
      )}
      {gameState === 'playing' && currentPeriodDefinition && currentLocation && (
        <GameScreen
          timePeriodDefinition={currentPeriodDefinition}
          setTimePeriodKey={handleSetTimePeriod}
          currentLocation={currentLocation}
          setCurrentLocationId={handleSetCurrentLocationId}
          onQuit={quitToMenu}
        />
      )}
    </div>
  );
};
