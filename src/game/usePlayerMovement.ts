import { useState, useCallback, useEffect, useRef } from 'react';
import { TileMapData, Tile } from './TileMap';

export interface PlayerPosition {
  x: number;
  y: number;
}

export type PlayerOrientation = 'up' | 'down' | 'left' | 'right';
export type PlayerActivityState = 'idle' | 'walking' | 'interacting';

export interface PlayerState extends PlayerPosition {
  orientation: PlayerOrientation;
  activityState: PlayerActivityState;
}

function findPlayerStart(map: TileMapData): PlayerPosition {
  for (const row of map.tiles) {
    for (const tile of row) {
      if (tile.type === 'player') {
        return { x: tile.x, y: tile.y };
      }
    }
  }
  return { x: 1, y: 1 };
}

export function usePlayerMovement(tileMap: TileMapData, dynamicObstacles: PlayerPosition[] = []) {
  const [playerState, setPlayerState] = useState<PlayerState>(() => {
    const startPos = findPlayerStart(tileMap);
    return { ...startPos, orientation: 'down', activityState: 'idle' }; // Default state
  });

  const idleTimerRef = useRef<number | null>(null);

  const canMove = useCallback((x: number, y: number) => {
    // Check map boundaries
    if (y < 0 || y >= tileMap.height || x < 0 || x >= tileMap.width) return false;
    
    // Check map tile type (e.g., walls)
    const tile = tileMap.tiles[y][x];
    if (tile.type === 'wall') return false;

    // Check dynamic obstacles (e.g., NPCs)
    for (const obstacle of dynamicObstacles) {
      if (obstacle.x === x && obstacle.y === y) {
        return false; // Cannot move into a space occupied by a dynamic obstacle
      }
    }
    
    return true; // If no boundary, wall, or dynamic obstacle, can move
  }, [tileMap, dynamicObstacles]); // Add dynamicObstacles to dependency array

  const move = useCallback((dx: number, dy: number) => {
    // Clear any existing idle timer
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }

    let newOrientation: PlayerOrientation = playerState.orientation;
    if (dx === 1) newOrientation = 'right';
    else if (dx === -1) newOrientation = 'left';
    else if (dy === 1) newOrientation = 'down';
    else if (dy === -1) newOrientation = 'up';

    setPlayerState((prev) => {
      // Prevent movement if interacting (assuming 'interacting' is set externally or via another mechanism)
      if (prev.activityState === 'interacting') return prev;

      const nx = prev.x + dx;
      const ny = prev.y + dy;

      if (canMove(nx, ny)) {
        // Set a timer to return to 'idle' state after a short period of no movement
        idleTimerRef.current = setTimeout(() => {
          setPlayerState(s => ({ ...s, activityState: 'idle' }));
        }, 150); // Adjust timeout as needed (e.g., 150ms)
        return { x: nx, y: ny, orientation: newOrientation, activityState: 'walking' };
      }
      // If cannot move, still update orientation and remain/become idle or keep walking if already
      // Reset idle timer here too if a key was pressed but couldn't move
      idleTimerRef.current = setTimeout(() => {
        setPlayerState(s => ({ ...s, activityState: 'idle' }));
      }, 150);
      return { ...prev, orientation: newOrientation, activityState: prev.activityState === 'walking' ? 'walking' : 'idle' }; 
    });
  }, [canMove, playerState.orientation, playerState.activityState]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.repeat) return;
      // Potentially block movement input if playerState.activityState === 'interacting'
      // However, the check inside move() already does this for the state update.
      switch (e.key) {
        case 'ArrowUp': case 'w': move(0, -1); break;
        case 'ArrowDown': case 's': move(0, 1); break;
        case 'ArrowLeft': case 'a': move(-1, 0); break;
        case 'ArrowRight': case 'd': move(1, 0); break;
        default: break;
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [move]);

  // Function to allow external systems to set activity state (e.g., to 'interacting')
  const setActivityState = useCallback((newState: PlayerActivityState) => {
    setPlayerState(s => ({ ...s, activityState: newState }));
    // If setting to interacting, clear idle timer
    if (newState === 'interacting' && idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  return { ...playerState, setActivityState }; // Expose setActivityState
}
