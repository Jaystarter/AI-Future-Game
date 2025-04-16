import React from 'react';
import { TileMapData, Tile } from '../../game/TileMap';

const TILE_SIZE = 48;

function getTileColor(type: string) {
  switch (type) {
    case 'wall': return '#222';
    case 'floor': return '#b9c6ae';
    case 'player': return '#4a90e2';
    case 'npc': return '#e27d60';
    case 'door': return '#e2c275';
    case 'couch': return '#7d5fff';
    case 'desk': return '#a0522d';
    case 'computer': return '#8be9fd';
    case 'bed': return '#f67280';
    case 'rug': return '#ffd166';
    default: return '#fff';
  }
}

function renderFurniture(tile: Tile) {
  const x = tile.x * TILE_SIZE;
  const y = tile.y * TILE_SIZE;
  switch (tile.type) {
    case 'couch':
      return (
        <g key={`couch-${tile.x},${tile.y}`}>
          {/* Couch base */}
          <rect x={x+4} y={y+16} width={40} height={18} rx={7} fill="#7d5fff" stroke="#4a00e0" strokeWidth={2}/>
          {/* Cushions */}
          <rect x={x+8} y={y+18} width={12} height={14} rx={4} fill="#a084e8" stroke="#4a00e0" strokeWidth={1}/>
          <rect x={x+28} y={y+18} width={12} height={14} rx={4} fill="#a084e8" stroke="#4a00e0" strokeWidth={1}/>
          {/* Armrests */}
          <rect x={x+2} y={y+20} width={6} height={10} rx={2} fill="#5f43b2" />
          <rect x={x+40} y={y+20} width={6} height={10} rx={2} fill="#5f43b2" />
          {/* Legs */}
          <rect x={x+8} y={y+34} width={4} height={5} fill="#222" />
          <rect x={x+36} y={y+34} width={4} height={5} fill="#222" />
        </g>
      );
    case 'desk':
      return (
        <g key={`desk-${tile.x},${tile.y}`}>
          {/* Desk top */}
          <rect x={x+4} y={y+28} width={40} height={8} rx={2} fill="#a0522d" stroke="#6b2e13" strokeWidth={2}/>
          {/* Legs */}
          <rect x={x+6} y={y+36} width={4} height={8} fill="#6b2e13" />
          <rect x={x+38} y={y+36} width={4} height={8} fill="#6b2e13" />
          {/* Drawer */}
          <rect x={x+32} y={y+32} width={8} height={4} fill="#c68642" rx={1} />
        </g>
      );
    case 'computer':
      return (
        <g key={`computer-${tile.x},${tile.y}`}>
          {/* Monitor */}
          <rect x={x+17} y={y+23} width={14} height={10} rx={2} fill="#8be9fd" stroke="#222" strokeWidth={1}/>
          {/* Screen reflection */}
          <rect x={x+19} y={y+25} width={6} height={3} fill="#b2f0ff" opacity={0.7}/>
          {/* Stand */}
          <rect x={x+23} y={y+33} width={2} height={5} fill="#222" />
          {/* Keyboard */}
          <rect x={x+16} y={y+39} width={16} height={4} rx={1} fill="#eee" stroke="#bbb" strokeWidth={1}/>
          {/* Keys */}
          <rect x={x+18} y={y+41} width={2} height={2} fill="#bbb" />
          <rect x={x+22} y={y+41} width={2} height={2} fill="#bbb" />
          <rect x={x+26} y={y+41} width={2} height={2} fill="#bbb" />
          <rect x={x+30} y={y+41} width={2} height={2} fill="#bbb" />
        </g>
      );
    case 'bed':
      return (
        <g key={`bed-${tile.x},${tile.y}`}>
          {/* Bed frame */}
          <rect x={x+8} y={y+10} width={32} height={28} rx={6} fill="#f67280" stroke="#b83b5e" strokeWidth={2}/>
          {/* Mattress */}
          <rect x={x+10} y={y+12} width={28} height={20} rx={4} fill="#fff" />
          {/* Pillow */}
          <rect x={x+12} y={y+14} width={10} height={8} rx={2} fill="#ffe0e0" />
          {/* Blanket */}
          <rect x={x+20} y={y+22} width={16} height={8} rx={2} fill="#f8bbd0" />
        </g>
      );
    case 'rug':
      return (
        <g key={`rug-${tile.x},${tile.y}`}>
          <ellipse cx={x+24} cy={y+24} rx={18} ry={10} fill="#ffd166" stroke="#e09f3e" strokeWidth={2}/>
          <ellipse cx={x+24} cy={y+24} rx={12} ry={6} fill="#fff3c4" opacity={0.7}/>
        </g>
      );
    default:
      return null;
  }
}


import { NPC } from '../../game/NPC';
import { NPCView } from './NPCView';

export interface TileMapViewProps {
  map: TileMapData;
  playerPos: { x: number; y: number };
  npcs?: NPC[];
}

export const TileMapView: React.FC<TileMapViewProps> = ({ map, playerPos, npcs = [] }) => (
  <div
    style={{
      display: 'inline-block',
      background: '#888',
      border: '4px solid #444',
      margin: '1rem',
    }}
  >
    <svg
      width={map.width * TILE_SIZE}
      height={map.height * TILE_SIZE}
      style={{ display: 'block' }}
    >
      {map.tiles.flat().map((tile: Tile) => (
        tile.type === 'floor' || tile.type === 'wall' || tile.type === 'door'
          ? <rect
              key={`${tile.x},${tile.y}`}
              x={tile.x * TILE_SIZE}
              y={tile.y * TILE_SIZE}
              width={TILE_SIZE}
              height={TILE_SIZE}
              fill={getTileColor(tile.type)}
              stroke="#333"
            />
          : null
      ))}
      {/* Draw furniture */}
      {map.tiles.flat().map(renderFurniture)}
      {/* Draw NPCs */}
      {npcs.map(npc => <NPCView key={npc.id} npc={npc} />)}
      {/* Draw player as a circle at playerPos */}
      <circle
        key={`player-${playerPos.x},${playerPos.y}`}
        cx={playerPos.x * TILE_SIZE + TILE_SIZE / 2}
        cy={playerPos.y * TILE_SIZE + TILE_SIZE / 2}
        r={TILE_SIZE * 0.35}
        fill="#4a90e2"
        stroke="#fff"
        strokeWidth={3}
      />
    </svg>
  </div>
);
