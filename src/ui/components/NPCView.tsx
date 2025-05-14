import React from 'react';
import { InteractableObject } from '../../game/interactionTypes';
import { NPCData } from '../../game/NPC';

const TILE_SIZE = 48;

export const NPCView: React.FC<{ npc: InteractableObject }> = ({ npc }) => {
  const npcDetails = npc.data as NPCData;
  return (
  <g>
    <rect
      x={npc.position.x * TILE_SIZE}
      y={npc.position.y * TILE_SIZE}
      width={TILE_SIZE}
      height={TILE_SIZE}
      fill="#e27d60" // A distinct color for NPCs for now
      stroke="#fff"
      strokeWidth={2}
      rx={8}
    />
    {/* SVG Person Icon - Modern, friendly, readable */}
    <g transform={`translate(${npc.position.x * TILE_SIZE + TILE_SIZE / 2}, ${npc.position.y * TILE_SIZE + TILE_SIZE / 2})`}>
      {/* Subtle shadow */}
      <ellipse cx={0} cy={18} rx={13} ry={5} fill="#b3e5fc" opacity={0.4} />
      {/* Head */}
      <circle cx={0} cy={-9} r={8} fill="#fff" stroke="#4fc3f7" strokeWidth={2}/>
      {/* Shoulders/body */}
      <rect x={-11} y={2} width={22} height={14} rx={8} fill="#fff" stroke="#4fc3f7" strokeWidth={2}/>
      {/* Arms (curved) */}
      <path d="M -11 10 Q -13 17 0 17 Q 13 17 11 10" stroke="#4fc3f7" strokeWidth={2} fill="#fff" />
      {/* Torso accent */}
      <rect x={-6} y={6} width={12} height={7} rx={3} fill="#e3f2fd" />
    </g>
  </g>
  );
};
