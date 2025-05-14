import React from 'react';
const TILE_SIZE = 48;

const ImmersiaVRLoungeChairSVG: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    {/* Soft shadow */}
    <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE*0.85} rx={TILE_SIZE*0.36} ry={TILE_SIZE*0.12} fill="#7c4dff" opacity={0.18}/>
    {/* Pod base */}
    <rect x={x + 8} y={y + 20} width={TILE_SIZE - 16} height={TILE_SIZE * 0.38} rx={TILE_SIZE * 0.18} fill="#2d2d3a" stroke="#b39ddb" strokeWidth={2}/>
    {/* Reclined seat */}
    <rect x={x + 14} y={y + 26} width={TILE_SIZE - 28} height={TILE_SIZE * 0.22} rx={TILE_SIZE * 0.09} fill="#9575cd" stroke="#fff" strokeWidth={1}/>
    {/* Dome (semi-transparent) */}
    <ellipse cx={x + TILE_SIZE/2} cy={y + 24} rx={TILE_SIZE*0.22} ry={TILE_SIZE*0.18} fill="#b388ff" opacity={0.43} />
    <ellipse cx={x + TILE_SIZE/2} cy={y + 24} rx={TILE_SIZE*0.18} ry={TILE_SIZE*0.14} fill="#fff" opacity={0.13} />
    {/* Glowing accent ring */}
    <ellipse cx={x + TILE_SIZE/2} cy={y + 36} rx={TILE_SIZE*0.22} ry={TILE_SIZE*0.09} fill="#00e5ff" opacity={0.19} />
    {/* Control panel */}
    <rect x={x + 32} y={y + 38} width={TILE_SIZE*0.16} height={TILE_SIZE*0.08} rx={TILE_SIZE*0.03} fill="#00e5ff" opacity={0.7}/>
  </g>
);

export default ImmersiaVRLoungeChairSVG;
