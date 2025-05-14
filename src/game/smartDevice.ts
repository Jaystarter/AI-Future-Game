import { PlayerState } from './usePlayerMovement';
import { InteractableObject, GameActions } from './interactionTypes';

export interface SmartDeviceDetails {
  name: string;
  status: string; // e.g., "Online", "Offline", "Standby"
  initialMessage?: string; // Optional message to display in the device UI
  period: '2030' | '2040' | '2050' | '2070';
  locationId?: string; // Optional: ID of the location this device appears in
  spriteKey?: string; // Added for custom SVG rendering
}

export function createSmartDevice(
  id: string,
  x: number,
  y: number,
  details: SmartDeviceDetails
): InteractableObject {
  return {
    id,
    type: 'smartDevice',
    position: { x, y },
    data: details,

    isInteractable(playerState: PlayerState): boolean {
      let targetX = playerState.x;
      let targetY = playerState.y;
      switch (playerState.orientation) {
        case 'up': targetY -= 1; break;
        case 'down': targetY += 1; break;
        case 'left': targetX -= 1; break;
        case 'right': targetX += 1; break;
      }
      return this.position.x === targetX && this.position.y === targetY;
    },

    getInteractionPrompt(): string | null {
      return `Press E to use ${details.name}`;
    },

    onInteract(playerState: PlayerState, gameActions: GameActions): void {
      gameActions.openDeviceInterface(this.id, details.name);
    }
  };
}

