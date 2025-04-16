import React, { useState, useEffect, useCallback } from 'react';
import { TimePeriod } from '../GameApp';
import { TileMapView } from '../components/TileMapView';
import { DialogueBox } from '../components/DialogueBox';
import { createSimpleMap } from '../../game/TileMap';
import { usePlayerMovement } from '../../game/usePlayerMovement';
import { sampleNPCs, NPC } from '../../game/NPC';

const periodLabels: Record<TimePeriod, string> = {
  'present': 'Present (2025)',
  'near-future': 'Near Future (2030-2035)',
  'mid-future': 'Mid Future (2040)',
  'far-future': 'Far Future (2055-2100)',
};

export const GameScreen: React.FC<{
  timePeriod: TimePeriod;
  setTimePeriod: (p: TimePeriod) => void;
}> = ({ timePeriod, setTimePeriod }) => {
  const map = createSimpleMap();
  const playerPos = usePlayerMovement(map);
  const npcs: NPC[] = sampleNPCs.filter(npc => npc.period === timePeriod);

  // Dialogue state
  const [talkingTo, setTalkingTo] = useState<NPC | null>(null);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  // Check if player is adjacent to any NPC
  const adjacentNpc = npcs.find(npc =>
    Math.abs(npc.x - playerPos.x) + Math.abs(npc.y - playerPos.y) === 1
  );

  // Listen for 'E' key to start talking
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() === 'e' && !talkingTo && adjacentNpc) {
        setTalkingTo(adjacentNpc);
        setDialogueIndex(0);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [talkingTo, adjacentNpc]);

  const handleNext = useCallback(() => {
    if (talkingTo && dialogueIndex < talkingTo.dialogue.length - 1) {
      setDialogueIndex(i => i + 1);
    }
  }, [talkingTo, dialogueIndex]);

  const handleClose = useCallback(() => {
    setTalkingTo(null);
    setDialogueIndex(0);
  }, []);

  return (
    <div className="game-screen">
      <h2>Time Period: {periodLabels[timePeriod]}</h2>
      <div className="period-buttons">
        {Object.keys(periodLabels).map((key) => (
          <button
            key={key}
            onClick={() => setTimePeriod(key as TimePeriod)}
            disabled={timePeriod === key}
          >
            {periodLabels[key as TimePeriod]}
          </button>
        ))}
      </div>
      <div className="game-area">
        <TileMapView map={map} playerPos={playerPos} npcs={npcs} />
        {adjacentNpc && !talkingTo && (
          <div className="hint-overlay">Press <b>E</b> to talk</div>
        )}
        {talkingTo && (
          <DialogueBox
            name={talkingTo.name}
            lines={talkingTo.dialogue}
            index={dialogueIndex}
            onNext={handleNext}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
};
