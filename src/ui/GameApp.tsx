import React, { useState } from 'react';
import { GameScreen } from './screens/GameScreen';
import { TitleScreen } from './screens/TitleScreen';

export type TimePeriod = 'present' | 'near-future' | 'mid-future' | 'far-future';

export const GameApp: React.FC = () => {
  const [screen, setScreen] = useState<'title' | 'game'>('title');
  const [period, setPeriod] = useState<TimePeriod>('present');

  return (
    <>
      {screen === 'title' ? (
        <TitleScreen onStart={() => setScreen('game')} />
      ) : (
        <GameScreen timePeriod={period} setTimePeriod={setPeriod} />
      )}
    </>
  );
};
