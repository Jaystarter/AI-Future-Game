import React from 'react';
import { NPC } from '../../game/NPC';

const TILE_SIZE = 48;

export const NPCView: React.FC<{ npc: NPC }> = ({ npc }) => (
  <g>
    <rect
      x={npc.x * TILE_SIZE}
      y={npc.y * TILE_SIZE}
      width={TILE_SIZE}
      height={TILE_SIZE}
      fill="#e27d60"
      stroke="#fff"
      strokeWidth={2}
      rx={8}
    />
    <text
      x={npc.x * TILE_SIZE + TILE_SIZE / 2}
      y={npc.y * TILE_SIZE + TILE_SIZE / 2 + 6}
      textAnchor="middle"
      fontFamily="monospace"
      fontSize="16"
      fill="#fff"
    >
      {npc.name[0]}
    </text>
  </g>
);
