export type TileType =
  | 'floor'
  | 'wall'
  | 'npc'
  | 'player'
  | 'door'
  | 'couch'
  | 'desk'
  | 'computer'
  | 'bed'
  | 'rug'
  | 'bookshelf'
  | 'tv'
  | 'coffee_table'
  | 'kitchenette'
  | 'plant'
  | 'dining_table'
  | 'lamp'
  | 'chair';

export interface Tile {
  type: TileType;
  x: number;
  y: number;
  sprite?: string; // Optional: for specific tile variations if needed beyond type
  npcId?: string;  // Optional: if an NPC starts on this tile (though NPC system handles rendering)
}

export interface TileMapData {
  width: number;
  height: number;
  tiles: Tile[][];
}

// Example: Home layout with furniture for each time period
export function createSimpleMap(width: number, height: number, locationId: string, period?: string): TileMapData {
  const tiles: Tile[][] = [];

  // Determine base tiles based on locationId
  let floorType: TileType = 'floor';
  let wallType: TileType = 'wall';

  // Basic room structure (walls and floor)
  for (let y = 0; y < height; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < width; x++) {
      if (y === 0 || y === height - 1 || x === 0 || x === width - 1) {
        row.push({ type: wallType, x, y });
      } else {
        row.push({ type: floorType, x, y });
      }
    }
    tiles.push(row);
  }

  // Player start placeholder (actual player is rendered separately)
  if (height > 1 && width > 1) {
    // tiles[1][1].type = 'player'; // Not strictly needed as player is an overlay
  }

  // Define furniture and layout based on location and period
  if (locationId === 'home') {
    if (period === '2025') {
      // --- 2025 Home: lived-in, cozy, cluttered ---
      // Living area (centered): couch, coffee table, rug, bookshelf, TV
      tiles[3][5].type = 'couch'; tiles[3][6].type = 'couch';
      tiles[4][5].type = 'coffee_table';
      tiles[4][6].type = 'rug';
      tiles[2][6].type = 'tv';
      tiles[2][7].type = 'bookshelf';
      // Bedroom (bottom left)
      tiles[7][2].type = 'bed';
      // Kitchenette (top right)
      tiles[1][10].type = 'kitchenette'; tiles[1][11].type = 'kitchenette';
      // Dining (lower right)
      tiles[7][10].type = 'dining_table'; tiles[7][9].type = 'chair'; tiles[8][10].type = 'chair';
      // Plants and lamp for warmth
      tiles[6][3].type = 'plant'; tiles[2][12].type = 'lamp';
      // Entry/door
      tiles[9][7].type = 'door';
    } else if (period === '2030') {
      // --- 2030 Home: tech-centric, open, minimalist ---
      // Modular couch and smart coffee table (center)
      tiles[4][6].type = 'couch'; tiles[4][7].type = 'couch';
      tiles[5][6].type = 'coffee_table';
      // Large computer desk (top left)
      tiles[1][2].type = 'computer'; tiles[1][3].type = 'bookshelf';
      // Bed (bottom right, more open)
      tiles[8][11].type = 'bed';
      // Kitchenette (top right)
      tiles[1][10].type = 'kitchenette'; tiles[1][11].type = 'kitchenette';
      // Dining (bottom center)
      tiles[8][7].type = 'dining_table'; tiles[8][6].type = 'chair'; tiles[8][8].type = 'chair';
      // Plant and lamp
      tiles[2][2].type = 'plant'; tiles[2][12].type = 'lamp';
      // Entry/door
      tiles[9][7].type = 'door';
    } else if (period === '2040') {
      // --- 2040 Home: Early Augmented, Sleek Tech, Biophilic Hints ---
      // Living area: modular couch, advanced smart table, early holo-computer
      tiles[4][6].type = 'couch'; tiles[4][7].type = 'couch';
      tiles[5][6].type = 'coffee_table'; // Advanced smart table
      tiles[3][7].type = 'computer'; // Early holo-computer or large integrated screen
      tiles[5][7].type = 'rug';
      // Bedroom (bottom right)
      tiles[8][11].type = 'bed';
      // Kitchenette (top right)
      tiles[1][10].type = 'kitchenette'; tiles[1][11].type = 'kitchenette';
      // Dining (bottom center)
      tiles[8][7].type = 'dining_table'; tiles[8][6].type = 'chair'; tiles[8][8].type = 'chair';
      // More plants, smart window/art
      tiles[2][2].type = 'plant'; tiles[6][2].type = 'plant'; // More plants
      tiles[1][5].type = 'tv'; // Could be a smart window or dynamic art panel
      tiles[2][12].type = 'lamp';
      // Entry/door
      tiles[9][7].type = 'door';
    } else if (period === '2050') {
      // --- 2050 Home: augmented, biophilic, tech/art blend (formerly 2040) ---
      // Focal living area: round rug, couch, coffee table, holo-computer
      tiles[5][7].type = 'rug'; tiles[5][6].type = 'couch'; tiles[5][8].type = 'couch';
      tiles[6][7].type = 'coffee_table'; tiles[4][7].type = 'computer';
      // Bedroom (bottom left)
      tiles[8][2].type = 'bed';
      // Kitchenette (top right)
      tiles[1][10].type = 'kitchenette'; tiles[1][11].type = 'kitchenette';
      // Dining (lower right)
      tiles[8][10].type = 'dining_table'; tiles[8][9].type = 'chair'; tiles[9][10].type = 'chair';
      // More plants, lamp as accent
      tiles[2][2].type = 'plant'; tiles[7][12].type = 'plant'; tiles[2][12].type = 'lamp';
      // Entry/door
      tiles[9][7].type = 'door';
    } else if (period === '2070') {
      // --- 2070 Home: post-singularity, minimal, integrated (formerly 2055-2100) ---
      // Minimalist couch and coffee table (center)
      tiles[4][6].type = 'couch'; tiles[4][7].type = 'couch';
      tiles[5][6].type = 'coffee_table';
      // Integrated computer (top left)
      tiles[1][2].type = 'computer';
      // Bed (bottom right, sleek)
      tiles[8][11].type = 'bed';
      // Kitchenette (top right)
      tiles[1][10].type = 'kitchenette';
      // Dining (bottom center)
      tiles[8][7].type = 'dining_table'; tiles[8][6].type = 'chair'; tiles[8][8].type = 'chair';
      // Single plant (statement)
      tiles[2][2].type = 'plant';
      // Ambient lamp
      tiles[2][12].type = 'lamp';
      // Entry/door
      tiles[9][7].type = 'door';
    }
  } else if (locationId === 'office') {
    if (period === '2025') {
      // --- 2025 Office: cubicles, functional, basic tech ---
      // Desks (cubicle style)
      tiles[4][4].type = 'desk'; tiles[4][5].type = 'desk';
      tiles[4][7].type = 'desk'; tiles[4][8].type = 'desk';
      // Computers on desks
      tiles[4][4].sprite = 'computer_on_desk'; tiles[4][7].sprite = 'computer_on_desk';
      // Add more cubicle desks
      tiles[5][4].type = 'desk'; tiles[5][5].type = 'desk'; tiles[5][7].type = 'desk'; tiles[5][8].type = 'desk';
      tiles[5][4].sprite = 'computer_on_desk'; tiles[5][7].sprite = 'computer_on_desk';
      // Cubicle "walls" (bookshelves/plants)
      tiles[3][4].type = 'bookshelf'; tiles[3][5].type = 'plant'; tiles[3][7].type = 'bookshelf'; tiles[3][8].type = 'plant';
      tiles[6][4].type = 'plant'; tiles[6][5].type = 'bookshelf'; tiles[6][7].type = 'plant'; tiles[6][8].type = 'bookshelf';
      // Add chairs
      tiles[4][3].type = 'chair'; tiles[4][9].type = 'chair'; tiles[5][3].type = 'chair'; tiles[5][9].type = 'chair';
      // Meeting table and chairs
      tiles[7][6].type = 'dining_table'; tiles[7][5].type = 'chair'; tiles[7][7].type = 'chair';
      // Printer (computer as proxy)
      tiles[2][10].type = 'computer';
      // Water cooler (lamp as proxy)
      tiles[8][10].type = 'lamp';
      // Break area (bottom right)
      tiles[8][11].type = 'kitchenette'; tiles[8][12].type = 'plant';
      // Storage (top right)
      tiles[2][11].type = 'bookshelf';
      // Lamp (bottom left)
      tiles[8][2].type = 'lamp';
      // Entry/door
      tiles[9][7].type = 'door';
    } else if (period === '2030') {
      // --- 2030 Office: open, techy, collaborative ---
      // Standing desks (center)
      tiles[4][7].type = 'desk'; tiles[5][7].type = 'desk';
      // Computer bar (top right)
      tiles[2][11].type = 'computer'; tiles[2][12].type = 'computer';
      // Bookshelf (top left)
      tiles[2][2].type = 'bookshelf';
      // Lounge plant and lamp
      tiles[7][2].type = 'plant'; tiles[8][2].type = 'lamp';
      // Meeting rug (center)
      tiles[5][6].type = 'rug';
      // Entry/door
      tiles[9][7].type = 'door';

      // Add Smart Devices for 2030 Office:
      // ErgoFlow SmartDesk (on the rug at 5,6)
      tiles[5][6].sprite = 'smart_desk_productivity_2030'; 

      // InboxZero AI Filter (on the desk at 5,7)
      tiles[5][7].sprite = 'smart_email_filter_2030'; 

      // SchedulAI Pro (wall-mounted calendar panel at 4,5)
      tiles[4][5].sprite = 'smart_calendar_2030';

      // InsightAI BI Dashboard (wall-mounted display at 3,10)
      tiles[3][10].sprite = 'smart_bi_dashboard_2030';

    } else if (period === '2040') {
      // --- 2040 Office: Smart Surfaces, Early Holo-Collab ---
      // Smart desks (center)
      tiles[4][7].type = 'desk'; tiles[5][7].type = 'desk'; // Smart desks
      // Add pod dividers (plants/bookshelves as curved walls)
      tiles[4][6].type = 'plant'; tiles[4][8].type = 'bookshelf'; tiles[5][6].type = 'bookshelf'; tiles[5][8].type = 'plant';
      // Add more smart desks
      tiles[6][7].type = 'desk'; tiles[6][8].type = 'desk';
      // Ergonomic chairs
      tiles[4][9].type = 'chair'; tiles[5][9].type = 'chair'; tiles[6][9].type = 'chair';
      // Holographic collab table
      tiles[3][7].type = 'dining_table'; tiles[3][8].type = 'tv';
      // Interactive whiteboard or early holo display (top right)
      tiles[2][11].type = 'computer'; tiles[2][12].type = 'tv'; // Large interactive display
      // Bookshelf (top left)
      tiles[2][2].type = 'bookshelf';
      // Lounge plant and lamp
      tiles[7][2].type = 'plant'; tiles[8][2].type = 'lamp';
      // Meeting rug (center)
      tiles[5][6].type = 'rug';
      // Entry/door
      tiles[9][7].type = 'door';
    } else if (period === '2050') {
      // --- 2050 Office: augmented, biophilic, creative (formerly 2040) ---
      // Holo-desks (center)
      tiles[5][6].type = 'desk'; tiles[5][7].type = 'desk';
      // Holo-computer cluster (top right)
      tiles[2][11].type = 'computer'; tiles[2][12].type = 'computer';
      // Bookshelf and plant wall
      tiles[2][2].type = 'bookshelf'; tiles[2][3].type = 'plant';
      // Lamp (bottom left)
      tiles[8][2].type = 'lamp';
      // Creative rug (center)
      tiles[6][7].type = 'rug';
      // Entry/door
      tiles[9][7].type = 'door';
    } else if (period === '2070') {
      // --- 2070 Office: post-singularity, minimal, zen (formerly 2055-2100) ---
      // Minimalist desks (center)
      tiles[5][7].type = 'desk';
      // Add floating desks and zen garden
      tiles[6][6].type = 'desk'; tiles[6][8].type = 'desk'; tiles[7][7].type = 'rug'; tiles[7][8].type = 'plant';
      // AI assistant stations (lamp/plant)
      tiles[4][9].type = 'lamp'; tiles[5][9].type = 'plant';
      // Holo-walls
      tiles[3][7].type = 'tv'; tiles[3][8].type = 'computer';
      // Statement couch
      tiles[8][6].type = 'couch';
      // Holo-computer (top center)
      tiles[2][7].type = 'computer';
      // Bookshelf (top left)
      tiles[2][2].type = 'bookshelf';
      // Single plant (statement)
      tiles[7][12].type = 'plant';
      // Ambient lamp (bottom left)
      tiles[8][2].type = 'lamp';
      // Zen rug (center)
      tiles[6][7].type = 'rug';
      // Entry/door
      tiles[9][7].type = 'door';
    }
  } else if (locationId === 'medical_bay') {
    if (period === '2025') {
      // --- 2025 Medical Bay: functional, human-centered ---
      // Beds (centered)
      tiles[4][7].type = 'bed'; tiles[5][7].type = 'bed';
      // Desk (left)
      tiles[4][4].type = 'desk';
      // Computer (right)
      tiles[4][10].type = 'computer';
      // Plant and lamp
      tiles[2][2].type = 'plant'; tiles[8][2].type = 'lamp';
      // Entry/door
      tiles[9][7].type = 'door';
    } else if (period === '2030') {
      // --- 2030 Medical Bay: techy, clean, open ---
      // Beds (centered)
      tiles[4][7].type = 'bed'; tiles[5][7].type = 'bed';
      // Desk (left)
      tiles[4][4].type = 'desk';
      // Computer (right)
      tiles[4][10].type = 'computer';
      // Plant (top left), lamp (bottom left)
      tiles[2][2].type = 'plant'; tiles[8][2].type = 'lamp';
      // Entry/door
      tiles[9][7].type = 'door';
    } else if (period === '2040') {
      // --- 2040 Medical Bay: Advanced Diagnostics, Early Biophilic ---
      // Advanced beds (centered)
      tiles[4][7].type = 'bed'; tiles[5][7].type = 'bed';
      // Advanced diagnostic desk (left)
      tiles[4][4].type = 'desk';
      // Advanced computer/scanner (right)
      tiles[4][10].type = 'computer';
      // More plants, calming lamp
      tiles[2][2].type = 'plant'; tiles[7][2].type = 'plant'; // More plants
      tiles[8][2].type = 'lamp';
      // Entry/door
      tiles[9][7].type = 'door';
    } else if (period === '2050') {
      // --- 2050 Medical Bay: augmented, healing, nature (formerly 2040) ---
      // Beds (centered)
      tiles[4][7].type = 'bed'; tiles[5][7].type = 'bed';
      // Desk (left)
      tiles[4][4].type = 'desk';
      // Holo-computer (right)
      tiles[4][10].type = 'computer';
      // Plant wall (top left), lamp (bottom left)
      tiles[2][2].type = 'plant'; tiles[2][3].type = 'plant'; tiles[8][2].type = 'lamp';
      // Entry/door
      tiles[9][7].type = 'door';
    } else if (period === '2070') {
      // --- 2070 Medical Bay: post-singularity, serene (formerly 2055-2100) ---
      // Floating beds (center)
      tiles[4][7].type = 'bed'; tiles[5][7].type = 'bed';
      // Minimalist desk (left)
      tiles[4][4].type = 'desk';
      // Holo-computer (right)
      tiles[4][10].type = 'computer';
      // Single plant (statement)
      tiles[2][2].type = 'plant';
      // Ambient lamp (bottom left)
      tiles[8][2].type = 'lamp';
      // Entry/door
      tiles[9][7].type = 'door';
    }
  }

  return { width, height, tiles };
}
