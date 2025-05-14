import React from 'react';
import { TimePeriodKey } from '../../game/gameFrameworkTypes';
import { timePeriodDefinitions } from '../../game/timePeriods'; 

interface MainMenuScreenProps {
  onStartGame: (startPeriodKey: TimePeriodKey) => void; 
}

export const MainMenuScreen: React.FC<MainMenuScreenProps> = ({ onStartGame }) => {
  return (
    <div className="main-menu-screen">
      <h1>AI Future Timeline</h1>
      <p>Select a time period to begin your journey:</p>
      <div className="time-period-selection">
        {timePeriodDefinitions.map((periodDef) => (
          <button 
            key={periodDef.id} 
            onClick={() => onStartGame(periodDef.id)}
            title={periodDef.description} 
          >
            {periodDef.title} ({periodDef.year})
          </button>
        ))}
      </div>
      {/* Add more options, settings, credits, etc. here later */}
    </div>
  );
};
