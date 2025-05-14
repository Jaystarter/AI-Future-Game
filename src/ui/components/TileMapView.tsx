import React from 'react';
import { TileMapData, Tile } from '../../game/TileMap';
import PlayerCharacterSVG from '../../game/PlayerCharacterSVG';
import { PlayerState } from '../../game/usePlayerMovement';
import { InteractableObject } from '../../game/interactionTypes'; 
import { NPCView } from './NPCView';
import { ExaminableView } from './ExaminableView';
import { SmartDeviceView } from './SmartDeviceView';

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
          {/* Headboard */}
          <rect x={x+8} y={y+8} width={32} height={6} rx={2} fill="#8d5524" />
          {/* Bed frame */}
          <rect x={x+8} y={y+14} width={32} height={24} rx={6} fill="#f67280" stroke="#b83b5e" strokeWidth={2}/>
          {/* Mattress */}
          <rect x={x+10} y={y+16} width={28} height={18} rx={4} fill="#fff" />
          {/* Blanket */}
          <rect x={x+10} y={y+24} width={28} height={10} rx={4} fill="#b2dfdb" />
          {/* Pillow */}
          <rect x={x+12} y={y+18} width={10} height={6} rx={2} fill="#ffe0e0" />
        </g>
      );
    case 'rug':
      return (
        <g key={`rug-${tile.x},${tile.y}`}>
          <ellipse cx={x+24} cy={y+24} rx={18} ry={10} fill="#ffd166" stroke="#e09f3e" strokeWidth={2}/>
          <ellipse cx={x+24} cy={y+24} rx={12} ry={6} fill="#fff3c4" opacity={0.7}/>
        </g>
      );
    case 'bookshelf':
      return (
        <g key={`bookshelf-${tile.x},${tile.y}`}>
          <rect x={x+8} y={y+10} width={32} height={28} rx={3} fill="#deb887" stroke="#a0522d" strokeWidth={2}/>
          {/* Shelves */}
          <rect x={x+10} y={y+16} width={28} height={3} fill="#a0522d" />
          <rect x={x+10} y={y+24} width={28} height={3} fill="#a0522d" />
          <rect x={x+10} y={y+32} width={28} height={3} fill="#a0522d" />
          {/* Books */}
          <rect x={x+12} y={y+12} width={4} height={10} fill="#b22222" />
          <rect x={x+18} y={y+12} width={4} height={10} fill="#4682b4" />
          <rect x={x+24} y={y+12} width={4} height={10} fill="#228b22" />
        </g>
      );
    case 'tv':
      return (
        <g key={`tv-${tile.x},${tile.y}`}>
          <rect x={x+10} y={y+18} width={28} height={16} rx={2} fill="#222" stroke="#555" strokeWidth={2}/>
          <rect x={x+14} y={y+22} width={20} height={8} fill="#1e90ff" opacity={0.7}/>
          {/* Stand */}
          <rect x={x+20} y={y+34} width={8} height={3} fill="#333" />
        </g>
      );
    case 'coffee_table':
      return (
        <g key={`coffee_table-${tile.x},${tile.y}`}>
          <rect x={x+14} y={y+28} width={20} height={8} rx={4} fill="#8b5c2a" stroke="#5d3a0c" strokeWidth={1.5}/>
          {/* Legs */}
          <rect x={x+16} y={y+34} width={2} height={4} fill="#5d3a0c" />
          <rect x={x+32} y={y+34} width={2} height={4} fill="#5d3a0c" />
        </g>
      );
    case 'kitchenette':
      return (
        <g key={`kitchenette-${tile.x},${tile.y}`}>
          <rect x={x+4} y={y+14} width={40} height={16} rx={3} fill="#b0bec5" stroke="#78909c" strokeWidth={2}/>
          {/* Sink */}
          <rect x={x+8} y={y+18} width={8} height={6} fill="#e0e0e0" rx={2} />
          {/* Stove */}
          <rect x={x+24} y={y+18} width={10} height={6} fill="#616161" rx={1} />
          {/* Knobs */}
          <circle cx={x+26} cy={y+22} r={1.2} fill="#fff" />
          <circle cx={x+29} cy={y+22} r={1.2} fill="#fff" />
        </g>
      );
    case 'plant':
      return (
        <g key={`plant-${tile.x},${tile.y}`}>
          <rect x={x+20} y={y+32} width={8} height={8} rx={3} fill="#795548" />
          <ellipse cx={x+24} cy={y+28} rx={10} ry={7} fill="#388e3c" />
          <ellipse cx={x+24} cy={y+24} rx={6} ry={4} fill="#66bb6a" />
        </g>
      );
    case 'dining_table':
      return (
        <g key={`dining_table-${tile.x},${tile.y}`}>
          <rect x={x+12} y={y+20} width={24} height={10} rx={4} fill="#d7b377" stroke="#a67c00" strokeWidth={2}/>
          {/* Legs */}
          <rect x={x+14} y={y+28} width={2} height={8} fill="#a67c00" />
          <rect x={x+32} y={y+28} width={2} height={8} fill="#a67c00" />
        </g>
      );
    case 'chair':
      return (
        <g key={`chair-${tile.x},${tile.y}`}>
          {/* Chair seat */}
          <rect x={x+16} y={y+28} width={16} height={10} rx={3} fill="#e0c187" stroke="#a67c00" strokeWidth={1.5}/>
          {/* Chair back */}
          <rect x={x+16} y={y+20} width={16} height={8} rx={3} fill="#f5e6c4" stroke="#a67c00" strokeWidth={1}/>
          {/* Chair legs */}
          <rect x={x+18} y={y+38} width={2} height={6} fill="#a67c00" />
          <rect x={x+28} y={y+38} width={2} height={6} fill="#a67c00" />
        </g>
      );
    case 'lamp':
      return (
        <g key={`lamp-${tile.x},${tile.y}`}>
          <rect x={x+22} y={y+24} width={4} height={12} fill="#bdbdbd" />
          <ellipse cx={x+24} cy={y+24} rx={8} ry={6} fill="#fff59d" stroke="#fbc02d" strokeWidth={2}/>
        </g>
      );
    default:
      return null;
  }
}

