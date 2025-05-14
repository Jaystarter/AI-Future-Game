import React from 'react';

const TILE_SIZE = 48;
const PERIMETER = TILE_SIZE * 4; // 192
const LINE_LENGTH = TILE_SIZE; // Length of the moving line segment
const GAP_LENGTH = PERIMETER - LINE_LENGTH; // 192 - 48 = 144

interface InteractionHighlightSVGProps {
  x: number; // Tile X
  y: number; // Tile Y
}

const InteractionHighlightSVG: React.FC<InteractionHighlightSVGProps> = ({ x, y }) => {
  const rectX = x * TILE_SIZE;
  const rectY = y * TILE_SIZE;

  return (
    <g className="interaction-highlight-outline">
      <style>
        {`
          @keyframes rotate-outline {
            0% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: -${PERIMETER};
            }
          }
          .rotating-line {
            fill: none;
            stroke: #00e5ff; /* Bright cyan */
            stroke-width: 3px;
            stroke-dasharray: ${LINE_LENGTH} ${GAP_LENGTH}; /* Line segment and gap */
            animation: rotate-outline 2s linear infinite;
            filter: drop-shadow(0 0 2px #00e5ff) drop-shadow(0 0 4px #00b8d4); /* Subtle glow */
          }
        `}
      </style>
      <rect
        className="rotating-line"
        x={rectX + 1.5} // Offset by half stroke-width for alignment
        y={rectY + 1.5} // Offset by half stroke-width for alignment
        width={TILE_SIZE - 3} // Adjust for stroke width to keep within tile bounds
        height={TILE_SIZE - 3} // Adjust for stroke width
        rx="3" // Slightly rounded corners for a softer look
      />
    </g>
  );
};

export default InteractionHighlightSVG;
