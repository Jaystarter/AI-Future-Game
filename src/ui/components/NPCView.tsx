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
      {/* Soft shadow */}
      <ellipse cx={0} cy={TILE_SIZE * 0.35} rx={TILE_SIZE * 0.27} ry={TILE_SIZE * 0.08} fill="#b3e5fc" opacity={0.22} />

      {/* Legs */}
      <ellipse cx={-TILE_SIZE * 0.09} cy={TILE_SIZE * 0.20} rx={TILE_SIZE * 0.07} ry={TILE_SIZE * 0.13} fill="#f9a66c" opacity={0.9}/>
      <ellipse cx={TILE_SIZE * 0.09} cy={TILE_SIZE * 0.20} rx={TILE_SIZE * 0.07} ry={TILE_SIZE * 0.13} fill="#f9a66c" opacity={0.9}/>

      {/* Body */}
      <rect x={-TILE_SIZE * 0.17} y={-TILE_SIZE * 0.04} width={TILE_SIZE * 0.34} height={TILE_SIZE * 0.36} rx={TILE_SIZE * 0.15} fill="#e27d60" stroke="#b3501a" strokeWidth={2}/>
      {/* Torso accent */}
      <rect x={-TILE_SIZE * 0.09} y={TILE_SIZE * 0.10} width={TILE_SIZE * 0.18} height={TILE_SIZE * 0.10} rx={TILE_SIZE * 0.04} fill="#fff3e0" />

      {/* Arms */}
      <ellipse cx={-TILE_SIZE * 0.25} cy={TILE_SIZE * 0.06} rx={TILE_SIZE * 0.07} ry={TILE_SIZE * 0.15} fill="#f9a66c" />
      <ellipse cx={TILE_SIZE * 0.25} cy={TILE_SIZE * 0.06} rx={TILE_SIZE * 0.07} ry={TILE_SIZE * 0.15} fill="#f9a66c" />

      {/* Head */}
      <circle cx={0} cy={-TILE_SIZE * 0.23} r={TILE_SIZE * 0.13} fill="#fff" stroke="#b3501a" strokeWidth={2}/>
      {/* Face accent (smile) */}
      <path d={`M${-TILE_SIZE*0.045},${-TILE_SIZE*0.18} Q0,${-TILE_SIZE*0.15} ${TILE_SIZE*0.045},${-TILE_SIZE*0.18}`} stroke="#f9a66c" strokeWidth={1.2} fill="none" />
      {/* Eyes */}
      <circle cx={-TILE_SIZE*0.04} cy={-TILE_SIZE*0.25} r={TILE_SIZE*0.018} fill="#b3501a"/>
      <circle cx={TILE_SIZE*0.04} cy={-TILE_SIZE*0.25} r={TILE_SIZE*0.018} fill="#b3501a"/>
    </g>
  </g>
  );
};
