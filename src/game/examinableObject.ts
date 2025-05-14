import { PlayerState } from './usePlayerMovement';
import { InteractableObject, GameActions } from './interactionTypes';

export interface ExaminableObjectDetails {
  name: string; // e.g., "Old Painting", "Mysterious Device"
  examineText: string; // The text displayed when examined
  period: string; // e.g., "2025", "2030", "2040", "2055-2100"
  locationId?: string; // Optional: ID of the location this object appears in
  spriteKey?: string; // Added for custom SVG rendering
}

// Note: The full ExaminableObject would also include id, type, position from InteractableObject
// For the factory, we take these as params along with the details.

export function createExaminable(
  id: string,
  x: number,
  y: number,
  details: ExaminableObjectDetails
): InteractableObject {
  return {
    id,
    type: 'examinable',
    position: { x, y },
    data: details, // Store examinable-specific data

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
      return `Press E to examine ${details.name}`;
    },

    onInteract(playerState: PlayerState, gameActions: GameActions): void {
      gameActions.displayTextPanel(details.name, details.examineText);
    }
  };
}

// Sample examinable objects (can be moved to a central game data file later)
// NOTE: Added a faded book on bookshelf for realism
export const sampleExaminables: InteractableObject[] = [
  // Place faded book on bookshelf (e.g., x=7, y=2)
  createExaminable('ex_faded_book_2025_home', 7, 2, {
    name: 'Faded Book',
    examineText: 'A paperback with a faded cover. The title is illegible, but it looks well-read.',
    period: '2025',
    locationId: 'home',
    spriteKey: 'book_faded',
  }),
  // Place poster above couch on the wall (e.g., x=3, y=1)
  createExaminable('ex_poster_2025', 3, 1, {
    name: 'Faded Poster',
    examineText: 'An old, slightly faded poster. It depicts a stylized rocket launching towards a binary sunset. Text at the bottom reads: "The Future is a Choice - Mars Initiative 2018"',
    period: '2025',
    locationId: 'home',
    spriteKey: 'poster_2025',
  }),
  // Place antique book on coffee table (e.g., x=3, y=3)
  createExaminable('ex_antique_book_2025_home', 3, 3, {
    name: 'Antique Book',
    examineText: 'A leather-bound copy of "Do Androids Dream of Electric Sheep?". The pages are worn, and the cover is cracked. Smells faintly of dust and ozone.',
    period: '2025',
    locationId: 'home',
    spriteKey: 'book_antique',
  }),
  // Remove couch examinable, as couch is now a tile and not an examinable object.
  // Place kitchenette in kitchen area along top wall (e.g., x=8, y=1)
  createExaminable('ex_kitchen_2025_home', 8, 1, {
    name: 'Basic Kitchenette',
    examineText: 'A small, functional kitchenette. It features a nutrient paste dispenser, a water recycler, and a surprisingly clean microwave. A single, sad-looking synth-apple sits on the counter.',
    period: '2025',
    locationId: 'home',
    spriteKey: 'kitchenette_2025',
  }),
  createExaminable('ex_desk_A_2025_office', 3, 3, {
    name: 'Standard Desk',
    examineText: 'A plain office desk. A few coffee stains.',
    period: '2025',
    locationId: 'office',
  }),
  createExaminable('ex_desk_B_2025_office', 3, 5, {
    name: 'Standard Desk',
    examineText: 'Another standard office desk. Slightly neater.',
    period: '2025',
    locationId: 'office',
  }),
  createExaminable('ex_whiteboard_2025_office', 5, 1, {
    name: 'Whiteboard',
    examineText: "A whiteboard with faded diagrams about 'synergy'.",
    period: '2025',
    locationId: 'office',
  }),
  createExaminable('ex_plant_2025_office', 1, 1, {
    name: 'Office Plant',
    examineText: 'A resilient-looking office plant.',
    period: '2025',
    locationId: 'office',
  }),
  createExaminable('ex_terminal_2030', 5, 2, {
    name: 'Public Data Terminal',
    examineText: 'Accessing CityNet Archives... \nConnection unstable. Please try again later.',
    period: '2030',
    locationId: 'office',
  }),
  createExaminable('ex_workstation_2030_office', 6, 2, {
    name: 'Ergonomic Workstation',
    examineText: 'A state-of-the-art workstation from 2030. Features a holographic display and neural link compatibility.',
    period: '2030',
    locationId: 'office',
  }),
  createExaminable('ex_prototype_device_2040_office', 3, 5, {
    name: 'Experimental Gadget',
    examineText: 'A strange, unlabeled device covered in blinking lights. It hums faintly. Better not touch it.',
    period: '2040',
    locationId: 'office',
  }),
  createExaminable('ex_holosculpture_2055_home', 4, 3, {
    name: 'Kinetic Holo-Sculpture',
    examineText: 'A mesmerizing, ever-changing holographic sculpture. It reacts to your presence.',
    period: '2055-2100',
    locationId: 'home',
  })
];