export const sampleSmartDevices: InteractableObject[] = [
  createSmartDevice('sd_homehub_2030', 3, 4, {
    name: 'Smart Home Hub v2.7',
    status: 'Online - Awaiting Command',
    initialMessage: 'Welcome to your connected home environment. How can I assist you today?',
    period: '2030',
    locationId: 'home',
  }),
  createSmartDevice('sd_medstation_2040', 7, 1, {
    name: 'AutoMed Station',
    status: 'Idle - Health Monitoring Active',
    initialMessage: 'Place hand on scanner for health diagnostics or dispense prescribed medication.',
    period: '2040',
    locationId: 'medical_bay', // This location might need definition later
  }),
  // 2025 Home - Adjusted from initial
  // Place infotainment wall on wall facing living area (e.g., x=6, y=2)
  createSmartDevice('sd_infotainment_2025_home', 6, 2, {
    name: 'WallScreen Infotainment v3',
    status: 'Online - News Feed Active',
    initialMessage: 'Displaying latest headlines. Global unrest continues. Local weather: mild, chance of synth-smog.',
    period: '2030',
    locationId: 'home',
    spriteKey: 'infotainment_wall_2025',
  }),
  // Place smart speaker on a side table or shelf (e.g., x=7, y=4)
  createSmartDevice('sd_smartspeaker_2025_home', 7, 4, {
    name: 'VoicePal Mini',
    status: 'Idle - Awaiting Query',
    initialMessage: 'VoicePal Mini at your service. How can I brighten your day?',
    period: '2030',
    locationId: 'home',
    spriteKey: 'smartspeaker_mini_2025',
  }),
  // 2025 Office Devices
  createSmartDevice('sd_office_printer_2025_office', 8, 3, { 
    name: 'MultiFunction Printer/Scanner 8000X',
    status: 'Ready - Low Toner',
    initialMessage: 'Please select a function: Print, Scan, Copy.',
    period: '2030',
    locationId: 'office',
  }),
  createSmartDevice('sd_confcall_2025_office', 5, 4, { 
    name: 'PolySound 500 Conference Unit',
    status: 'Standby',
    initialMessage: 'Ready for your meeting.',
    period: '2030',
    locationId: 'office',
  }),
  // Existing items for other periods/locations
  createSmartDevice('sd_corp_server_access_2030_office', 1, 6, {
    name: 'CorpNet Secure Terminal',
    status: 'Locked - Biometric ID Required',
    period: '2030',
    // No initialMessage for a locked terminal
    locationId: 'office',
  }),
  createSmartDevice('sd_personal_fabricator_2055_home', 2, 3, {
    name: 'Personal Matter Fabricator Mk II',
    status: 'Standby - Ready to Synthesize',
    initialMessage: 'Select blueprint for fabrication.',
    period: '2070',
    locationId: 'home',
  }),
  // NEAR FUTURE (2030) Home SmartDevices
  createSmartDevice('robot_arm_chore_2030', 1, 9, {
    name: 'HandyBot Arm',
    status: 'Idle - Ready for Task',
    initialMessage: 'Assign task: Clean surface, Fetch item, Assist cooking.',
    period: '2030',
    locationId: 'home',
    spriteKey: 'robot_arm_2030',
  }),
  createSmartDevice('smart_chore_board_2030', 2, 9, {
    name: 'FamilySync ChoreBoard',
    status: "Updated: Leo's turn for dishes",
    initialMessage: "View today's chores, assign tasks, or track completion.",
    period: '2030',
    locationId: 'home',
    spriteKey: 'chore_board_2030',
  }),
  createSmartDevice('smart_fridge_inventory_2030', 1, 11, {
    name: 'InstaView Fridge X20',
    status: 'Inventory: 3 Apples, Milk (Low)',
    initialMessage: 'View contents, add to shopping list, or suggest recipes.',
    period: '2030',
    locationId: 'home',
    spriteKey: 'smart_fridge_2030',
  }),
  createSmartDevice('self_driving_car_interface_2030', 8, 8, {
    name: 'AutoDrive Hub',
    status: 'Car Docked - Ready for Destination',
    initialMessage: 'Summon vehicle or set destination for autonomous travel.',
    period: '2030',
    locationId: 'home',
    spriteKey: 'self_drive_car_panel_2030',
  }),
  createSmartDevice('ai_recipe_smart_screen_2030', 1, 8, {
    name: 'ChefAI Recipe Assistant',
    status: 'Displaying: Lasagna (AI Optimized)',
    initialMessage: 'Search recipes, get step-by-step AI guidance, or generate meal plans.',
    period: '2030',
    locationId: 'home',
    spriteKey: 'ai_recipe_screen_2030',
  }),
  createSmartDevice('smart_morning_system_control_2030', 7, 11, {
    name: 'AwakeOS Morning Hub',
    status: 'Sunrise Sequence Initiated',
    initialMessage: 'Adjust wake-up routine: lighting, temperature, news briefing.',
    period: '2030',
    locationId: 'home',
    spriteKey: 'smart_morning_control_2030',
  }),
  createSmartDevice('ai_tutor_screen_2030', 2, 3, {
    name: 'LearnSphere AI Tutor',
    status: 'Module: Quantum Physics 101',
    initialMessage: 'Select learning module or request personalized study plan.',
    period: '2030',
    locationId: 'home',
    spriteKey: 'ai_tutor_screen_2030',
  }),
  createSmartDevice('personal_ai_dashboard_tablet_2030', 6, 6, {
    name: 'MyLife AI Dashboard',
    status: 'Displaying Personal Briefing',
    initialMessage: 'View your schedule, messages, health stats, and AI recommendations.',
    period: '2030',
    locationId: 'home',
    spriteKey: 'ai_dashboard_tablet_2030',
  }),
  // NEAR FUTURE (2030) Workplace SmartDevices
  createSmartDevice('smart_desk_productivity_2030', 2, 2, {
    name: 'ErgoFlow SmartDesk',
    status: 'Focus Mode Active',
    initialMessage: 'Adjust desk height, lighting, or activate productivity modules.',
    period: '2030',
    locationId: 'office',
    spriteKey: 'smart_desk_2030',
  }),
  createSmartDevice('ai_calendar_management_2030', 3, 1, {
    name: 'SchedulAI Pro',
    status: 'Next Event: Team Sync @ 10 AM',
    initialMessage: 'View schedule, book meetings, or let AI optimize your day.',
    period: '2030',
    locationId: 'office',
    spriteKey: 'ai_calendar_panel_2030',
  }),
  createSmartDevice('ai_email_filter_2030', 1, 5, {
    name: 'InboxZero AI Filter',
    status: '3 Urgent Emails, 15 Archived',
    initialMessage: 'Review AI-prioritized emails or adjust filter settings.',
    period: '2030',
    locationId: 'office',
    spriteKey: 'ai_email_interface_2030',
  }),
  createSmartDevice('ai_document_summarizer_2030', 3, 5, {
    name: 'QuickRead AI Summarizer',
    status: 'Ready for Document Upload',
    initialMessage: 'Upload document for quick AI summarization and key point extraction.',
    period: '2030',
    locationId: 'office',
    spriteKey: 'ai_summarizer_tool_2030',
  }),
  createSmartDevice('ai_bi_dashboard_2030', 5, 7, {
    name: 'InsightAI BI Dashboard',
    status: 'Displaying Q2 Sales Performance',
    initialMessage: 'Access real-time business intelligence, trends, and forecasts.',
    period: '2030',
    locationId: 'office',
    spriteKey: 'ai_bi_dashboard_2030',
  }),
  // MID FUTURE (2040) Home SmartDevices
  createSmartDevice('adaptive_walls_2040', 1, 5, {
    name: 'Wall Morph Controller',
    status: 'Ambient Mode Active',
    initialMessage: 'Select wall configuration or ambient theme.',
    period: '2040',
    locationId: 'home',
    spriteKey: 'adaptive_walls_control_2040',
  }),
  createSmartDevice('health_pod_2040', 7, 1, {
    name: 'BioGenesis Health Pod',
    status: 'Standby - Ready for Scan',
    initialMessage: 'Enter pod for full diagnostic scan or rejuvenation cycle.',
    period: '2040',
    locationId: 'home',
    spriteKey: 'health_pod_2040',
  }),
  createSmartDevice('morphing_furniture_2040', 6, 6, {
    name: 'FormShift Furniture Hub',
    status: "Current Layout: 'Socialize'",
    initialMessage: 'Choose desired furniture configuration: Socialize, Relax, Work, Dine.',
    period: '2040',
    locationId: 'home',
    spriteKey: 'morphing_furniture_control_2040',
  }),
  createSmartDevice('emotion_aware_ambient_system_2040', 4, 8, {
    name: 'AuraSense Ambient Controller',
    status: "Tuned to 'Calm Focus'",
    initialMessage: 'Adjust ambient settings or allow AuraSense to adapt to your emotional state.',
    period: '2040',
    locationId: 'home',
    spriteKey: 'emotion_system_control_2040',
  }),
  createSmartDevice('ai_family_chore_calendar_2040', 2, 10, {
    name: 'ChoreMaster AI Calendar',
    status: "Displaying This Week's Tasks",
    initialMessage: 'View assigned chores, log completion, or request task reassignment.',
    period: '2040',
    locationId: 'home',
    spriteKey: 'chore_calendar_2040',
  }),
  // MID FUTURE (2040) Workplace SmartDevices
  createSmartDevice('ai_personalized_training_generator_2040', 1, 3, {
    name: 'SkillSynth Trainer',
    status: 'Ready to Design Program',
    initialMessage: 'Access your profile to generate a personalized skill enhancement program.',
    period: '2040',
    locationId: 'office',
    spriteKey: 'ai_training_generator_2040',
  }),
  createSmartDevice('ai_project_plan_review_2040', 6, 6, {
    name: 'ProjectOracle Planner',
    status: 'Awaiting Plan Submission',
    initialMessage: 'Submit project plan for AI-driven review and optimization suggestions.',
    period: '2040',
    locationId: 'office',
    spriteKey: 'ai_project_review_2040',
  }),
  createSmartDevice('ai_code_generation_ide_2040', 2, 10, {
    name: 'CodeGenius IDE',
    status: 'Online - Ready for Prompt',
    initialMessage: 'Describe desired functionality or select a template for AI-assisted code generation.',
    period: '2040',
    locationId: 'office',
    spriteKey: 'ai_code_ide_2040',
  }),
  createSmartDevice('digital_twin_access_2040', 3, 11, {
    name: 'Gemini Twin Interface',
    status: 'Connected to Simulation Network',
    initialMessage: 'Access and manage digital twins for systems and processes.',
    period: '2040',
    locationId: 'office',
    spriteKey: 'digital_twin_access_2040',
  }),
  // FAR FUTURE (2055-2100) Home SmartDevices
  createSmartDevice('neural_lace_interface_2075', 8, 2, {
    name: 'Neural Lace Interface',
    status: 'Connected - Mindscape Active',
    initialMessage: 'Direct neural connection established. Accessing cognitive layer.',
    period: '2070',
    locationId: 'home',
    spriteKey: 'neural_lace_interface_2075',
  }),
  createSmartDevice('food_synthesizer_2075', 1, 10, {
    name: 'Molecular Food Synthesizer',
    status: 'Ready - Select Nutrient Profile',
    initialMessage: 'Specify desired meal. Nutritional optimization available.',
    period: '2070',
    locationId: 'home',
    spriteKey: 'food_synthesizer_2075',
  }),
  createSmartDevice('bio_monitor_full_scan_2075', 7, 2, {
    name: 'Vitalis Bio-Scanner',
    status: 'Monitoring - All Systems Nominal',
    initialMessage: 'Continuous biological monitoring active. Full body scan available on request.',
    period: '2070',
    locationId: 'home',
    spriteKey: 'bio_monitor_full_scan_2075',
  }),
  // FAR FUTURE (2055-2100) Workplace SmartDevices
  createSmartDevice('global_market_simulator_2075', 3, 7, {
    name: 'Global Market Impact Simulator',
    status: 'Online - Running Predictive Models',
    initialMessage: 'Input parameters for market impact simulation. Real-time global data feed active.',
    period: '2070',
    locationId: 'office',
    spriteKey: 'global_market_simulator_2075',
  }),
  createSmartDevice('holographic_collab_interface_2075', 5, 6, {
    name: 'HoloCollab Nexus',
    status: 'Active - Awaiting Participants',
    initialMessage: 'Join holographic meeting or initiate new collaboration session.',
    period: '2070',
    locationId: 'office',
    spriteKey: 'holographic_collab_interface_2075',
  }),
  createSmartDevice('ai_scientific_discovery_interface_2075', 2, 6, {
    name: 'DaVinci IX Discovery Engine',
    status: 'Processing - Hypothesis Generation Phase',
    initialMessage: 'Accessing global research network. Define parameters for scientific inquiry.',
    period: '2070',
    locationId: 'office',
    spriteKey: 'ai_scientific_discovery_interface_2075',
  }),
];
