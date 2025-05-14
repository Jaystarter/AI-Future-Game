import React from 'react';
const TILE_SIZE = 48;

const PersonalMatterFabricatorSVG: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    {/* Shadow */}
    <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE*0.87} rx={TILE_SIZE*0.34} ry={TILE_SIZE*0.11} fill="#00bfae" opacity={0.13}/>
    {/* Main body */}
    <rect x={x + 10} y={y + 14} width={TILE_SIZE - 20} height={TILE_SIZE * 0.46} rx={TILE_SIZE*0.10} fill="#232e36" stroke="#00e676" strokeWidth={2}/>
    {/* Glass chamber */}
    <rect x={x + 16} y={y + 18} width={TILE_SIZE - 32} height={TILE_SIZE * 0.28} rx={TILE_SIZE*0.06} fill="#b9f6ca" opacity={0.28} stroke="#00e676" strokeWidth={1}/>
    {/* Fabricated object */}
    <ellipse cx={x + TILE_SIZE/2} cy={y + 35} rx={TILE_SIZE*0.09} ry={TILE_SIZE*0.04} fill="#fff176" stroke="#cddc39" strokeWidth={1}/>
    {/* Holographic controls */}
    <rect x={x + 20} y={y + 44} width={TILE_SIZE*0.18} height={TILE_SIZE*0.07} rx={TILE_SIZE*0.02} fill="#00e676" opacity={0.55}/>
    <rect x={x + 32} y={y + 44} width={TILE_SIZE*0.11} height={TILE_SIZE*0.07} rx={TILE_SIZE*0.02} fill="#00e5ff" opacity={0.45}/>
  </g>
);

export default PersonalMatterFabricatorSVG;
