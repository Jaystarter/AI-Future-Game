import React from 'react';
const TILE_SIZE = 48;

const KaiKaiHologramSVG: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    {/* Projector base */}
    <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE*0.87} rx={TILE_SIZE*0.22} ry={TILE_SIZE*0.07} fill="#00e5ff" opacity={0.22}/>
    <rect x={x + 16} y={y + 40} width={TILE_SIZE - 32} height={TILE_SIZE*0.10} rx={TILE_SIZE*0.03} fill="#263238" stroke="#00e5ff" strokeWidth={1.2} />
    {/* Hologram beam */}
    <ellipse cx={x + TILE_SIZE/2} cy={y + 36} rx={TILE_SIZE*0.18} ry={TILE_SIZE*0.09} fill="#00e5ff" opacity={0.11}/>
    <rect x={x + 22} y={y + 20} width={TILE_SIZE - 44} height={TILE_SIZE*0.42} rx={TILE_SIZE*0.10} fill="#00e5ff" opacity={0.10}/>
    {/* Main holographic body */}
    <ellipse cx={x + TILE_SIZE/2} cy={y + 26} rx={TILE_SIZE*0.14} ry={TILE_SIZE*0.18} fill="#b3e5fc" opacity={0.65} />
    {/* Head */}
    <ellipse cx={x + TILE_SIZE/2} cy={y + 16} rx={TILE_SIZE*0.10} ry={TILE_SIZE*0.11} fill="#e1f5fe" opacity={0.85} stroke="#00e5ff" strokeWidth={1.2}/>
    {/* Face accents */}
    <ellipse cx={x + TILE_SIZE/2 - 4} cy={y + 15} rx={1.2} ry={1.7} fill="#039be5" opacity={0.8}/>
    <ellipse cx={x + TILE_SIZE/2 + 4} cy={y + 15} rx={1.2} ry={1.7} fill="#039be5" opacity={0.8}/>
    <path d={`M${x + TILE_SIZE/2 - 3},${y + 19} Q${x + TILE_SIZE/2},${y + 21} ${x + TILE_SIZE/2 + 3},${y + 19}`} stroke="#039be5" strokeWidth={1.1} fill="none" />
    {/* Floating hologram particles */}
    <circle cx={x + TILE_SIZE/2 - 10} cy={y + 8} r={1.5} fill="#00e5ff" opacity={0.4}/>
    <circle cx={x + TILE_SIZE/2 + 11} cy={y + 11} r={1.1} fill="#00e5ff" opacity={0.22}/>
    <circle cx={x + TILE_SIZE/2 + 8} cy={y + 31} r={1.3} fill="#b3e5fc" opacity={0.18}/>
    <circle cx={x + TILE_SIZE/2 - 12} cy={y + 28} r={0.9} fill="#b3e5fc" opacity={0.18}/>
  </g>
);

export default KaiKaiHologramSVG;
