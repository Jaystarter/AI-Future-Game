import React from 'react';
import { InteractableObject } from '../../game/interactionTypes';
import { SmartDeviceDetails } from '../../game/smartDevice';
import ImmersiaVRLoungeChairSVG from './ImmersiaVRLoungeChairSVG';
import PersonalMatterFabricatorSVG from './PersonalMatterFabricatorSVG';
import KaiKaiHologramSVG from './KaiKaiHologramSVG';

const TILE_SIZE = 48;

// Helper function to render specific SVGs based on spriteKey
const renderSprite = (spriteKey: string, itemX: number, itemY: number) => {
  const x = itemX * TILE_SIZE;
  const y = itemY * TILE_SIZE;

  switch (spriteKey) {
    case 'vr_lounge_chair_2070':
      return <ImmersiaVRLoungeChairSVG x={itemX * TILE_SIZE} y={itemY * TILE_SIZE} />;
    case 'personal_fabricator_2070':
      return <PersonalMatterFabricatorSVG x={itemX * TILE_SIZE} y={itemY * TILE_SIZE} />;
    case 'kai_kai_hologram_2070':
      return <KaiKaiHologramSVG x={itemX * TILE_SIZE} y={itemY * TILE_SIZE} />;
    // --- INFOTAINMENT WALL ---
    case 'infotainment_wall_2030':
      return (
        <g key={`infotainment-2030-${itemX}-${itemY}`}>
          {/* Sleek, wall-mounted infotainment display for 2030 */}
          <rect x={x + 8} y={y + 12} width={TILE_SIZE - 16} height={TILE_SIZE - 24} rx={5} fill="#181d23" stroke="#00bcd4" strokeWidth={2}/>
          <rect x={x + 12} y={y + 16} width={TILE_SIZE - 24} height={TILE_SIZE - 32} rx={3} fill="#00bcd4" opacity={0.13}/>
          <rect x={x + 12} y={y + 30} width={TILE_SIZE - 24} height={6} rx={2} fill="#fff" opacity={0.08}/>
          <rect x={x + 12} y={y + 18} width={TILE_SIZE - 24} height={5} rx={2} fill="#00e5ff" opacity={0.23}/>
        </g>
      );
    case 'infotainment_wall_2050': // Was infotainment_wall_2040, now matching explicit 2050
      return (
        <g key={`infotainment-2050-${itemX}-${itemY}`}> 
          {/* Futuristic, curved display for 2050 (formerly 2040) */}
          <rect x={x + 6} y={y + 10} width={TILE_SIZE - 12} height={TILE_SIZE - 20} rx={10} fill="#00bcd4" stroke="#009688" strokeWidth={2}/>
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 2} rx={16} ry={8} fill="#fff" opacity={0.09}/>
          <rect x={x + 14} y={y + 18} width={TILE_SIZE - 28} height={8} rx={4} fill="#fff" opacity={0.16}/>
        </g>
      );
    case 'infotainment_wall_2050_original_style': // Keeping the original 2050 style under a new key if needed, or remove if new 2050 is sufficient
      return (
        <g key={`infotainment-2050-alt-${itemX}-${itemY}`}>
          {/* Transparent, edge-lit display for 2050 */}
          <rect x={x + 8} y={y + 12} width={TILE_SIZE - 16} height={TILE_SIZE - 24} rx={12} fill="#00e5ff" opacity={0.13} stroke="#00bcd4" strokeWidth={2}/>
          <rect x={x + 13} y={y + 18} width={TILE_SIZE - 26} height={TILE_SIZE - 36} rx={5} fill="#fff" opacity={0.10}/>
        </g>
      );
    case 'infotainment_wall_2070':
      return (
        <g key={`infotainment-2070-${itemX}-${itemY}`}>
          {/* Holographic floating display for 2070 */}
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 2} rx={18} ry={12} fill="#7c4dff" opacity={0.22}/>
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 2} rx={14} ry={8} fill="#fff" opacity={0.14}/>
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 2} rx={10} ry={5} fill="#7c4dff" opacity={0.14}/>
        </g>
      );

    // --- SMART SPEAKER MINI ---
    case 'smartspeaker_mini_2030':
      return (
        <g key={`smartspeaker-2030-${itemX}-${itemY}`}>
          {/* Compact, modern smart speaker for 2030 */}
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 7} rx={10} ry={7} fill="#f5f5f5" stroke="#00bcd4" strokeWidth={2}/>
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 4} rx={7} ry={4} fill="#b0bec5" opacity={0.6}/>
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 7} rx={8} ry={5} fill="#00e5ff" opacity={0.13}/>
          <path d={`M${x + 16} ${y + 40} Q${x + 24} ${y + 44},${x + 32} ${y + 40}`} stroke="#00bcd4" strokeWidth={1.2} fill="none" />
        </g>
      );
    case 'smartspeaker_mini_2050': // Was smartspeaker_mini_2040, now matching explicit 2050
      return (
        <g key={`smartspeaker-2050-${itemX}-${itemY}`}> 
          {/* Organic, glowing speaker for 2050 (formerly 2040) */}
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 7} rx={12} ry={8} fill="#b2dfdb" stroke="#00bcd4" strokeWidth={2}/>
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 4} rx={8} ry={5} fill="#009688" opacity={0.5}/>
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 7} rx={10} ry={6} fill="#00e5ff" opacity={0.16}/>
        </g>
      );
    case 'smartspeaker_mini_2050_original_style': // Keeping the original 2050 style under a new key if needed
      return (
        <g key={`smartspeaker-2050-alt-${itemX}-${itemY}`}>
          {/* Floating, ringed speaker for 2050 */}
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 8} rx={13} ry={9} fill="#fff" opacity={0.18}/>
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 7} rx={10} ry={7} fill="#b2dfdb" stroke="#00bcd4" strokeWidth={2}/>
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 4} rx={7} ry={4} fill="#009688" opacity={0.5}/>
        </g>
      );
    case 'smartspeaker_mini_2070':
      return (
        <g key={`smartspeaker-2070-${itemX}-${itemY}`}>
          {/* Holographic orb for 2070 */}
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 8} rx={14} ry={10} fill="#7c4dff" opacity={0.22}/>
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 7} rx={11} ry={8} fill="#fff" opacity={0.18}/>
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 4} rx={9} ry={6} fill="#7c4dff" opacity={0.14}/>
        </g>
      );

    // --- LEARNSPHERE AI TUTOR ---
    case 'ai_tutor_screen_2030':
      return (
        <g key={`ai-tutor-2030-${itemX}-${itemY}`}>
          {/* 2030: Sleek tablet on a stand */}
          <rect x={x + 10} y={y + 14} width={TILE_SIZE - 20} height={TILE_SIZE - 28} rx={6} fill="#e3f2fd" stroke="#1976d2" strokeWidth={2}/>
          <rect x={x + 14} y={y + 18} width={TILE_SIZE - 28} height={TILE_SIZE - 36} rx={3} fill="#1976d2" opacity={0.12}/>
          <rect x={x + 19} y={y + 38} width={TILE_SIZE - 38} height={4} rx={2} fill="#1976d2" opacity={0.13}/>
        </g>
      );
    case 'ai_tutor_screen_2050': // Was ai_tutor_screen_2040, now matching explicit 2050
      return (
        <g key={`aitutor-2050-${itemX}-${itemY}`}> 
          {/* Interactive, slightly larger screen for 2050 (formerly 2040) */}
          <rect x={x + 7} y={y + 10} width={TILE_SIZE - 14} height={TILE_SIZE - 20} rx={8} fill="#002633" stroke="#0097a7" strokeWidth={2}/>
          <rect x={x + 11} y={y + 14} width={TILE_SIZE - 22} height={TILE_SIZE - 28} rx={5} fill="#00b8d4" opacity={0.1}/>
          <circle cx={x + TILE_SIZE/2} cy={y + TILE_SIZE - 10} r={4} fill="#0097a7"/>
        </g>
      );
    case 'ai_tutor_screen_2050_original_style': // Keeping the original 2050 style under a new key if needed
      return (
        <g key={`aitutor-2050-alt-${itemX}-${itemY}`}>
          {/* Dynamic, curved screen for 2050 */}
          <rect x={x + 12} y={y + 18} width={TILE_SIZE - 24} height={TILE_SIZE - 34} rx={8} fill="#fff" opacity={0.09} stroke="#1976d2" strokeWidth={2}/>
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 2} rx={12} ry={8} fill="#1976d2" opacity={0.10}/>
        </g>
      );
    case 'ai_tutor_screen_2070':
      return (
        <g key={`ai-tutor-2070-${itemX}-${itemY}`}>
          {/* 2070: Holographic spinning ring */}
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 2} rx={18} ry={12} fill="#7c4dff" opacity={0.22}/>
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 2} rx={14} ry={8} fill="#fff" opacity={0.14}/>
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2 + 2} rx={10} ry={5} fill="#7c4dff" opacity={0.14}/>
        </g>
      );

    // --- ADDITIONAL DEVICES ---
    // Add similar SVG cases for each spriteKey found in sampleSmartDevices for each period,
    // using period-appropriate colors, shapes, and visual motifs.
    // Example for 'smart_fridge_2030', 'smart_fridge_2040', ... etc.
    // (Add more cases below as needed)

    case 'adaptive_walls_control_2050': // Was _2040
      return (
        <g key={`adaptivewalls-${spriteKey}-${itemX}-${itemY}`}>         
          <rect x={x + 10} y={y + 10} width={TILE_SIZE - 20} height={TILE_SIZE - 20} rx={5} fill="#4a4a4a" stroke="#00ffff" strokeWidth={2}/>
          <circle cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2} r={8} fill="#00ffff" opacity={0.3}/>
        </g>
      );
    case 'health_pod_2050': // Was _2040
      return (
        <g key={`healthpod-${spriteKey}-${itemX}-${itemY}`}>          
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2} rx={16} ry={22} fill="#e0f7fa" stroke="#00bcd4" strokeWidth={2}/>
          <rect x={x + TILE_SIZE/2 - 8} y={y + 10} width={16} height={TILE_SIZE - 20} fill="#b2ebf2" opacity={0.5} rx={4}/>
        </g>
      );
    case 'morphing_furniture_control_2050': // Was _2040
      return (
        <g key={`morphingfurniture-${spriteKey}-${itemX}-${itemY}`}>          
          <rect x={x + 10} y={y + 15} width={TILE_SIZE - 20} height={TILE_SIZE - 30} rx={8} fill="#78909c" stroke="#cfd8dc" strokeWidth={2}/>
          <circle cx={x + TILE_SIZE/2} cy={y + 20} r={5} fill="#cfd8dc" opacity={0.7}/>
        </g>
      );
    case 'emotion_system_control_2050': // Was _2040
      return (
        <g key={`emotionsystem-${spriteKey}-${itemX}-${itemY}`}>          
          <circle cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2} r={15} fill="#3f51b5" stroke="#7986cb" strokeWidth={2}/>
          <path d={`M ${x+18},${y+18} A 10 10 0 1 1 ${x+30},${y+30}`} stroke="#c5cae9" strokeWidth="2" fill="none"/>
        </g>
      );
    case 'chore_calendar_2050': // Was _2040
      return (
        <g key={`chorecalendar-${spriteKey}-${itemX}-${itemY}`}>          
          <rect x={x + 8} y={y + 8} width={TILE_SIZE - 16} height={TILE_SIZE - 16} rx={4} fill="#fff9c4" stroke="#fff176" strokeWidth={2}/>
          <rect x={x+12} y={y+12} width={TILE_SIZE-24} height={5} fill="#fff176" opacity={0.8}/>
        </g>
      );
    case 'ai_training_generator_2050': // Was _2040
      return (
        <g key={`aitraining-${spriteKey}-${itemX}-${itemY}`}>          
          <rect x={x + 7} y={y + 7} width={TILE_SIZE - 14} height={TILE_SIZE - 14} rx={6} fill="#1e88e5" stroke="#64b5f6" strokeWidth={2}/>
          <circle cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2} r={7} fill="#64b5f6" opacity={0.5}/>
        </g>
      );
    case 'ai_project_review_2050': // Was _2040
      return (
        <g key={`aiproject-${spriteKey}-${itemX}-${itemY}`}>          
          <rect x={x + 9} y={y + 9} width={TILE_SIZE - 18} height={TILE_SIZE - 18} rx={3} fill="#f4511e" stroke="#ff8a65" strokeWidth={2}/>
          <rect x={x+15} y={y+15} width={TILE_SIZE-30} height={TILE_SIZE-30} fill="#ff8a65" opacity={0.6}/>
        </g>
      );
    case 'ai_code_ide_2050': // Was _2040
      return (
        <g key={`aicodeide-${spriteKey}-${itemX}-${itemY}`}>          
          <rect x={x + 6} y={y + 12} width={TILE_SIZE - 12} height={TILE_SIZE - 24} rx={5} fill="#333" stroke="#00acc1" strokeWidth={2}/>
          <rect x={x+10} y={y+16} width={TILE_SIZE-20} height={3} fill="#00acc1"/>
        </g>
      );
    case 'digital_twin_access_2050': // Was _2040
      return (
        <g key={`digitaltwin-${spriteKey}-${itemX}-${itemY}`}>          
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2} rx={17} ry={17} fill="#4db6ac" stroke="#80cbc4" strokeWidth={2}/>
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2} rx={10} ry={10} fill="#e0f2f1" opacity={0.7}/>
        </g>
      );

    case 'neural_lace_interface_2070': // Was _2075
      return (
        <g key={`neurallace-${spriteKey}-${itemX}-${itemY}`}>          
          <circle cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2} r={16} fill="#673ab7" stroke="#9575cd" strokeWidth={2}/>
          <path d={`M ${x+16},${y+16} C ${x+24},${y+8} ${x+24},${y+40} ${x+32},${y+32}`} stroke="#d1c4e9" strokeWidth="2" fill="none"/>
        </g>
      );
    case 'food_synthesizer_2070': // Was _2075
      return (
        <g key={`foodsynth-${spriteKey}-${itemX}-${itemY}`}>          
          <rect x={x + 10} y={y + 8} width={TILE_SIZE - 20} height={TILE_SIZE - 16} rx={7} fill="#cddc39" stroke="#dce775" strokeWidth={2}/>
          <circle cx={x + TILE_SIZE/2} cy={y + 16} r={5} fill="#e6ee9c"/>
        </g>
      );
    case 'bio_monitor_full_scan_2070': // Was _2075
      return (
        <g key={`biomonitor-${spriteKey}-${itemX}-${itemY}`}>          
          <rect x={x + 5} y={y + 5} width={TILE_SIZE - 10} height={TILE_SIZE - 10} rx={10} fill="#009688" stroke="#4db6ac" strokeWidth={2}/>
          <path d={`M ${x+12},${y+24} L ${x+20},${y+18} L ${x+28},${y+30} L ${x+36},${y+22}`} stroke="#a7ffeb" strokeWidth="2" fill="none"/>
        </g>
      );
    case 'global_market_simulator_2070': // Was _2075
      return (
        <g key={`globalmarket-${spriteKey}-${itemX}-${itemY}`}>          
          <ellipse cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2} rx={18} ry={14} fill="#2196f3" stroke="#64b5f6" strokeWidth={2}/>
          <path d={`M ${x+15},${y+15} L ${x+33},${y+33} M ${x+15},${y+33} L ${x+33},${y+15}`} stroke="#bbdefb" strokeWidth="2"/>
        </g>
      );
    case 'holographic_collab_interface_2070': // Was _2075
      return (
        <g key={`holocollab-${spriteKey}-${itemX}-${itemY}`}>          
          <rect x={x + 8} y={y + 12} width={TILE_SIZE - 16} height={TILE_SIZE - 24} rx={5} fill="#9c27b0" stroke="#ba68c8" strokeWidth={2} opacity={0.7}/>
          <circle cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2} r={8} fill="#e1bee7" opacity={0.5}/>
        </g>
      );
    case 'ai_scientific_discovery_interface_2070': // Was _2075
      return (
        <g key={`aiscientific-${spriteKey}-${itemX}-${itemY}`}>          
          <rect x={x + 6} y={y + 6} width={TILE_SIZE - 12} height={TILE_SIZE - 12} rx={TILE_SIZE/2 -6} fill="#ffc107" stroke="#ffd54f" strokeWidth={2}/>
          <path d={`M ${x+18},${y+18} L ${x+30},${y+30} M ${x+18},${y+30} L ${x+30},${y+18}`} stroke="#fff8e1" strokeWidth="2"/>
        </g>
      );

    case 'mental_health_ai_2070':
      return (
        <g key={`mental-health-ai-${itemX}-${itemY}`}>
          {/* Panel base */}
          <rect x={x + 10} y={y + 8} width={TILE_SIZE - 20} height={TILE_SIZE - 12} rx={8} fill="#2c3e50" stroke="#7f8c8d" strokeWidth={1.5}/>
          {/* Subtle background gradient for depth */}
          <defs>
            <radialGradient id="gradMentalHealthAI" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" style={{stopColor: '#3498db', stopOpacity: 0.3}} />
              <stop offset="100%" style={{stopColor: '#2c3e50', stopOpacity: 0.1}} />
            </radialGradient>
          </defs>
          <rect x={x + 12} y={y + 10} width={TILE_SIZE - 24} height={TILE_SIZE - 16} rx={6} fill="url(#gradMentalHealthAI)"/>
          
          {/* Central glowing element - abstract waves */}
          <path d={`M${x + 15},${y + 25} Q${x + 22},${y + 20} ${x + 28},${y + 25} T${x + 41},${y + 25}`} stroke="#8eecf5" strokeWidth={2} fill="none" opacity={0.8}>
            <animate attributeName="stroke-dashoffset" values="20;0;20" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
          </path>
          <path d={`M${x + 16},${y + 30} Q${x + 23},${y + 25} ${x + 29},${y + 30} T${x + 40},${y + 30}`} stroke="#9b59b6" strokeWidth={1.5} fill="none" opacity={0.7}>
             <animate attributeName="stroke-dashoffset" values="0;20;0" dur="4.5s" repeatCount="indefinite" />
             <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4.5s" repeatCount="indefinite" />
          </path>

          {/* Soft indicator lights */}
          <circle cx={x + 16} cy={y + 14} r={2} fill="#ecf0f1" opacity={0.7}/>
          <circle cx={x + TILE_SIZE - 16} cy={y + 14} r={2} fill="#ecf0f1" opacity={0.7}/>
          
          {/* Optional: Tiny text element to suggest interface */}
          <text x={x + TILE_SIZE / 2} y={y + TILE_SIZE - 12} fontSize="3" fill="#bdc3c7" textAnchor="middle">SereneMind</text>
        </g>
      );
    // --- LEGACY / GENERIC --- (These might be from older iterations or different branches of development)
    // It's important to ensure these spriteKeys are still relevant or if they should be mapped to the new period-specific ones.
    case 'smart_fridge_2040': // This likely should be smart_fridge_2050 if it's still used
      return (
        <g key={`smartfridge-${spriteKey}-${itemX}-${itemY}`}>         
          <rect x={x + 10} y={y + 10} width={TILE_SIZE - 20} height={TILE_SIZE - 20} rx={5} fill="#4a4a4a" stroke="#00ffff" strokeWidth={2}/>
          <circle cx={x + TILE_SIZE/2} cy={y + TILE_SIZE/2} r={8} fill="#00ffff" opacity={0.3}/>
        </g>
      );
    case 'smart_dashboard_2040': // This likely should be smart_dashboard_2050 if it's still used
      return (
        <g key={`smartdashboard-${spriteKey}-${itemX}-${itemY}`}>          
          <rect x={x + 10} y={y + 15} width={TILE_SIZE - 20} height={TILE_SIZE - 30} rx={8} fill="#78909c" stroke="#cfd8dc" strokeWidth={2}/>
          <circle cx={x + TILE_SIZE/2} cy={y + 20} r={5} fill="#cfd8dc" opacity={0.7}/>
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
    case 'chefai_recipe_2030':
      return (
        <g key={`chefai-recipe-${itemX}-${itemY}`}>
          {/* Tablet body */}
          <rect x={x + 9} y={y + 10} width={TILE_SIZE - 18} height={TILE_SIZE - 20} rx={6} fill="#fff" stroke="#ff7043" strokeWidth={2}/>
          {/* Screen */}
          <rect x={x + 13} y={y + 14} width={TILE_SIZE - 26} height={TILE_SIZE - 28} rx={3} fill="#ffe0b2" />
          {/* Chef hat icon */}
          <ellipse cx={x + 24} cy={y + 20} rx={5} ry={3} fill="#fff" stroke="#ff7043" strokeWidth={1}/>
          <ellipse cx={x + 29} cy={y + 20} rx={5} ry={3} fill="#fff" stroke="#ff7043" strokeWidth={1}/>
          <ellipse cx={x + 26.5} cy={y + 18} rx={7} ry={4} fill="#fff" stroke="#ff7043" strokeWidth={1}/>
          {/* Recipe card */}
          <rect x={x + 20} y={y + 27} width={TILE_SIZE - 36} height={6} rx={1.5} fill="#fff3e0" stroke="#ff7043" strokeWidth={0.7}/>
          <rect x={x + 22} y={y + 29} width={TILE_SIZE - 40} height={2} rx={1} fill="#ff7043" opacity={0.7}/>
        </g>
      );
    case 'chore_board_2030':
      return (
        <g key={`choreboard-${itemX}-${itemY}`}>
          {/* Whiteboard frame */}
          <rect x={x + 7} y={y + 10} width={TILE_SIZE - 14} height={TILE_SIZE - 20} rx={5} fill="#fff" stroke="#42a5f5" strokeWidth={2}/>
          {/* Family icons */}
          <circle cx={x + 16} cy={y + 16} r={3} fill="#ffb300" />
          <circle cx={x + 24} cy={y + 16} r={3} fill="#66bb6a" />
          <circle cx={x + 32} cy={y + 16} r={3} fill="#ef5350" />
          {/* Colored blocks */}
          <rect x={x + 13} y={y + 22} width={6} height={4} rx={1} fill="#42a5f5" />
          <rect x={x + 23} y={y + 22} width={6} height={4} rx={1} fill="#ab47bc" />
          <rect x={x + 13} y={y + 28} width={6} height={4} rx={1} fill="#ffb300" />
          <rect x={x + 23} y={y + 28} width={6} height={4} rx={1} fill="#66bb6a" />
        </g>
      );
    case 'robot_arm_2030':
      return (
        <g key={`robotarm-2030-${itemX}-${itemY}`}>
          {/* Arm base */}
          <rect x={x + 14} y={y + 32} width={TILE_SIZE - 28} height={10} rx={4} fill="#263238" stroke="#00bcd4" strokeWidth={2}/>
          {/* Lower arm segment */}
          <rect x={x + 22} y={y + 22} width={8} height={16} rx={3} fill="#b0bec5" stroke="#00bcd4" strokeWidth={1.2}/>
          {/* Joint */}
          <circle cx={x + 26} cy={y + 22} r={4} fill="#00bcd4" stroke="#fff" strokeWidth={1}/>
          {/* Upper arm segment (angled) */}
          <rect x={x + 26} y={y + 12} width={6} height={14} rx={2.2} fill="#b0bec5" stroke="#00bcd4" strokeWidth={1.2} transform={`rotate(-20 ${x + 29} ${y + 19})`}/>
          {/* End effector: glowing tool */}
          <ellipse cx={x + 32} cy={y + 11} rx={4} ry={4} fill="#fffde7" stroke="#ffb300" strokeWidth={2}/>
          <ellipse cx={x + 32} cy={y + 11} rx={2} ry={2} fill="#fff59d" opacity={0.8}/>
          {/* Accent light */}
          <circle cx={x + 19} cy={y + 37} r={2} fill="#00e5ff" opacity={0.8}/>
        </g>
      );
    case 'autodrive_hub_2030':
      return (
        <g key={`autodrive-hub-${itemX}-${itemY}`}>
          {/* Dashboard panel */}
          <rect x={x + 10} y={y + 16} width={TILE_SIZE - 20} height={TILE_SIZE - 28} rx={6} fill="#e0f7fa" stroke="#00acc1" strokeWidth={2}/>
          {/* Steering wheel */}
          <circle cx={x + TILE_SIZE/2} cy={y + 30} r={7} fill="#fff" stroke="#00acc1" strokeWidth={2}/>
          <ellipse cx={x + TILE_SIZE/2} cy={y + 30} rx={3} ry={3} fill="#00acc1" />
          <rect x={x + 19} y={y + 23} width={TILE_SIZE - 38} height={4} rx={2} fill="#00acc1" opacity={0.3}/>
          {/* Map display */}
          <rect x={x + 17} y={y + 36} width={TILE_SIZE - 34} height={6} rx={2} fill="#fffde7" stroke="#00acc1" strokeWidth={0.7}/>
          <polyline points={`${x+19},${y+39} ${x+23},${y+41} ${x+27},${y+39} ${x+31},${y+41}`} fill="none" stroke="#00acc1" strokeWidth={1}/>
        </g>
      );
    case 'ai_dashboard_2030':
      return (
        <g key={`ai-dashboard-${itemX}-${itemY}`}>
          {/* Tablet frame */}
          <rect x={x + 9} y={y + 12} width={TILE_SIZE - 18} height={TILE_SIZE - 22} rx={6} fill="#fff" stroke="#7e57c2" strokeWidth={2}/>
          {/* Screen background */}
          <rect x={x + 13} y={y + 16} width={TILE_SIZE - 26} height={TILE_SIZE - 30} rx={3} fill="#ede7f6" />
          {/* Charts */}
          <rect x={x + 16} y={y + 20} width={6} height={8} rx={2} fill="#7e57c2" opacity={0.7}/>
          <rect x={x + 24} y={y + 23} width={6} height={5} rx={2} fill="#42a5f5" opacity={0.7}/>
          {/* Calendar */}
          <rect x={x + 32} y={y + 20} width={8} height={6} rx={1.5} fill="#fff59d" stroke="#7e57c2" strokeWidth={0.7}/>
          {/* Message icon */}
          <ellipse cx={x + 28} cy={y + 32} rx={3} ry={2} fill="#42a5f5" />
          <rect x={x + 26.5} y={y + 33} width={3} height={1.2} rx={0.6} fill="#fff" />
        </g>
      );
    case 'ai_email_interface_2030': // For InboxZero AI Filter
      return (
        <g key={`inboxzeroai-2030-${itemX}-${itemY}`}>
          {/* InboxZero AI Filter: stylized inbox tray with AI sparkle */}
          <rect x={x + 18} y={y + 28} width={TILE_SIZE - 36} height={6} rx={2} fill="#fffde7" stroke="#ffb74d" strokeWidth={1.5}/>
          {/* Envelope icon */}
          <rect x={x + 22} y={y + 29} width={8} height={4} rx={1.2} fill="#fff" stroke="#ffb74d" strokeWidth={1}/>
          <polyline points={`${x+22},${y+29} ${x+26},${y+32} ${x+30},${y+29}`} fill="none" stroke="#ffb74d" strokeWidth={1}/>
          {/* AI sparkle */}
          <circle cx={x + 33} cy={y + 28} r={1.3} fill="#fff176" stroke="#ffd600" strokeWidth={0.7}/>
          <circle cx={x + 35} cy={y + 31} r={0.7} fill="#fff176" stroke="#ffd600" strokeWidth={0.5}/>
        </g>
      );
    case 'ai_bi_dashboard_2030': // For InsightAI BI Dashboard
      return (
        <g key={`aibidashboard-2030-${itemX}-${itemY}`}>
          {/* InsightAI BI Dashboard: tablet with colorful analytics */}
          <rect x={x + 16} y={y + 17} width={TILE_SIZE - 32} height={TILE_SIZE - 34} rx={3} fill="#fff" stroke="#43a047" strokeWidth={1.5}/>
          {/* Analytics bars */}
          <rect x={x + 19} y={y + 27} width={3} height={7} rx={1} fill="#43a047" />
          <rect x={x + 24} y={y + 29} width={3} height={5} rx={1} fill="#1976d2" />
          <rect x={x + 29} y={y + 25} width={3} height={9} rx={1} fill="#fbc02d" />
          {/* Pie chart */}
          <circle cx={x + 25} cy={y + 22} r={2} fill="#fffde7" stroke="#fbc02d" strokeWidth={0.7}/>
          <path d={`M${x+25},${y+22} L${x+25},${y+20} A2,2 0 0,1 ${x+27},${y+22} Z`} fill="#43a047" />
        </g>
      );
    case 'smart_desk_2030': // For ErgoFlow SmartDesk
      return (
        <g key={`smartdesk-2030-${itemX}-${itemY}`}>
          {/* ErgoFlow SmartDesk: sleek standing desk with digital panel */}
          <rect x={x + 13} y={y + 26} width={TILE_SIZE - 26} height={8} rx={3} fill="#e3f2fd" stroke="#1976d2" strokeWidth={2}/>
          {/* Desk legs */}
          <rect x={x + 15} y={y + 34} width={3} height={7} rx={1.2} fill="#90caf9" />
          <rect x={x + 30} y={y + 34} width={3} height={7} rx={1.2} fill="#90caf9" />
          {/* Digital control panel */}
          <rect x={x + 23} y={y + 28} width={6} height={3} rx={1} fill="#1976d2" />
          {/* Subtle screen glow */}
          <rect x={x + 24} y={y + 29} width={4} height={1} rx={0.5} fill="#fff" opacity={0.7}/>
        </g>
      );
    case 'ai_calendar_panel_2030': // For SchedulAI Pro
      return (
        <g key={`aicalendarpanel-2030-${itemX}-${itemY}`}>
          {/* SchedulAI Pro: calendar panel with clock and event dots */}
          <rect x={x + 17} y={y + 20} width={TILE_SIZE - 34} height={TILE_SIZE - 28} rx={3} fill="#fff" stroke="#ab47bc" strokeWidth={1.5}/>
          {/* Calendar grid */}
          <rect x={x + 19} y={y + 23} width={12} height={7} rx={1.5} fill="#ede7f6" />
          {/* Event dots */}
          <circle cx={x + 22} cy={y + 27} r={0.7} fill="#ab47bc" />
          <circle cx={x + 25} cy={y + 27} r={0.7} fill="#43a047" />
          <circle cx={x + 28} cy={y + 27} r={0.7} fill="#1976d2" />
          {/* Clock icon */}
          <circle cx={x + 33} cy={y + 23} r={2.3} fill="#fff" stroke="#ab47bc" strokeWidth={1}/>
          <line x1={x + 33} y1={y + 23} x2={x + 33} y2={y + 21.5} stroke="#ab47bc" strokeWidth={0.7}/>
          <line x1={x + 33} y1={y + 23} x2={x + 34.2} y2={y + 24} stroke="#ab47bc" strokeWidth={0.7}/>
        </g>
      );
    case 'ai_project_review_2040':
      // ProjectOracle Planner Lite: Futuristic clipboard/tablet with timeline and AI pulse
      return (
        <g key={`oracleplannerlite-2040-${itemX}-${itemY}`}>
          {/* Tablet body */}
          <rect x={x + 17} y={y + 22} width={TILE_SIZE - 34} height={TILE_SIZE - 28} rx={4} fill="#fff" stroke="#1976d2" strokeWidth={1.5}/>
          {/* Timeline */}
          <rect x={x + 21} y={y + 32} width={16} height={2} rx={1} fill="#90caf9" />
          {/* Milestone dots */}
          <circle cx={x + 23} cy={y + 33} r={1} fill="#43a047" />
          <circle cx={x + 29} cy={y + 33} r={1} fill="#fbc02d" />
          <circle cx={x + 35} cy={y + 33} r={1} fill="#ab47bc" />
          {/* AI pulse */}
          <ellipse cx={x + 29} cy={y + 27} rx={4} ry={2} fill="#e3f2fd" stroke="#1976d2" strokeWidth={0.7}/>
          <circle cx={x + 29} cy={y + 27} r={1.1} fill="#1976d2" opacity={0.7}/>
        </g>
      );
    case 'smart_whiteboard_2040':
      // Smart Whiteboard: sleek digital board with colored sticky notes and marker lines
      return (
        <g key={`smartwhiteboard-2040-${itemX}-${itemY}`}>
          {/* Board body */}
          <rect x={x + 17} y={y + 20} width={TILE_SIZE - 34} height={TILE_SIZE - 28} rx={3} fill="#fafafa" stroke="#90caf9" strokeWidth={1.2}/>
          {/* Sticky notes */}
          <rect x={x + 20} y={y + 24} width={4} height={4} rx={0.8} fill="#fff59d" stroke="#fbc02d" strokeWidth={0.5}/>
          <rect x={x + 26} y={y + 29} width={4} height={4} rx={0.8} fill="#b2dfdb" stroke="#43a047" strokeWidth={0.5}/>
          <rect x={x + 32} y={y + 24} width={4} height={4} rx={0.8} fill="#ce93d8" stroke="#ab47bc" strokeWidth={0.5}/>
          {/* Marker lines */}
          <line x1={x + 20} y1={y + 28} x2={x + 36} y2={y + 28} stroke="#1976d2" strokeWidth={0.7}/>
          <line x1={x + 22} y1={y + 34} x2={x + 34} y2={y + 34} stroke="#43a047" strokeWidth={0.7}/>
        </g>
      );
    case 'public_data_terminal_2040':
      // Public Data Terminal: Futuristic, luminous kiosk with interactive display
      return (
        <g key={`publicdataterminal-2040-${itemX}-${itemY}`}>
          {/* Sleek, curved kiosk body */}
          <rect x={x + 20} y={y + 14} width={TILE_SIZE - 40} height={TILE_SIZE - 10} rx={8} fill="#e3f2fd" stroke="#1976d2" strokeWidth={2}/>
          {/* Glowing, interactive screen */}
          <rect x={x + 24} y={y + 20} width={TILE_SIZE - 48} height={TILE_SIZE - 32} rx={3} fill="#40c4ff" stroke="#00bcd4" strokeWidth={1.2} filter="url(#glow)"/>
          {/* Touch UI elements */}
          <circle cx={x + 28} cy={y + 28} r={1.2} fill="#fff" />
          <rect x={x + 32} y={y + 27} width={7} height={1.5} rx={0.7} fill="#fff" opacity={0.7}/>
          <rect x={x + 32} y={y + 30} width={7} height={1.5} rx={0.7} fill="#fff" opacity={0.4}/>
          {/* Data icon (stylized) */}
          <circle cx={x + 28} cy={y + 22} r={1.1} fill="#fff" stroke="#00bcd4" strokeWidth={0.5}/>
          <rect x={x + 27.5} y={y + 21.2} width={1.1} height={1.6} rx={0.4} fill="#00bcd4" />
          {/* Luminous base */}
          <ellipse cx={x + 26} cy={y + 38} rx={7} ry={2} fill="#40c4ff" opacity={0.33}/>
          {/* SVG filter for screen glow */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </g>
      );
    case 'sd_workstation_2040':
      // Ergonomic Workstation: curved desk, floating holographic display, ergonomic chair
      return (
        <g key={`ergo-workstation-2040-${itemX}-${itemY}`}>
          {/* Curved, modern desk */}
          <rect x={x + 13} y={y + 34} width={TILE_SIZE - 26} height={8} rx={6} fill="#e3f2fd" stroke="#1976d2" strokeWidth={1.5}/>
          {/* Floating holographic display */}
          <rect x={x + 22} y={y + 22} width={16} height={6} rx={3} fill="#40c4ff" opacity={0.85} stroke="#00bcd4" strokeWidth={1}/>
          <ellipse cx={x + 30} cy={y + 25} rx={7} ry={2.2} fill="#b3e5fc" opacity={0.6}/>
          {/* Display stand */}
          <rect x={x + 29} y={y + 30} width={2} height={4} rx={0.7} fill="#90caf9" />
          {/* Ergonomic chair */}
          <ellipse cx={x + 19} cy={y + 41} rx={4.5} ry={2} fill="#90caf9" stroke="#1976d2" strokeWidth={0.7}/>
          <rect x={x + 16.5} y={y + 38} width={5.5} height={4} rx={2} fill="#1976d2" opacity={0.7}/>
          <rect x={x + 18} y={y + 36} width={2.5} height={3} rx={1} fill="#90caf9" />
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
