import React, { useState, useEffect, useRef } from 'react';
import { PlayerPosition, PlayerOrientation, PlayerActivityState } from './usePlayerMovement';

interface PlayerCharacterSVGProps {
  position: PlayerPosition; // Grid position
  orientation: PlayerOrientation; // Grid orientation
  activityState: PlayerActivityState; // Grid activity state
  tileSize: number;
  color?: string;
  transitionSpeed?: number; // Percentage of distance to cover per frame (0 to 1)
}

const PlayerCharacterSVG: React.FC<PlayerCharacterSVGProps> = ({ 
  position, 
  orientation, 
  activityState, 
  tileSize, 
  color = 'blue',
  transitionSpeed = 0.15 // Default speed for smooth transition
}) => {
  // Calculate target pixel coordinates for the center of the tile
  const targetPixelX = position.x * tileSize + tileSize / 2;
  const targetPixelY = position.y * tileSize + tileSize / 2;

  const [visualPosition, setVisualPosition] = useState({ x: targetPixelX, y: targetPixelY });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Initialize visual position when component mounts or tileSize changes
    setVisualPosition({ x: targetPixelX, y: targetPixelY });
  }, [targetPixelX, targetPixelY, tileSize]); // Rerun if target or tileSize changes directly

  useEffect(() => {
    const animate = () => {
      setVisualPosition(prevVisualPos => {
        const dx = targetPixelX - prevVisualPos.x;
        const dy = targetPixelY - prevVisualPos.y;

        // If very close, snap to target and stop animation
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
          }
          return { x: targetPixelX, y: targetPixelY };
        }

        // Move a fraction of the distance towards the target
        const newX = prevVisualPos.x + dx * transitionSpeed;
        const newY = prevVisualPos.y + dy * transitionSpeed;
        
        animationFrameId.current = requestAnimationFrame(animate);
        return { x: newX, y: newY };
      });
    };

    // Start animation if not already at target
    if (visualPosition.x !== targetPixelX || visualPosition.y !== targetPixelY) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [targetPixelX, targetPixelY, transitionSpeed, visualPosition.x, visualPosition.y]); // Dependencies for re-triggering animation logic

  const radius = tileSize * 0.4;

  // Calculate points for an orientation triangle
  let trianglePoints = '';
  const triangleSize = radius * 0.6;
  // Visual cues based on activityState
  let triangleFill = "#fff";
  let triangleOpacity = 0.7;

  switch (activityState) {
    case 'walking':
      triangleOpacity = 0.4;
      break;
    case 'interacting':
      triangleOpacity = 1.0;
      triangleFill = "#f0f0f0"; // Slightly brighter for interaction
      break;
    case 'idle':
    default:
      // Default opacity and fill are already set
      break;
  }

  switch (orientation) {
    case 'up':
      trianglePoints = `0,${-radius * 0.7} ${triangleSize / 2},${-radius * 0.7 + triangleSize} ${-triangleSize / 2},${-radius * 0.7 + triangleSize}`;
      break;
    case 'down':
      trianglePoints = `0,${radius * 0.7} ${triangleSize / 2},${radius * 0.7 - triangleSize} ${-triangleSize / 2},${radius * 0.7 - triangleSize}`;
      break;
    case 'left':
      trianglePoints = `${-radius * 0.7},0 ${-radius * 0.7 + triangleSize},${triangleSize / 2} ${-radius * 0.7 + triangleSize},${-triangleSize / 2}`;
      break;
    case 'right':
      trianglePoints = `${radius * 0.7},0 ${radius * 0.7 - triangleSize},${triangleSize / 2} ${radius * 0.7 - triangleSize},${-triangleSize / 2}`;
      break;
  }

  return (
    <g transform={`translate(${visualPosition.x}, ${visualPosition.y})`}>
      {/* Soft shadow */}
      <ellipse cx={0} cy={radius * 0.85} rx={radius * 0.75} ry={radius * 0.25} fill="#222" opacity={0.16} />

      {/* Legs */}
      <ellipse cx={-radius * 0.23} cy={radius * 0.55} rx={radius * 0.17} ry={radius * 0.34} fill="#90caf9" opacity={0.85}/>
      <ellipse cx={radius * 0.23} cy={radius * 0.55} rx={radius * 0.17} ry={radius * 0.34} fill="#90caf9" opacity={0.85}/>

      {/* Body */}
      <rect x={-radius * 0.42} y={-radius * 0.1} width={radius * 0.84} height={radius * 0.95} rx={radius * 0.38} fill={color} stroke="#1976d2" strokeWidth={1.5}/>
      {/* Torso accent */}
      <rect x={-radius * 0.22} y={radius * 0.25} width={radius * 0.44} height={radius * 0.27} rx={radius * 0.11} fill="#e3f2fd" />

      {/* Arms */}
      <ellipse cx={-radius * 0.60} cy={radius * 0.18} rx={radius * 0.17} ry={radius * 0.37} fill="#bbdefb" />
      <ellipse cx={radius * 0.60} cy={radius * 0.18} rx={radius * 0.17} ry={radius * 0.37} fill="#bbdefb" />

      {/* Head */}
      <circle cx={0} cy={-radius * 0.62} r={radius * 0.38} fill="#fff" stroke="#1976d2" strokeWidth={2}/>
      {/* Face accent (smile) */}
      <path d={`M${-radius*0.13},${-radius*0.50} Q0,${-radius*0.38} ${radius*0.13},${-radius*0.50}`} stroke="#90caf9" strokeWidth={1.2} fill="none" />
      {/* Eyes */}
      <circle cx={-radius*0.10} cy={-radius*0.65} r={radius*0.045} fill="#1976d2"/>
      <circle cx={radius*0.10} cy={-radius*0.65} r={radius*0.045} fill="#1976d2"/>

      {/* Direction triangle (subtle) */}
      <polygon points={trianglePoints} fill={triangleFill} opacity={triangleOpacity} />
    </g>
  );
};

export default PlayerCharacterSVG;
