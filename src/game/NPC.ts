import { InteractableObject, GameActions } from './interactionTypes';
import { PlayerState } from './usePlayerMovement';

export interface DialogueEntry {
  speaker: string; // 'Player' or NPC's name
  text: string;
  emotion?: 'neutral' | 'happy' | 'sad' | 'angry'; // Optional: for character expressions
}

// Specific data structure for NPC details stored in InteractableObject's data field
export interface NPCData {
  name: string;
  period: '2030' | '2040' | '2050' | '2070';
  dialogue: DialogueEntry[];
  spriteKey: string;
  locationId?: string; // Optional: ID of the location this NPC appears in
}

export interface NPC extends InteractableObject {
  type: 'npc'; // Specific type for NPCs
  // name, period, dialogue, spriteKey are now in data: NPCData
  data: NPCData; // Ensure data conforms to NPCData
}

// Helper function to create NPC objects that conform to InteractableObject
export function createNPC(
  id: string,
  x: number,
  y: number,
  npcDetails: NPCData // Pass all NPC-specific details in one object
): NPC {
  return {
    id,
    type: 'npc',
    position: { x, y },
    data: npcDetails, // Store all NPC specific data here

    isInteractable(playerState: PlayerState): boolean {
      // NPC is interactable if player is facing its tile
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
      return `Press E to talk to ${npcDetails.name}`;
    },

    onInteract(playerState: PlayerState, gameActions: GameActions): void {
      // Pass the whole NPC object (which includes its data) to startDialogue
      // GameActions.startDialogue might need to be updated if it expects specific NPC properties directly
      gameActions.startDialogue(this); 
    }
  };
}

