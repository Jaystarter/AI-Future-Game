import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TimePeriodDefinition, TimePeriodKey, Location } from '../../game/gameFrameworkTypes';
import { timePeriodDefinitions } from '../../game/timePeriods';
import { TileMapView } from '../components/TileMapView';
import { DialogueBox } from '../components/DialogueBox';
import { createSimpleMap, TileMapData } from '../../game/TileMap';
import { usePlayerMovement, PlayerState } from '../../game/usePlayerMovement';
import { sampleNPCs, NPC, NPCData } from '../../game/NPC';
import { InteractableObject, GameActions } from '../../game/interactionTypes';
import { sampleExaminables, ExaminableObjectDetails } from '../../game/examinableObject';
import { sampleSmartDevices, SmartDeviceDetails } from '../../game/smartDevice';

interface GameScreenProps {
  timePeriodDefinition: TimePeriodDefinition;
  setTimePeriodKey: (key: TimePeriodKey) => void;
  currentLocation: Location;
  setCurrentLocationId: (id: string) => void;
  onQuit: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ 
  timePeriodDefinition, 
  setTimePeriodKey, 
  currentLocation, 
  setCurrentLocationId, 
  onQuit 
}) => {
  const currentPeriodKey = timePeriodDefinition.id;

  // Filter NPCs based on the current time period and location
  const currentPeriodNPCs = useMemo(() => {
    return sampleNPCs.filter(npc => 
      npc.data.period === currentPeriodKey &&
      (npc.data.locationId === currentLocation.id || !npc.data.locationId)
    );
  }, [currentPeriodKey, currentLocation, sampleNPCs]);

  // Filter examinable objects based on the current time period and location
  const currentPeriodExaminables = useMemo(() => {
    return sampleExaminables.filter(obj => 
      obj.data.period === currentPeriodKey &&
      (obj.data.locationId === currentLocation.id || !obj.data.locationId)
    );
  }, [currentPeriodKey, currentLocation, sampleExaminables]);

  // Filter smart devices based on the current time period and location
  const currentPeriodSmartDevices = useMemo(() => {
    return sampleSmartDevices.filter(device => 
      device.data.period === currentPeriodKey &&
      (device.data.locationId === currentLocation.id || !device.data.locationId)
    );
  }, [currentPeriodKey, currentLocation, sampleSmartDevices]);

  // Combine all interactables for the current period and location
  const allInteractables = useMemo(() => {
    return [...currentPeriodNPCs, ...currentPeriodExaminables, ...currentPeriodSmartDevices];
  }, [currentPeriodNPCs, currentPeriodExaminables, currentPeriodSmartDevices]);

  // Generate map for the current location and period
  const currentMap = useMemo(() => {
    return createSimpleMap(15, 10, currentLocation.id, currentPeriodKey);
  }, [currentLocation.id, currentPeriodKey]);

  // Helper: Get all interactable positions (NPCs, examinables, smart devices)
  const interactablePositions = useMemo(() => {
    return [
      ...currentPeriodNPCs.map(npc => npc.position),
      ...currentPeriodExaminables.map(obj => obj.position),
      ...currentPeriodSmartDevices.map(dev => dev.position)
    ];
  }, [currentPeriodNPCs, currentPeriodExaminables, currentPeriodSmartDevices]);

  // Helper: Get all non-walkable furniture tile positions from current map
  const nonWalkableFurnitureTypes = new Set([
    'wall', 'couch', 'desk', 'coffee_table', 'kitchenette', 'bookshelf', 'tv', 'bed', 'rug', 'dining_table', 'lamp', 'chair', 'plant', 'computer', // add any others as needed
  ]);
  const furnitureObstaclePositions = useMemo(() => {
    const positions: { x: number, y: number }[] = [];
    for (let y = 0; y < currentMap.height; y++) {
      for (let x = 0; x < currentMap.width; x++) {
        const tile = currentMap.tiles[y][x];
        if (nonWalkableFurnitureTypes.has(tile.type)) {
          positions.push({ x, y });
        }
      }
    }
    return positions;
  }, [currentMap]);

  // Combine all obstacles
  const allObstacles = useMemo(() => {
    // Avoid duplicate positions
    const key = (pos: {x: number, y: number}) => `${pos.x},${pos.y}`;
    const map = new Map<string, {x: number, y: number}>();
    [...interactablePositions, ...furnitureObstaclePositions].forEach(pos => {
      map.set(key(pos), pos);
    });
    return Array.from(map.values());
  }, [interactablePositions, furnitureObstaclePositions]);


  const { x, y, orientation, activityState, setActivityState } = usePlayerMovement(currentMap, allObstacles);
  const playerState: PlayerState = { x, y, orientation, activityState };

  const [talkingTo, setTalkingTo] = useState<NPC | null>(null);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const [textPanelContent, setTextPanelContent] = useState<{ title: string, content: string } | null>(null);

  const [activeDevice, setActiveDevice] = useState<{ id: string, name: string, initialMessage?: string } | null>(null);

  const gameActions: GameActions = {
    startDialogue: (npcToTalkTo: NPC) => {
      if (activityState !== 'interacting') {
        setActivityState('interacting');
        setTalkingTo(npcToTalkTo);
        setDialogueIndex(0);
        setTextPanelContent(null);
        setActiveDevice(null);
      }
    },
    displayTextPanel: (title: string, content: string) => {
      if (activityState !== 'interacting' || (!talkingTo && !activeDevice)) {
        setActivityState('interacting');
        setTextPanelContent({ title, content });
        setTalkingTo(null);
        setActiveDevice(null);
      }
    },
    openDeviceInterface: (deviceId: string, deviceName: string) => {
      const deviceObject = sampleSmartDevices.find(d => d.id === deviceId);
      const deviceData = deviceObject?.data as SmartDeviceDetails | undefined;
      if (activityState !== 'interacting' || (!talkingTo && !textPanelContent)) { 
        setActivityState('interacting');
        setActiveDevice({ id: deviceId, name: deviceName, initialMessage: deviceData?.initialMessage });
        setTalkingTo(null);
        setTextPanelContent(null);
      }
    },
  };

  const currentTargetedInteractable: InteractableObject | undefined = allInteractables.find(
    (obj) => obj.isInteractable(playerState, /* gameContext can be passed here */)
  );

  const interactionPrompt = currentTargetedInteractable?.getInteractionPrompt(playerState) || null;

  useEffect(() => {
    const handleInteractionKey = (e: KeyboardEvent) => {
      if (e.key === 'e' && currentTargetedInteractable && !talkingTo && !textPanelContent && !activeDevice) {
        currentTargetedInteractable.onInteract(playerState, gameActions);
      }
    };
    window.addEventListener('keydown', handleInteractionKey);
    return () => window.removeEventListener('keydown', handleInteractionKey);
  }, [currentTargetedInteractable, talkingTo, textPanelContent, activeDevice, playerState, gameActions, setActivityState]);

  const handleNextDialogue = useCallback(() => {
    if (talkingTo && dialogueIndex < talkingTo.data.dialogue.length - 1) {
      setDialogueIndex(prev => prev + 1);
    } else {
      setTalkingTo(null);
      setActivityState('idle');
    }
  }, [talkingTo, dialogueIndex, setActivityState]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (talkingTo) {
          setTalkingTo(null);
          setActivityState('idle');
        }
        if (textPanelContent) {
          setTextPanelContent(null);
          setActivityState('idle');
        }
        if (activeDevice) {
          setActiveDevice(null);
          setActivityState('idle');
        }
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [talkingTo, textPanelContent, activeDevice, setActivityState]);

  console.log("-----------------------------------------");
  console.log("GameScreen Update Cycle");
  console.log("Current Time Period:", timePeriodDefinition.year);
  console.log("NPCs for this period:", currentPeriodNPCs.map(n => ({ id: n.id, name: n.data.name, period: n.data.period, pos: n.position })) );
  console.log("Examinables for this period:", currentPeriodExaminables.map(e => ({ id: e.id, name: (e.data as ExaminableObjectDetails).name, period: (e.data as ExaminableObjectDetails).period, pos: e.position })) );
  console.log("Smart Devices for this period:", currentPeriodSmartDevices.map(s => ({ id: s.id, name: (s.data as SmartDeviceDetails).name, period: (s.data as SmartDeviceDetails).period, pos: s.position })) );
  console.log("Player State:", playerState);
  console.log("Current Targeted Interactable:", currentTargetedInteractable ? { id: currentTargetedInteractable.id, type: currentTargetedInteractable.type, name: (currentTargetedInteractable.data as any).name } : "None");
  console.log("Interaction Prompt:", interactionPrompt);
  console.log("UI States: talkingTo:", talkingTo ? talkingTo.data.name : null, "textPanel:", textPanelContent, "deviceUI:", activeDevice);
  console.log("Activity State:", activityState);
  console.log("-----------------------------------------");

  const [isPanelCollapsed, setIsPanelCollapsed] = useState(true);

  // Determine if the interaction prompt should be visible
  const showInteractionPrompt = interactionPrompt && !talkingTo && !textPanelContent && !activeDevice;

  return (
    <div className="game-screen">
      <div className="header-controls">
        <button onClick={onQuit} style={{ marginRight: '10px' }}>Quit to Menu</button>
        <button onClick={() => setIsPanelCollapsed(!isPanelCollapsed)} style={{ marginRight: '20px' }}>
          {isPanelCollapsed ? 'Show Info Panel' : 'Hide Info Panel'}
        </button>
        {isPanelCollapsed && (
          <div className="collapsed-info-display" style={{ color: 'white', fontSize: '0.9em', fontWeight: 'bold' }}>
            <span>Period: {timePeriodDefinition.title}</span>
            <span style={{ marginLeft: '15px' }}>Location: {currentLocation.name}</span>
          </div>
        )}
      </div>

      {/* Panel content is now always rendered, but its class changes */}
      <div className={`info-panel-content ${isPanelCollapsed ? 'collapsed' : ''}`}>
        <h2>{timePeriodDefinition.title} ({timePeriodDefinition.year})</h2>
        <h3>Current Location: {currentLocation.name}</h3>
        <p style={{textAlign: 'center', margin: '0 0 10px 0'}}>{timePeriodDefinition.description}</p>
        
        <div className="controls-panel">
          <div className="period-buttons">
            <strong>Time Periods:</strong>
            {timePeriodDefinitions.map((def) => (
              <button
                key={def.id}
                onClick={() => setTimePeriodKey(def.id)}
                disabled={currentPeriodKey === def.id}
              >
                {def.title} ({def.year})
              </button>
            ))}
          </div>
          
          <div className="location-buttons">
            <strong>Locations:</strong>
            {timePeriodDefinition.availableLocations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setCurrentLocationId(loc.id)}
                disabled={currentLocation.id === loc.id}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="game-area">
        <TileMapView 
          map={currentMap} 
          playerState={playerState} 
          npcs={currentPeriodNPCs} 
          examinables={currentPeriodExaminables} 
          smartDevices={currentPeriodSmartDevices} 
          debugMode={true} 
        />
        <div className={`hint-overlay ${showInteractionPrompt ? 'active' : ''}`}>
          {showInteractionPrompt ? interactionPrompt : <>&nbsp;</>}
        </div>
        {talkingTo && (
          <DialogueBox
            characterName={talkingTo.data.name}
            lines={talkingTo.data.dialogue}
            index={dialogueIndex}
            onNext={handleNextDialogue}
            onClose={() => {
              setTalkingTo(null);
              setActivityState('idle');
            }}
          />
        )}
        {textPanelContent && !talkingTo && !activeDevice && (
          <div className="text-panel-overlay">
            <div className="text-panel">
              <h3>{textPanelContent.title}</h3>
              <p style={{ whiteSpace: 'pre-wrap' }}>{textPanelContent.content.replace(/\\n/g, '\n')}</p>
              <button onClick={() => {
                setTextPanelContent(null);
                setActivityState('idle');
              }}>Close</button>
            </div>
          </div>
        )}
        {activeDevice && !talkingTo && !textPanelContent && (
          <div className="device-ui-overlay">
            <div className="device-ui-panel">
              <h3>{activeDevice.name}</h3>
              {activeDevice.initialMessage && <p>{activeDevice.initialMessage}</p>}
              <p><i>Device interaction UI placeholder. Status: {(sampleSmartDevices.find(d=>d.id === activeDevice.id)?.data as SmartDeviceDetails).status || 'Unknown'}</i></p>
              <button onClick={() => {
                setActiveDevice(null);
                setActivityState('idle');
              }}>Disconnect</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
