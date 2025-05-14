import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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
import { playSound, preloadSounds } from '../../utils/soundManager'; // Corrected import path

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

  // Camera Shake State
  const [cameraShakeOffset, setCameraShakeOffset] = useState({ x: 0, y: 0 });
  const cameraShakeTimerRef = useRef<number | null>(null);

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

  // --- CAMERA SHAKE LOGIC ---
  const handleMoveBlocked = useCallback(() => {
    if (cameraShakeTimerRef.current) {
      clearTimeout(cameraShakeTimerRef.current);
    }
    playSound('collision_bump.mp3', 0.5); // Play collision sound
    const shakeX = (Math.random() - 0.5) * 8; // Shake between -4px and 4px
    const shakeY = (Math.random() - 0.5) * 8; // Shake between -4px and 4px
    setCameraShakeOffset({ x: shakeX, y: shakeY });

    cameraShakeTimerRef.current = window.setTimeout(() => {
      setCameraShakeOffset({ x: 0, y: 0 });
      cameraShakeTimerRef.current = null;
    }, 120); // Shake duration: 120ms
  }, []);
  // --- END CAMERA SHAKE LOGIC ---

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

  const { x: playerX, y: playerY, orientation, activityState, setActivityState: setPlayerActivityState } = usePlayerMovement(
    currentMap,
    allObstacles,
    handleMoveBlocked // Pass the new callback
  );
  const playerState: PlayerState = { x: playerX, y: playerY, orientation, activityState };

  const [talkingTo, setTalkingTo] = useState<NPC | null>(null);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const [textPanelContent, setTextPanelContent] = useState<{ title: string, content: string } | null>(null);

  const [activeDevice, setActiveDevice] = useState<{ id: string, name: string, initialMessage?: string } | null>(null);

  const gameActions: GameActions = {
    startDialogue: (npcToTalkTo: NPC) => {
      if (activityState !== 'interacting') {
        setPlayerActivityState('interacting');
        setTalkingTo(npcToTalkTo);
        setDialogueIndex(0);
        setTextPanelContent(null);
        setActiveDevice(null);
        playSound('dialogue_start.mp3'); // Play dialogue start sound
      }
    },
    displayTextPanel: (title: string, content: string) => {
      if (activityState !== 'interacting' || (!talkingTo && !activeDevice)) {
        setPlayerActivityState('interacting');
        setTextPanelContent({ title, content });
        setTalkingTo(null);
        setActiveDevice(null);
      }
    },
    openDeviceInterface: (deviceId: string, deviceName: string) => {
      const deviceObject = sampleSmartDevices.find(d => d.id === deviceId);
      const deviceData = deviceObject?.data as SmartDeviceDetails | undefined;
      if (activityState !== 'interacting' || (!talkingTo && !textPanelContent)) { 
        setPlayerActivityState('interacting');
        setActiveDevice({ id: deviceId, name: deviceName, initialMessage: deviceData?.initialMessage });
        setTalkingTo(null);
        setTextPanelContent(null);
        playSound('device_activate.mp3'); // Play device activate sound
      }
    },
  };

  // Ref to keep track of the previous target to avoid sound spam
  const currentTargetedInteractableRef = useRef<InteractableObject | null>(null);

  const currentTargetedInteractable = useMemo(() => {
    const target = allInteractables.find(
      (obj) => obj.isInteractable(playerState, /* gameContext can be passed here */)
    );
    if (target && target.id !== (currentTargetedInteractableRef.current?.id || null)) {
      playSound('interaction_focus.mp3', 0.4); // Play interaction focus sound
    }
    currentTargetedInteractableRef.current = target || null; // Assign target or null
    return target;
  }, [playerState, allInteractables]);

  const interactionPrompt = currentTargetedInteractable?.getInteractionPrompt(playerState) || null;

  useEffect(() => {
    const handleInteractionKey = (e: KeyboardEvent) => {
      if (e.key === 'e' && currentTargetedInteractable && !talkingTo && !textPanelContent && !activeDevice) {
        currentTargetedInteractable.onInteract(playerState, gameActions);
      }
    };
    window.addEventListener('keydown', handleInteractionKey);
    return () => window.removeEventListener('keydown', handleInteractionKey);
  }, [currentTargetedInteractable, talkingTo, textPanelContent, activeDevice, playerState, gameActions, setPlayerActivityState]);

  const handleNextDialogue = useCallback(() => {
    if (talkingTo && dialogueIndex < talkingTo.data.dialogue.length - 1) {
      setDialogueIndex(prev => prev + 1);
    } else {
      setTalkingTo(null);
      setPlayerActivityState('idle');
    }
  }, [talkingTo, dialogueIndex, setPlayerActivityState]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (talkingTo) {
          setTalkingTo(null);
          setPlayerActivityState('idle');
        }
        if (textPanelContent) {
          setTextPanelContent(null);
          setPlayerActivityState('idle');
        }
        if (activeDevice) {
          setActiveDevice(null);
          setPlayerActivityState('idle');
          playSound('ui_click.mp3', 0.6); // Play UI click sound
        }
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [talkingTo, textPanelContent, activeDevice, setPlayerActivityState]);

  useEffect(() => {
    preloadSounds([
      'collision_bump.mp3',
      'interaction_focus.mp3',
      'dialogue_start.mp3',
      'device_activate.mp3',
      'ui_click.mp3'
    ]);
  }, []);

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

  const handleCloseInteraction = useCallback(() => {
    setActiveDevice(null);
    setPlayerActivityState('idle');
    playSound('ui_click.mp3', 0.6); // Play UI click sound
  }, [setActiveDevice, setPlayerActivityState]);

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
          cameraShakeOffset={cameraShakeOffset} // Pass shake offset
          interactionTargetPosition={currentTargetedInteractable?.position} // Pass target position
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
              setPlayerActivityState('idle');
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
                setPlayerActivityState('idle');
              }}>Close</button>
            </div>
          </div>
        )}
        {activeDevice && (
          <div className="text-panel-content device-interaction-panel">
            <h3>{activeDevice.name}</h3>
            <p><i>{activeDevice.initialMessage || "Interacting with device..."}</i></p>
            <p>Status: {(sampleSmartDevices.find(d=>d.id === activeDevice.id)?.data as SmartDeviceDetails)?.status || 'Unknown'}</p>
            <button onClick={handleCloseInteraction} className="close-button">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};
