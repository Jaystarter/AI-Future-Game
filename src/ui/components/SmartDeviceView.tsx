import React from 'react';
import { InteractableObject } from '../../game/interactionTypes';
import { SmartDeviceDetails } from '../../game/smartDevice';

const TILE_SIZE = 48;

// Helper function to render specific SVGs based on spriteKey
const renderSprite = (spriteKey: string, itemX: number, itemY: number) => {
  const x = itemX * TILE_SIZE;
  const y = itemY * TILE_SIZE;

  switch (spriteKey) {
    case 'infotainment_wall_2025':
      return (
        <g key={`infotainment-${spriteKey}-${itemX}-${itemY}`}>
          {/* Modern flat screen */}
          <rect x={x + 10} y={y + 14} width={TILE_SIZE - 20} height={TILE_SIZE - 28} rx={3} fill="#222" stroke="#444" strokeWidth={2}/>
          {/* UI elements */}
          <rect x={x + 14} y={y + 18} width={TILE_SIZE - 28} height={8} rx={2} fill="#00bcd4" opacity={0.8}/>
          <rect x={x + 14} y={y + 28} width={TILE_SIZE - 28} height={6} rx={2} fill="#8bc34a" opacity={0.7}/>
          <rect x={x + 14} y={y + 36} width={TILE_SIZE - 28} height={4} rx={2} fill="#ffc107" opacity={0.6}/>
        </g>
      );
    case 'smartspeaker_mini_2025':
      return (
        <g key={`smartspeaker-${spriteKey}-${itemX}-${itemY}`}>
          {/* Stylish smart speaker */}
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 6} rx={11} ry={8} fill="#ececec" stroke="#b0bec5" strokeWidth={2}/>
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 3} rx={8} ry={5} fill="#b0bec5" opacity={0.7}/>
          {/* Sound waves */}
          <path d={`M${x + 14} ${y + 38} Q${x + 24} ${y + 44},${x + 34} ${y + 38}`} stroke="#90caf9" strokeWidth={1.5} fill="none" />
        </g>
      );
    case 'smart_tv_streaming_2025':
      return (
        <g key={`tv-${spriteKey}-${itemX}-${itemY}`}>
          {/* Modern TV */}
          <rect x={x + 8} y={y + 12} width={TILE_SIZE - 16} height={TILE_SIZE - 24} rx={4} fill="#222" stroke="#444" strokeWidth={2}/>
          <rect x={x + 12} y={y + 16} width={TILE_SIZE - 24} height={TILE_SIZE - 32} rx={2} fill="#00bcd4" opacity={0.12}/>
          <rect x={x + 14} y={y + 28} width={TILE_SIZE - 28} height={5} rx={2} fill="#fff" opacity={0.08}/>
          {/* Stand */}
          <rect x={x + 22} y={y + TILE_SIZE - 10} width={TILE_SIZE - 44} height={4} rx={1.5} fill="#888" />
        </g>
      );
    case 'smart_speaker_basic_2025':
      return (
        <g key={`smartspeaker-${spriteKey}-${itemX}-${itemY}`}>
          {/* Speaker body */}
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 7} rx={11} ry={8} fill="#ececec" stroke="#b0bec5" strokeWidth={2}/>
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 4} rx={8} ry={5} fill="#b0bec5" opacity={0.7}/>
          {/* Sound waves */}
          <path d={`M${x + 14} ${y + 38} Q${x + 24} ${y + 44},${x + 34} ${y + 38}`} stroke="#90caf9" strokeWidth={1.5} fill="none" />
        </g>
      );
    case 'old_laptop_work_2025':
      return (
        <g key={`laptop-${spriteKey}-${itemX}-${itemY}`}>
          {/* Laptop base */}
          <rect x={x + 12} y={y + 28} width={TILE_SIZE - 24} height={10} rx={2} fill="#b0bec5" stroke="#78909c" strokeWidth={1}/>
          {/* Screen */}
          <rect x={x + 14} y={y + 16} width={TILE_SIZE - 28} height={12} rx={2} fill="#90caf9" stroke="#78909c" strokeWidth={1}/>
          {/* Keyboard lines */}
          <rect x={x + 16} y={y + 32} width={TILE_SIZE - 32} height={2} fill="#cfd8dc" />
          <rect x={x + 16} y={y + 35} width={TILE_SIZE - 32} height={2} fill="#cfd8dc" />
        </g>
      );
    case 'robot_vacuum_basic_2025':
      return (
        <g key={`robotvacuum-${spriteKey}-${itemX}-${itemY}`}>
          {/* Robot vacuum body */}
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 8} rx={13} ry={13} fill="#b2dfdb" stroke="#009688" strokeWidth={2}/>
          {/* Center button */}
          <circle cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 8} r={3} fill="#009688" />
          {/* Wheels */}
          <ellipse cx={x + TILE_SIZE/2 - 8} cy={y + TILE_SIZE/2 + 15} rx={3} ry={1.5} fill="#757575" />
          <ellipse cx={x + TILE_SIZE/2 + 8} cy={y + TILE_SIZE/2 + 15} rx={3} ry={1.5} fill="#757575" />
        </g>
      );
    case 'smart_thermostat_basic_2025':
      return (
        <g key={`thermostat-${spriteKey}-${itemX}-${itemY}`}>
          {/* Thermostat dial */}
          <circle cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2} r={14} fill="#fff3e0" stroke="#ffb74d" strokeWidth={2}/>
          {/* Temperature indicator */}
          <rect x={x + TILE_SIZE/2 - 4} y={y + TILE_SIZE/2 - 10} width={8} height={12} rx={2} fill="#ffb74d" />
          {/* Center dot */}
          <circle cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2} r={3} fill="#ff9800" />
        </g>
      );
    default:
      return (
        <g>
          <rect x={x} y={y} width={TILE_SIZE} height={TILE_SIZE} fill="#9B59B6" />
          <text x={x + TILE_SIZE / 2} y={y + TILE_SIZE / 2} dominantBaseline="middle" textAnchor="middle" fontSize="10" fill="#fff">SD?</text>
        </g>
      );
  }
};

