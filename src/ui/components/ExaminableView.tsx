import React from 'react';
import { InteractableObject } from '../../game/interactionTypes';
import { ExaminableObjectDetails } from '../../game/examinableObject';

const TILE_SIZE = 48;

// Helper function to render specific SVGs based on spriteKey
const renderSprite = (spriteKey: string, itemX: number, itemY: number) => {
  const x = itemX * TILE_SIZE;
  const y = itemY * TILE_SIZE;

  switch (spriteKey) {
    case 'couch_2025':
      return (
        <g key={`couch-${spriteKey}-${itemX}-${itemY}`}>
          <rect x={x + 2} y={y + 8} width={TILE_SIZE - 4} height={TILE_SIZE * 0.6} rx={5} fill="#8B4513" stroke="#5D2906" strokeWidth={1.5} />
          <rect x={x + 5} y={y + 10} width={(TILE_SIZE - 10) / 2 - 1} height={TILE_SIZE * 0.6 - 8} rx={3} fill="#A0522D" />
          <rect x={x + 5 + (TILE_SIZE - 10) / 2 + 2} y={y + 10} width={(TILE_SIZE - 10) / 2 - 1} height={TILE_SIZE * 0.6 - 8} rx={3} fill="#A0522D" />
          <rect x={x + 2} y={y + 6} width={TILE_SIZE - 4} height={5} fill="#8B4513" rx={2}/> {/* Backrest */}
        </g>
      );
    case 'poster_2025':
      return (
        <g key={`poster-${spriteKey}-${itemX}-${itemY}`}>
          {/* Modern framed poster */}
          <rect x={x + 12} y={y + 6} width={TILE_SIZE - 24} height={TILE_SIZE - 12} rx={3} fill="#fff" stroke="#bdbdbd" strokeWidth={2}/>
          <rect x={x + 16} y={y + 10} width={TILE_SIZE - 32} height={TILE_SIZE - 24} rx={2} fill="#e3e3fa" />
          {/* Abstract art */}
          <circle cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2} r={6} fill="#6a5acd" />
          <rect x={x + 24} y={y + 24} width={8} height={3} fill="#ffb347" rx={1}/>
        </g>
      );
    case 'book_antique':
      return (
        <g key={`book-${spriteKey}-${itemX}-${itemY}`}>
          {/* Open antique book */}
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 7} rx={14} ry={8} fill="#fff8dc" stroke="#bfa76a" strokeWidth={2}/>
          <path d={`M${x + 18} ${y + 30} Q${x + 24} ${y + 20},${x + 30} ${y + 30}`} fill="none" stroke="#bfa76a" strokeWidth={1}/>
          {/* Gold edges */}
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 7} rx={14} ry={8} fill="none" stroke="#ffd700" strokeWidth={1}/>
        </g>
      );
    case 'kitchenette_2025':
      return (
        <g key={`kitchenette-${spriteKey}-${itemX}-${itemY}`}>
          {/* Countertop */}
          <rect x={x + 2} y={y + 20} width={TILE_SIZE - 4} height={TILE_SIZE / 3} fill="#C0C0C0" stroke="#808080" strokeWidth={1} />
          {/* Sink */}
          <rect x={x + 6} y={y + 22} width={TILE_SIZE / 3} height={TILE_SIZE / 4 - 2} fill="#E0E0E0" rx={2} />
          {/* Faucet */}
          <rect x={x + 6 + (TILE_SIZE / 6) - 1} y={y + 16} width={3} height={6} fill="#A9A9A9" />
          {/* Cabinet/Stove */}
          <rect x={x + (TILE_SIZE / 2)} y={y + 22} width={TILE_SIZE / 3} height={TILE_SIZE / 4 -2} fill="#708090" rx={2}/>
          <circle cx={x + (TILE_SIZE / 2) + (TILE_SIZE / 6)} cy={y+25} r={3} fill="#505050" />
        </g>
      );
    case 'book_faded':
      return (
        <g key={`book-faded-${itemX}-${itemY}`}>
          {/* Closed, worn book */}
          <rect x={x + 14} y={y + 20} width={20} height={8} rx={2} fill="#bdb76b" stroke="#8b8000" strokeWidth={1}/>
          <rect x={x + 16} y={y + 22} width={16} height={4} fill="#f5f5dc" />
        </g>
      );
    case 'kitchenette_2025':
      return (
        <g key={`kitchenette-${spriteKey}-${itemX}-${itemY}`}>
          {/* Small kitchenette counter */}
          <rect x={x + 8} y={y + 20} width={TILE_SIZE - 16} height={TILE_SIZE / 3} fill="#b0bec5" stroke="#78909c" strokeWidth={1} />
          {/* Sink */}
          <rect x={x + 10} y={y + 24} width={8} height={6} fill="#e0e0e0" rx={2} />
          {/* Stove */}
          <rect x={x + 28} y={y + 24} width={8} height={6} fill="#616161" rx={1} />
          {/* Knobs */}
          <circle cx={x + 30} cy={y + 28} r={1.2} fill="#fff" />
          <circle cx={x + 33} cy={y + 28} r={1.2} fill="#fff" />
        </g>
      );
    default:
      // Fallback for unknown spriteKey or if more generic handling is needed
      return (
        <g>
          <rect x={x} y={y} width={TILE_SIZE} height={TILE_SIZE} fill="#FFA07A" />
          <text x={x + TILE_SIZE / 2} y={y + TILE_SIZE / 2} dominantBaseline="middle" textAnchor="middle" fontSize="10" fill="#000">?</text>
        </g>
      );
  }
};

export const ExaminableView: React.FC<{ examinable: InteractableObject }> = ({ examinable }) => {
  const details = examinable.data as ExaminableObjectDetails;

  if (details.spriteKey) {
    return renderSprite(details.spriteKey, examinable.position.x, examinable.position.y);
  }

  // Default fallback if no spriteKey
  return (
    <g>
      <rect
        x={examinable.position.x * TILE_SIZE}
        y={examinable.position.y * TILE_SIZE}
        width={TILE_SIZE}
        height={TILE_SIZE}
        fill="#6c757d"
        stroke="#fff"
        strokeWidth={2}
        rx={8}
      />
      {/* Modern document/file icon */}
      <g transform={`translate(${examinable.position.x * TILE_SIZE + TILE_SIZE / 2 - 12}, ${examinable.position.y * TILE_SIZE + TILE_SIZE / 2 - 16})`}>
        {/* File base */}
        <rect x={0} y={0} width={24} height={32} rx={3} fill="#fff" stroke="#bdbdbd" strokeWidth={1.5}/>
        {/* Folded corner */}
        <polygon points="20,0 24,0 24,8" fill="#f0f0f0" />
        {/* Accent bar */}
        <rect x={3} y={5} width={18} height={5} rx={1.5} fill="#1976d2" />
        {/* Lines for text */}
        <rect x={3} y={13} width={14} height={3} rx={1} fill="#bdbdbd" />
        <rect x={3} y={18} width={10} height={3} rx={1} fill="#e0e0e0" />
      </g>
    </g>
  );
};