export interface TileMapViewProps {
  map: TileMapData;
  playerState: PlayerState;
  npcs?: InteractableObject[];
  examinables?: InteractableObject[]; 
  smartDevices?: InteractableObject[]; 
  debugMode?: boolean;
}

export const TileMapView: React.FC<TileMapViewProps> = ({ map, playerState, npcs = [], examinables = [], smartDevices = [], debugMode = false }) => (
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
      {map.tiles.flat().map((tile: Tile) => {
        const isWall = tile.type === 'wall';
        const isFloorOrDoor = tile.type === 'floor' || tile.type === 'door';

        return (
          (isFloorOrDoor || isWall) && (
            <g key={`${tile.x}-${tile.y}-group`}>
              <rect
                key={`${tile.x},${tile.y}`}
                x={tile.x * TILE_SIZE}
                y={tile.y * TILE_SIZE}
                width={TILE_SIZE}
                height={TILE_SIZE}
                fill={getTileColor(tile.type)}
                stroke="#333"
              />
              {debugMode && isWall && (
                <rect
                  key={`${tile.x},${tile.y}-debug`}
                  x={tile.x * TILE_SIZE + TILE_SIZE * 0.1}
                  y={tile.y * TILE_SIZE + TILE_SIZE * 0.1}
                  width={TILE_SIZE * 0.8}
                  height={TILE_SIZE * 0.8}
                  fill="rgba(255, 0, 0, 0.3)" // Semi-transparent red overlay for walls in debug
                  stroke="rgba(255,0,0,0.7)"
                  strokeWidth={1}
                />
              )}
            </g>
          )
        );
      })}
      {/* Draw furniture */}
      {map.tiles.flat().map(renderFurniture)}
      {/* Draw NPCs */}
      {npcs.map(npc => <NPCView key={npc.id} npc={npc} />)}
      {/* Draw Examinables */}
      {examinables.map(item => <ExaminableView key={item.id} examinable={item} />)}
      {/* Draw Smart Devices */}
      {smartDevices.map(device => <SmartDeviceView key={device.id} device={device} />)}
      {/* Draw player using PlayerCharacterSVG component */}
      <PlayerCharacterSVG 
        position={{ x: playerState.x, y: playerState.y }} 
        orientation={playerState.orientation} 
        activityState={playerState.activityState} 
        tileSize={TILE_SIZE} 
        color="#4a90e2" 
      />
    </svg>
  </div>
);
