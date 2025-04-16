import { useState, useCallback, useEffect } from 'react';
import { TileMapData, Tile } from './TileMap';

export interface PlayerPosition {
  x: number;
  y: number;
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

export function usePlayerMovement(tileMap: TileMapData) {
  const [pos, setPos] = useState<PlayerPosition>(() => findPlayerStart(tileMap));

  const canMove = useCallback((x: number, y: number) => {
    if (y < 0 || y >= tileMap.height || x < 0 || x >= tileMap.width) return false;
    const tile = tileMap.tiles[y][x];
    return tile.type !== 'wall';
  }, [tileMap]);

  const move = useCallback((dx: number, dy: number) => {
    setPos((prev) => {
      const nx = prev.x + dx;
      const ny = prev.y + dy;
      if (canMove(nx, ny)) {
        return { x: nx, y: ny };
      }
      return prev;
    });
  }, [canMove]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.repeat) return;
      switch (e.key) {
        case 'ArrowUp': case 'w': move(0, -1); break;
        case 'ArrowDown': case 's': move(0, 1); break;
        case 'ArrowLeft': case 'a': move(-1, 0); break;
        case 'ArrowRight': case 'd': move(1, 0); break;
        default: break;
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [move]);

  return pos;
}
