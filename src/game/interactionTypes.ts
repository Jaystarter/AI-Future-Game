import { PlayerState } from './usePlayerMovement';
import { NPC } from './NPC'; // Assuming NPC will be one type of Interactable

// Defines actions that an interactable object can trigger in the game
export interface GameActions {
  startDialogue: (npc: NPC) => void; // Example action, will expand
  displayTextPanel: (title: string, content: string) => void; // New action for examinables
  openDeviceInterface: (deviceId: string, deviceName: string) => void; // New action for smart devices
  // TODO: Add other actions like triggerEvent, etc.
}

// Represents any object in the game world that the player can interact with
export interface InteractableObject {
  id: string; // Unique identifier for this interactable instance
  type: string; // Category of interactable, e.g., 'npc', 'device', 'note'
  position: { x: number; y: number }; // Logical grid position

  /**
   * Checks if this object is currently interactable by the player.
   * @param playerState Current state of the player (position, orientation, activityState).
   * @param gameContext Optional: any other relevant game state or context.
   * @returns True if interactable, false otherwise.
   */
  isInteractable(playerState: PlayerState, gameContext?: any): boolean;

  /**
   * Gets the UI prompt text to display when this object is the interaction target.
   * @param playerState Current state of the player.
   * @param gameContext Optional: any other relevant game state or context.
   * @returns Prompt string (e.g., "Press E to talk") or null if no prompt.
   */
  getInteractionPrompt(playerState: PlayerState, gameContext?: any): string | null;

  /**
   * Called when the player executes an interaction with this object.
   * @param playerState Current state of the player.
   * @param gameActions Access to game system actions (e.g., to start dialogue, open UI).
   */
  onInteract(playerState: PlayerState, gameActions: GameActions): void;

  // Optional: Store specific data for this interactable
  data?: any; 
}
