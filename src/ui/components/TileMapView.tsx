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
  // Infer period from tile.sprite (e.g., 'couch_2030' yields '2030')
  const period = tile.sprite?.split('_')[1];
  switch (tile.type) {
    case 'couch':
      // Period-aware couch design
      if (period === '2030') {
        // Sleek, modern couch
        return (
          <g key={`couch-2030-${tile.x},${tile.y}`}>
            <rect x={x+6} y={y+18} width={36} height={14} rx={8} fill="#6d6ee6" stroke="#4747a1" strokeWidth={2}/>
            <ellipse cx={x+16} cy={y+25} rx={5} ry={6} fill="#e3f2fd" />
            <ellipse cx={x+32} cy={y+25} rx={5} ry={6} fill="#e3f2fd" />
            <rect x={x+4} y={y+22} width={4} height={8} rx={2} fill="#4747a1" />
            <rect x={x+40} y={y+22} width={4} height={8} rx={2} fill="#4747a1" />
            <rect x={x+10} y={y+32} width={4} height={4} fill="#888" />
            <rect x={x+34} y={y+32} width={4} height={4} fill="#888" />
          </g>
        );
      } else if (period === '2040') {
        // Futuristic, angular couch
        return (
          <g key={`couch-2040-${tile.x},${tile.y}`}>
            <rect x={x+7} y={y+17} width={34} height={16} rx={4} fill="#00bcd4" stroke="#009688" strokeWidth={2}/>
            <ellipse cx={x+24} cy={y+25} rx={8} ry={6} fill="#fff" opacity={0.5}/>
            <rect x={x+6} y={y+22} width={4} height={10} rx={2} fill="#009688" />
            <rect x={x+38} y={y+22} width={4} height={10} rx={2} fill="#009688" />
          </g>
        );
      } else if (period === '2050') {
        // Minimalist floating couch
        return (
          <g key={`couch-2050-${tile.x},${tile.y}`}>
            <rect x={x+8} y={y+20} width={32} height={10} rx={10} fill="#b2dfdb" stroke="#009688" strokeWidth={1.5}/>
            <ellipse cx={x+24} cy={y+30} rx={10} ry={3} fill="#b2dfdb" opacity={0.3}/>
          </g>
        );
      } else if (period === '2070') {
        // Holographic/transparent couch
        return (
          <g key={`couch-2070-${tile.x},${tile.y}`}>
            <rect x={x+8} y={y+18} width={32} height={14} rx={12} fill="#7c4dff" opacity={0.3} stroke="#fff" strokeWidth={2}/>
            <ellipse cx={x+24} cy={y+25} rx={10} ry={6} fill="#fff" opacity={0.1}/>
          </g>
        );
      } else {
        // Default (legacy)
        return (
          <g key={`couch-${tile.x},${tile.y}`}>
            <rect x={x+6} y={y+18} width={36} height={14} rx={7} fill="#6d6ee6" stroke="#4747a1" strokeWidth={2}/>
            <ellipse cx={x+16} cy={y+25} rx={5} ry={6} fill="#f5f5f5" />
            <ellipse cx={x+32} cy={y+25} rx={5} ry={6} fill="#f5f5f5" />
            <rect x={x+4} y={y+22} width={4} height={8} rx={2} fill="#4747a1" />
            <rect x={x+40} y={y+22} width={4} height={8} rx={2} fill="#4747a1" />
            <rect x={x+10} y={y+32} width={4} height={4} fill="#888" />
            <rect x={x+34} y={y+32} width={4} height={4} fill="#888" />
          </g>
        );
      }
    case 'desk':
      // Period-aware desk design
      if (period === '2030') {
        return (
          <g key={`desk-2030-${tile.x},${tile.y}`}>
            <rect x={x+4} y={y+28} width={40} height={8} rx={3} fill="#a0522d" stroke="#6b2e13" strokeWidth={2}/>
            <rect x={x+6} y={y+36} width={4} height={8} fill="#6b2e13" />
            <rect x={x+38} y={y+36} width={4} height={8} fill="#6b2e13" />
            <rect x={x+32} y={y+32} width={8} height={4} fill="#c68642" rx={1} />
          </g>
        );
      } else if (period === '2040') {
        return (
          <g key={`desk-2040-${tile.x},${tile.y}`}>
            <rect x={x+6} y={y+30} width={36} height={6} rx={2} fill="#00bcd4" />
            <rect x={x+10} y={y+36} width={4} height={8} fill="#009688" />
            <rect x={x+34} y={y+36} width={4} height={8} fill="#009688" />
          </g>
        );
      } else if (period === '2050') {
        return (
          <g key={`desk-2050-${tile.x},${tile.y}`}>
            <rect x={x+8} y={y+34} width={32} height={4} rx={2} fill="#b2dfdb" />
            <ellipse cx={x+24} cy={y+36} rx={10} ry={2} fill="#b2dfdb" opacity={0.3}/>
          </g>
        );
      } else if (period === '2070') {
        return (
          <g key={`desk-2070-${tile.x},${tile.y}`}>
            <rect x={x+10} y={y+34} width={28} height={4} rx={2} fill="#7c4dff" opacity={0.3}/>
            <ellipse cx={x+24} cy={y+36} rx={10} ry={2} fill="#fff" opacity={0.1}/>
          </g>
        );
      } else {
        return (
          <g key={`desk-${tile.x},${tile.y}`}>
            <rect x={x+4} y={y+28} width={40} height={8} rx={2} fill="#a0522d" stroke="#6b2e13" strokeWidth={2}/>
            <rect x={x+6} y={y+36} width={4} height={8} fill="#6b2e13" />
            <rect x={x+38} y={y+36} width={4} height={8} fill="#6b2e13" />
            <rect x={x+32} y={y+32} width={8} height={4} fill="#c68642" rx={1} />
          </g>
        );
      }
    case 'computer':
      // Period-aware computer design
      if (period === '2030') {
        // Sleek all-in-one
        return (
          <g key={`computer-2030-${tile.x},${tile.y}`}>
            <rect x={x+18} y={y+24} width={12} height={9} rx={3} fill="#8be9fd" stroke="#222" strokeWidth={1}/>
            <rect x={x+21} y={y+27} width={6} height={3} fill="#b2f0ff" opacity={0.7}/>
            <rect x={x+23} y={y+33} width={2} height={4} fill="#222" />
            <rect x={x+18} y={y+37} width={12} height={3} rx={1} fill="#eee" stroke="#bbb" strokeWidth={1}/>
          </g>
        );
      } else if (period === '2040') {
        // Futuristic glass slab
        return (
          <g key={`computer-2040-${tile.x},${tile.y}`}>
            <rect x={x+17} y={y+23} width={14} height={10} rx={4} fill="#00bcd4" opacity={0.7} stroke="#009688" strokeWidth={1}/>
            <rect x={x+20} y={y+26} width={8} height={4} fill="#fff" opacity={0.12}/>
            <rect x={x+23} y={y+33} width={2} height={3} fill="#009688" />
          </g>
        );
      } else if (period === '2050') {
        // Minimalist floating display
        return (
          <g key={`computer-2050-${tile.x},${tile.y}`}>
            <rect x={x+19} y={y+25} width={10} height={7} rx={4} fill="#b2dfdb" opacity={0.8}/>
            <ellipse cx={x+24} cy={y+33} rx={5} ry={1.5} fill="#b2dfdb" opacity={0.2}/>
          </g>
        );
      } else if (period === '2070') {
        // Holographic floating UI
        return (
          <g key={`computer-2070-${tile.x},${tile.y}`}>
            <rect x={x+20} y={y+26} width={8} height={5} rx={2.5} fill="#7c4dff" opacity={0.3} stroke="#fff" strokeWidth={1}/>
            <ellipse cx={x+24} cy={y+31} rx={6} ry={2} fill="#fff" opacity={0.08}/>
          </g>
        );
      } else {
        return (
          <g key={`computer-${tile.x},${tile.y}`}>
            <rect x={x+17} y={y+23} width={14} height={10} rx={2} fill="#8be9fd" stroke="#222" strokeWidth={1}/>
            <rect x={x+19} y={y+25} width={6} height={3} fill="#b2f0ff" opacity={0.7}/>
            <rect x={x+23} y={y+33} width={2} height={5} fill="#222" />
            <rect x={x+16} y={y+39} width={16} height={4} rx={1} fill="#eee" stroke="#bbb" strokeWidth={1}/>
            <rect x={x+18} y={y+41} width={2} height={2} fill="#bbb" />
            <rect x={x+22} y={y+41} width={2} height={2} fill="#bbb" />
            <rect x={x+26} y={y+41} width={2} height={2} fill="#bbb" />
            <rect x={x+30} y={y+41} width={2} height={2} fill="#bbb" />
          </g>
        );
      }
    case 'bed':
      // Period-aware bed design
      if (period === '2030') {
        return (
          <g key={`bed-2030-${tile.x},${tile.y}`}>
            <rect x={x+8} y={y+10} width={32} height={22} rx={6} fill="#f67280" stroke="#b83b5e" strokeWidth={2}/>
            <rect x={x+10} y={y+12} width={28} height={16} rx={4} fill="#fff" />
            <rect x={x+10} y={y+20} width={28} height={8} rx={4} fill="#b2dfdb" />
            <rect x={x+12} y={y+14} width={10} height={6} rx={2} fill="#ffe0e0" />
          </g>
        );
      } else if (period === '2040') {
        return (
          <g key={`bed-2040-${tile.x},${tile.y}`}>
            <rect x={x+11} y={y+12} width={26} height={20} rx={8} fill="#00bcd4" opacity={0.7}/>
            <rect x={x+13} y={y+14} width={22} height={12} rx={4} fill="#fff" opacity={0.7}/>
            <rect x={x+13} y={y+22} width={22} height={6} rx={3} fill="#00bcd4" opacity={0.3}/>
          </g>
        );
      } else if (period === '2050') {
        return (
          <g key={`bed-2050-${tile.x},${tile.y}`}>
            <rect x={x+13} y={y+16} width={20} height={12} rx={6} fill="#b2dfdb" opacity={0.8}/>
            <ellipse cx={x+24} cy={y+28} rx={10} ry={3} fill="#b2dfdb" opacity={0.2}/>
          </g>
        );
      } else if (period === '2070') {
        return (
          <g key={`bed-2070-${tile.x},${tile.y}`}>
            <rect x={x+15} y={y+18} width={18} height={10} rx={5} fill="#7c4dff" opacity={0.3}/>
            <ellipse cx={x+24} cy={y+24} rx={10} ry={4} fill="#fff" opacity={0.08}/>
          </g>
        );
      } else {
        return (
          <g key={`bed-${tile.x},${tile.y}`}>
            <rect x={x+8} y={y+8} width={32} height={6} rx={2} fill="#8d5524" />
            <rect x={x+8} y={y+14} width={32} height={24} rx={6} fill="#f67280" stroke="#b83b5e" strokeWidth={2}/>
            <rect x={x+10} y={y+16} width={28} height={18} rx={4} fill="#fff" />
            <rect x={x+10} y={y+24} width={28} height={10} rx={4} fill="#b2dfdb" />
            <rect x={x+12} y={y+18} width={10} height={6} rx={2} fill="#ffe0e0" />
          </g>
        );
      }
    case 'rug':
      // Period-aware rug design
      if (period === '2030') {
        return (
          <g key={`rug-2030-${tile.x},${tile.y}`}>
            <ellipse cx={x+24} cy={y+24} rx={18} ry={10} fill="#ffd166" stroke="#e09f3e" strokeWidth={2}/>
            <ellipse cx={x+24} cy={y+24} rx={8} ry={4} fill="#fff" opacity={0.08}/>
          </g>
        );
      } else if (period === '2040') {
        return (
          <g key={`rug-2040-${tile.x},${tile.y}`}>
            <g>
              <rect x={x+8} y={y+16} width={32} height={16} rx={8} fill="#00bcd4" stroke="#009688" strokeWidth={2}/>
              <ellipse cx={x+24} cy={y+24} rx={10} ry={5} fill="#fff" opacity={0.1}/>
            </g>
          </g>
        );
      } else if (period === '2050') {
        return (
          <g key={`rug-2050-${tile.x},${tile.y}`}>
            <g>
              <ellipse cx={x+24} cy={y+24} rx={16} ry={8} fill="#b2dfdb" opacity={0.8}/>
              <ellipse cx={x+24} cy={y+24} rx={7} ry={3} fill="#fff" opacity={0.1}/>
            </g>
          </g>
        );
      } else if (period === '2070') {
        return (
          <g key={`rug-2070-${tile.x},${tile.y}`}>
            <g>
              <ellipse cx={x+24} cy={y+24} rx={18} ry={10} fill="#7c4dff" opacity={0.2}/>
              <ellipse cx={x+24} cy={y+24} rx={12} ry={6} fill="#fff" opacity={0.06}/>
            </g>
          </g>
        );
      } else {
        return (
          <g key={`rug-${tile.x},${tile.y}`}>
            <ellipse cx={x+24} cy={y+24} rx={18} ry={10} fill="#ffd166" stroke="#e09f3e" strokeWidth={2}/>
          </g>
        );
      }
    case 'bookshelf':
      // Period-aware bookshelf design
      if (period === '2030') {
        return (
          <g key={`bookshelf-2030-${tile.x},${tile.y}`}>
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
      } else if (period === '2040') {
        return (
          <g key={`bookshelf-2040-${tile.x},${tile.y}`}>
            <rect x={x+10} y={y+12} width={28} height={26} rx={4} fill="#00bcd4" />
            <ellipse cx={x+24} cy={y+30} rx={7} ry={2} fill="#009688" opacity={0.2}/>
          </g>
        );
      } else if (period === '2050') {
        return (
          <g key={`bookshelf-2050-${tile.x},${tile.y}`}>
            <ellipse cx={x+24} cy={y+25} rx={12} ry={5} fill="#b2dfdb" opacity={0.8}/>
            <ellipse cx={x+24} cy={y+28} rx={7} ry={2} fill="#fff" opacity={0.1}/>
          </g>
        );
      } else if (period === '2070') {
        return (
          <g key={`bookshelf-2070-${tile.x},${tile.y}`}>
            <ellipse cx={x+24} cy={y+25} rx={10} ry={4} fill="#7c4dff" opacity={0.18}/>
            <ellipse cx={x+24} cy={y+28} rx={8} ry={2} fill="#fff" opacity={0.06}/>
          </g>
        );
      } else {
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
      }
      // Default bookshelf (legacy)
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
      // Period-aware coffee table design
      if (period === '2030') {
        return (
          <g key={`coffee_table-2030-${tile.x},${tile.y}`}>
            <rect x={x+14} y={y+28} width={20} height={8} rx={4} fill="#8b5c2a" stroke="#5d3a0c" strokeWidth={1.5}/>
            <rect x={x+16} y={y+34} width={2} height={4} fill="#5d3a0c" />
            <rect x={x+32} y={y+34} width={2} height={4} fill="#5d3a0c" />
          </g>
        );
      } else if (period === '2040') {
        return (
          <g key={`coffee_table-2040-${tile.x},${tile.y}`}>
            <ellipse cx={x+24} cy={y+32} rx={10} ry={5} fill="#00bcd4" opacity={0.7}/>
            <rect x={x+18} y={y+36} width={12} height={3} rx={1.5} fill="#009688" />
          </g>
        );
      } else if (period === '2050') {
        return (
          <g key={`coffee_table-2050-${tile.x},${tile.y}`}>
            <ellipse cx={x+24} cy={y+32} rx={9} ry={4} fill="#b2dfdb" opacity={0.7}/>
            <ellipse cx={x+24} cy={y+36} rx={7} ry={2} fill="#fff" opacity={0.12}/>
          </g>
        );
      } else if (period === '2070') {
        return (
          <g key={`coffee_table-2070-${tile.x},${tile.y}`}>
            <ellipse cx={x+24} cy={y+32} rx={11} ry={5} fill="#7c4dff" opacity={0.18}/>
            <ellipse cx={x+24} cy={y+35} rx={8} ry={2} fill="#fff" opacity={0.06}/>
          </g>
        );
      } else {
        return (
          <g key={`coffee_table-${tile.x},${tile.y}`}>
            <rect x={x+14} y={y+28} width={20} height={8} rx={4} fill="#8b5c2a" stroke="#5d3a0c" strokeWidth={1.5}/>
            <rect x={x+16} y={y+34} width={2} height={4} fill="#5d3a0c" />
            <rect x={x+32} y={y+34} width={2} height={4} fill="#5d3a0c" />
          </g>
        );
      }
    case 'kitchenette':
      // Period-aware kitchenette design
      if (period === '2030') {
        return (
          <g key={`kitchenette-2030-${tile.x},${tile.y}`}>
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
      } else if (period === '2040') {
        return (
          <g key={`kitchenette-2040-${tile.x},${tile.y}`}>
            <rect x={x+6} y={y+16} width={36} height={12} rx={5} fill="#00bcd4" opacity={0.7}/>
            <ellipse cx={x+24} cy={y+22} rx={10} ry={3} fill="#fff" opacity={0.08}/>
            <rect x={x+20} y={y+26} width={8} height={4} rx={2} fill="#009688" />
          </g>
        );
      } else if (period === '2050') {
        return (
          <g key={`kitchenette-2050-${tile.x},${tile.y}`}>
            <ellipse cx={x+24} cy={y+22} rx={14} ry={5} fill="#b2dfdb" opacity={0.7}/>
            <ellipse cx={x+24} cy={y+26} rx={8} ry={2} fill="#fff" opacity={0.12}/>
            <rect x={x+18} y={y+28} width={12} height={4} rx={2} fill="#b2dfdb" opacity={0.4}/>
          </g>
        );
      } else if (period === '2070') {
        return (
          <g key={`kitchenette-2070-${tile.x},${tile.y}`}>
            <ellipse cx={x+24} cy={y+22} rx={16} ry={6} fill="#7c4dff" opacity={0.18}/>
            <ellipse cx={x+24} cy={y+26} rx={10} ry={3} fill="#fff" opacity={0.06}/>
            <rect x={x+20} y={y+30} width={8} height={4} rx={2} fill="#fff" opacity={0.06}/>
          </g>
        );
      } else {
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
      }
    case 'plant':
      // Period-aware plant design
      if (period === '2030') {
        return (
          <g key={`plant-2030-${tile.x},${tile.y}`}>
            <rect x={x+20} y={y+34} width={8} height={6} rx={3} fill="#795548" />
            <ellipse cx={x+24} cy={y+28} rx={10} ry={7} fill="#388e3c" />
            <ellipse cx={x+24} cy={y+24} rx={6} ry={4} fill="#66bb6a" />
          </g>
        );
      } else if (period === '2040') {
        return (
          <g key={`plant-2040-${tile.x},${tile.y}`}>
            <rect x={x+22} y={y+36} width={4} height={5} rx={2} fill="#00bcd4" />
            <ellipse cx={x+24} cy={y+28} rx={8} ry={6} fill="#00bcd4" opacity={0.7}/>
            <ellipse cx={x+24} cy={y+24} rx={5} ry={3} fill="#fff" opacity={0.12}/>
          </g>
        );
      } else if (period === '2050') {
        return (
          <g key={`plant-2050-${tile.x},${tile.y}`}>
            <ellipse cx={x+24} cy={y+30} rx={8} ry={5} fill="#b2dfdb" opacity={0.7}/>
            <ellipse cx={x+24} cy={y+26} rx={5} ry={2} fill="#fff" opacity={0.08}/>
          </g>
        );
      } else if (period === '2070') {
        return (
          <g key={`plant-2070-${tile.x},${tile.y}`}>
            <ellipse cx={x+24} cy={y+28} rx={10} ry={7} fill="#7c4dff" opacity={0.15}/>
            <ellipse cx={x+24} cy={y+24} rx={6} ry={4} fill="#fff" opacity={0.04}/>
          </g>
        );
      } else {
        return (
          <g key={`plant-${tile.x},${tile.y}`}>
            <rect x={x+20} y={y+32} width={8} height={8} rx={3} fill="#795548" />
            <ellipse cx={x+24} cy={y+28} rx={10} ry={7} fill="#388e3c" />
            <ellipse cx={x+24} cy={y+24} rx={6} ry={4} fill="#66bb6a" />
          </g>
        );
      }
    case 'dining_table':
      // Period-aware dining table design
      if (period === '2030') {
        return (
          <g key={`dining_table-2030-${tile.x},${tile.y}`}>
            <rect x={x+12} y={y+20} width={24} height={10} rx={5} fill="#d7b377" stroke="#a67c00" strokeWidth={2}/>
            <rect x={x+14} y={y+28} width={2} height={8} fill="#a67c00" />
            <rect x={x+32} y={y+28} width={2} height={8} fill="#a67c00" />
          </g>
        );
      } else if (period === '2040') {
        return (
          <g key={`dining_table-2040-${tile.x},${tile.y}`}>
            <rect x={x+14} y={y+22} width={20} height={8} rx={6} fill="#00bcd4" />
            <ellipse cx={x+24} cy={y+30} rx={7} ry={2} fill="#009688" opacity={0.2}/>
          </g>
        );
      } else if (period === '2050') {
        return (
          <g key={`dining_table-2050-${tile.x},${tile.y}`}>
            <ellipse cx={x+24} cy={y+25} rx={12} ry={5} fill="#b2dfdb" opacity={0.8}/>
            <ellipse cx={x+24} cy={y+28} rx={7} ry={2} fill="#fff" opacity={0.1}/>
          </g>
        );
      } else if (period === '2070') {
        return (
          <g key={`dining_table-2070-${tile.x},${tile.y}`}>
            <ellipse cx={x+24} cy={y+25} rx={10} ry={4} fill="#7c4dff" opacity={0.18}/>
            <ellipse cx={x+24} cy={y+28} rx={8} ry={2} fill="#fff" opacity={0.06}/>
          </g>
        );
      } else {
        return (
          <g key={`dining_table-${tile.x},${tile.y}`}>
            <rect x={x+12} y={y+20} width={24} height={10} rx={4} fill="#d7b377" stroke="#a67c00" strokeWidth={2}/>
            <rect x={x+14} y={y+28} width={2} height={8} fill="#a67c00" />
            <rect x={x+32} y={y+28} width={2} height={8} fill="#a67c00" />
          </g>
        );
      }
    case 'chair':
      // Period-aware chair design
      if (period === '2030') {
        return (
          <g key={`chair-2030-${tile.x},${tile.y}`}>
            <rect x={x+16} y={y+28} width={16} height={10} rx={4} fill="#e0c187" stroke="#a67c00" strokeWidth={1.5}/>
            <rect x={x+16} y={y+20} width={16} height={8} rx={4} fill="#f5e6c4" stroke="#a67c00" strokeWidth={1}/>
            <rect x={x+18} y={y+38} width={2} height={6} fill="#a67c00" />
            <rect x={x+28} y={y+38} width={2} height={6} fill="#a67c00" />
          </g>
        );
      } else if (period === '2040') {
        return (
          <g key={`chair-2040-${tile.x},${tile.y}`}>
            <rect x={x+18} y={y+30} width={12} height={8} rx={5} fill="#00bcd4" />
            <rect x={x+18} y={y+22} width={12} height={8} rx={5} fill="#fff" opacity={0.4}/>
          </g>
        );
      } else if (period === '2050') {
        return (
          <g key={`chair-2050-${tile.x},${tile.y}`}>
            <ellipse cx={x+24} cy={y+34} rx={8} ry={4} fill="#b2dfdb" opacity={0.8}/>
            <ellipse cx={x+24} cy={y+30} rx={6} ry={2} fill="#fff" opacity={0.1}/>
          </g>
        );
      } else if (period === '2070') {
        return (
          <g key={`chair-2070-${tile.x},${tile.y}`}>
            <ellipse cx={x+24} cy={y+34} rx={8} ry={5} fill="#7c4dff" opacity={0.15}/>
            <ellipse cx={x+24} cy={y+30} rx={6} ry={2} fill="#fff" opacity={0.04}/>
          </g>
        );
      } else {
        return (
          <g key={`chair-${tile.x},${tile.y}`}>
            <rect x={x+16} y={y+28} width={16} height={10} rx={3} fill="#e0c187" stroke="#a67c00" strokeWidth={1.5}/>
            <rect x={x+16} y={y+20} width={16} height={8} rx={3} fill="#f5e6c4" stroke="#a67c00" strokeWidth={1}/>
            <rect x={x+18} y={y+38} width={2} height={6} fill="#a67c00" />
            <rect x={x+28} y={y+38} width={2} height={6} fill="#a67c00" />
          </g>
        );
      }
    case 'lamp':
      // Period-aware lamp design
      if (period === '2030') {
        return (
          <g key={`lamp-2030-${tile.x},${tile.y}`}>
            <rect x={x+22} y={y+26} width={4} height={10} fill="#bdbdbd" />
            <ellipse cx={x+24} cy={y+24} rx={8} ry={6} fill="#fff59d" stroke="#fbc02d" strokeWidth={2}/>
          </g>
        );
      } else if (period === '2040') {
        return (
          <g key={`lamp-2040-${tile.x},${tile.y}`}>
            <rect x={x+23} y={y+28} width={2} height={8} fill="#00bcd4" />
            <ellipse cx={x+24} cy={y+24} rx={7} ry={5} fill="#00bcd4" opacity={0.6}/>
          </g>
        );
      } else if (period === '2050') {
        return (
          <g key={`lamp-2050-${tile.x},${tile.y}`}>
            <ellipse cx={x+24} cy={y+28} rx={3} ry={8} fill="#b2dfdb" opacity={0.7}/>
            <ellipse cx={x+24} cy={y+24} rx={7} ry={3} fill="#fff" opacity={0.08}/>
          </g>
        );
      } else if (period === '2070') {
        return (
          <g key={`lamp-2070-${tile.x},${tile.y}`}>
            <ellipse cx={x+24} cy={y+24} rx={8} ry={8} fill="#7c4dff" opacity={0.15}/>
            <ellipse cx={x+24} cy={y+24} rx={5} ry={5} fill="#fff" opacity={0.03}/>
          </g>
        );
      } else {
        return (
          <g key={`lamp-${tile.x},${tile.y}`}>
            <rect x={x+22} y={y+24} width={4} height={12} fill="#bdbdbd" />
            <ellipse cx={x+24} cy={y+24} rx={8} ry={6} fill="#fff59d" stroke="#fbc02d" strokeWidth={2}/>
          </g>
        );
      }
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