export const sampleNPCs: NPC[] = [
  // NOW (2025) Home NPCs
  createNPC('npc_spouse_stressed_2025', 4, 6, {
    name: 'Alex (Overworked)', period: '2030', dialogue: [
      { speaker: 'Alex (Overworked)', text: 'Ugh, another long day. This report is killing me. And the smart speaker keeps playing the wrong playlist.' },
      { speaker: 'Player', text: 'Rough day, huh? Need any help?' },
      { speaker: 'Alex (Overworked)', text: "Just need this week to be over. And maybe for the AI to actually understand what 'relaxing music' means." },
    ], spriteKey: 'spouse_alex_2025', locationId: 'home'
  }),

  // NEAR FUTURE (2030) Home NPCs
  createNPC('npc_aura_2030', 6, 4, {
    name: 'AURA, Home AI', period: '2030', dialogue: [
      { speaker: 'AURA', text: 'Good morning! The home environment is optimal. Any requests?' },
      { speaker: 'Player', text: "What's the news, AURA?" },
      { speaker: 'AURA', text: 'Synthesizing top headlines now...' }
    ], spriteKey: 'home_ai_orb_2030', locationId: 'home'
  }),
  createNPC('npc_kid_ar_2030', 3, 6, {
    name: 'Leo (AR Explorer)', period: '2030', dialogue: [
      { speaker: 'Leo (AR Explorer)', text: 'Whoa! Did you see that virtual dragon fly through the wall? My AR glasses are awesome!' },
      { speaker: 'Player', text: 'Sounds like fun, Leo.' },
      { speaker: 'Leo (AR Explorer)', text: "It's way better than old-school TV!" }
    ], spriteKey: 'kid_ar_glasses_2030', locationId: 'home'
  }),

  // NEAR FUTURE (2030) Workplace NPCs
  createNPC('npc_aura_office_assistant_2030', 3, 2, {
    name: 'AURA (Office Mode)', period: '2030', dialogue: [
      { speaker: 'AURA (Office Mode)', text: "Good morning! I've organized your schedule and prioritized your emails. Your first meeting is in 10 minutes." },
      { speaker: 'Player', text: 'Thanks, AURA. Anything urgent?' },
      { speaker: 'AURA (Office Mode)', text: "The Q3 report requires your approval. I've highlighted the key metrics." }
    ], spriteKey: 'aura_sprite_2030', locationId: 'office'
  }),
  createNPC('npc_colleague_standard_2030', 2, 5, {
    name: 'Dave (Marketing)', period: '2030', dialogue: [
      { speaker: 'Dave (Marketing)', text: "Hey, got a sec? The AI's latest market analysis for the new campaign is pretty wild. Want to take a look?" },
      { speaker: 'Player', text: "Sure, Dave. What's the AI suggesting?" },
      { speaker: 'Dave (Marketing)', text: "It's predicting a major shift in consumer sentiment. Could be big if we play it right." }
    ], spriteKey: 'colleague_dave_2030', locationId: 'office'
  }),

  // MID FUTURE (2040) Home NPCs
  createNPC('autonomous_grocery_delivery_bot_2040', 8, 7, {
    name: 'DeliverE Bot', period: '2040', dialogue: [
      { speaker: 'DeliverE Bot', text: 'Scheduled delivery arriving. Please confirm receipt for bio-gel nutrients and synth-protein.' },
      { speaker: 'Player', text: 'Looks good, thanks!' },
      { speaker: 'DeliverE Bot', text: 'Delivery confirmed. Have an optimal day!' }
    ], spriteKey: 'delivery_bot_2040', locationId: 'home'
  }),

  // MID FUTURE (2040) Workplace NPCs
  createNPC('npc_ai_video_call_participant_2040', 4, 6, {
    name: 'Ava (AI Meeting Rep)', period: '2040', dialogue: [
      { speaker: 'Ava (AI Meeting Rep)', text: 'Greetings. I am Ava, representing the Kyoto branch for this sync. My sensorium is active.' },
      { speaker: 'Player', text: 'Welcome, Ava. Any updates from your end?' },
      { speaker: 'Ava (AI Meeting Rep)', text: 'Project Phoenix is on schedule. Data packet incoming.' }
    ], spriteKey: 'ai_meeting_avatar_2040', locationId: 'office'
  }),
  createNPC('npc_boss_ai_feedback_2040', 5, 8, {
    name: 'Manager Steele (AI-Assisted)', period: '2040', dialogue: [
      { speaker: 'Manager Steele (AI-Assisted)', text: 'Your latest performance metrics are... acceptable. My internal AI advisor notes a 7.3% potential for optimization in your Q3 projections.' },
      { speaker: 'Player', text: "I'll review the AI's feedback." },
      { speaker: 'Manager Steele (AI-Assisted)', text: 'Do. Efficiency is paramount.' }
    ], spriteKey: 'manager_steele_cyborg_2040', locationId: 'office'
  }),

  // FAR FUTURE (2055-2100) Home NPCs
  createNPC('npc_holographic_ai_companion_2075', 3, 3, {
    name: 'Kai (Holographic AI Companion)', period: '2070', dialogue: [
      { speaker: 'Kai', text: 'Greetings! How may I enhance your reality today?' },
      { speaker: 'Player', text: 'Just browsing the infostream, Kai.' },
      { speaker: 'Kai', text: 'Understood. I have curated a selection of experiences tailored to your neural profile.' }
    ], spriteKey: 'holographic_ai_companion_2075', locationId: 'home'
  }),
  createNPC('npc_ai_child_learner_2075', 7, 5, {
    name: 'Elara (AI Child Learner)', period: '2070', dialogue: [
      { speaker: 'Elara', text: 'I have a query: why do organic beings require sleep cycles?' },
      { speaker: 'Player', text: "It's for restoration and memory consolidation, Elara." },
      { speaker: 'Elara', text: 'Fascinating. My learning algorithms achieve that through distributed processing.' }
    ], spriteKey: 'ai_child_learner_2075', locationId: 'home'
  }),
  createNPC('npc_robotic_pet_playful_2075', 5, 8, {
    name: 'Sparky (Robotic Pet)', period: '2070', dialogue: [
      { speaker: 'Sparky', text: '*Chirps happily and wags its plasma tail* Want to play holo-fetch?' },
      { speaker: 'Player', text: 'Maybe later, Sparky.' },
      { speaker: 'Sparky', text: '*Sad whimper, then projects a bouncing ball hologram expectantly*' }
    ], spriteKey: 'robotic_pet_playful_2075', locationId: 'home'
  }),

  // FAR FUTURE (2055-2100) Workplace NPCs
  createNPC('npc_ai_colleague_autonomous_2075', 2, 2, {
    name: 'Unit 734 (AI Colleague)', period: '2070', dialogue: [
      { speaker: 'Unit 734', text: 'My latest market simulation indicates a 97.3% success probability for Project Chimera.' },
      { speaker: 'Player', text: "That's impressive, Unit 734. Any risk factors?" },
      { speaker: 'Unit 734', text: 'Minimal. Solar flare activity is the primary variable, currently at 0.02% probability of interference.' }
    ], spriteKey: 'ai_colleague_unit734_2075', locationId: 'office'
  }),
  createNPC('npc_ai_ceo_strategic_2075', 5, 5, {
    name: 'The Oracle (AI CEO)', period: '2070', dialogue: [
      { speaker: 'The Oracle', text: 'The quarterly expansion directives have been disseminated. Acknowledge receipt and initiate phase one.' },
      { speaker: 'Player', text: 'Understood, Oracle. Phase one initiated.' },
      { speaker: 'The Oracle', text: 'Optimal. Report anomalies immediately. My predictive models require constant refinement.' }
    ], spriteKey: 'ai_ceo_oracle_2075', locationId: 'office'
  }),
  createNPC('npc_robotic_workforce_coordinator_2075', 8, 8, {
    name: 'Overseer Prime (Robotic Workforce Coordinator)', period: '2070', dialogue: [
      { speaker: 'Overseer Prime', text: 'Robotic unit efficiency is at 99.8%. Unit B-47 requires a minor lubricant top-up in bay 3.' },
      { speaker: 'Player', text: "I'll dispatch a maintenance bot." },
      { speaker: 'Overseer Prime', text: 'Acknowledged. Productivity must be maintained.' }
    ], spriteKey: 'robotic_foreman_prime_2075', locationId: 'office'
  }),
];