export const SmartDeviceView: React.FC<{ device: InteractableObject }> = ({ device }) => {
  const details = device.data as SmartDeviceDetails;
  
  if (details.spriteKey) {
    return renderSprite(details.spriteKey, device.position.x, device.position.y);
  }

  // Redesigned SVG for smart hub (modern, glowing, techy)
  return (
    <g>
      <rect
        x={device.position.x * TILE_SIZE}
        y={device.position.y * TILE_SIZE}
        width={TILE_SIZE}
        height={TILE_SIZE}
        fill="#1a237e"
        stroke="#80d8ff"
        strokeWidth={2}
        rx={14}
      />
      {/* Smart Hub: glowing core + stylized arcs */}
      <g transform={`translate(${device.position.x * TILE_SIZE + TILE_SIZE / 2}, ${device.position.y * TILE_SIZE + TILE_SIZE / 2})`}>
        {/* Glow */}
        <circle cx={0} cy={0} r={18} fill="#00e5ff" opacity={0.18} />
        {/* Main hub */}
        <circle cx={0} cy={0} r={12} fill="#039be5" stroke="#fff" strokeWidth={2} />
        {/* Center dot */}
        <circle cx={0} cy={0} r={4.5} fill="#fff" stroke="#00e5ff" strokeWidth={1.5} />
        {/* Signal arcs */}
        <path d="M -10 7 Q 0 0 10 7" stroke="#fff" strokeWidth={2.5} fill="none" />
        <path d="M -13 13 Q 0 6 13 13" stroke="#80d8ff" strokeWidth={2} fill="none" />
        <path d="M -16 19 Q 0 12 16 19" stroke="#00e5ff" strokeWidth={1.5} fill="none" />
      </g>
    </g>
  );
};
