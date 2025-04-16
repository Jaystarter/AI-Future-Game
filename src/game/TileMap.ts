export type TileType = 'floor' | 'wall' | 'npc' | 'player' | 'door' | 'couch' | 'desk' | 'computer' | 'bed' | 'rug';

export interface Tile {
  type: TileType;
  x: number;
  y: number;
  sprite?: string;
  npcId?: string;
}

export interface TileMapData {
  width: number;
  height: number;
  tiles: Tile[][];
}

// Example: Home layout with furniture for each time period
export function createSimpleMap(period: string = 'present'): TileMapData {
  const width = 10;
  const height = 8;
  const tiles: Tile[][] = [];
  for (let y = 0; y < height; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < width; x++) {
      if (y === 0 || y === height - 1 || x === 0 || x === width - 1) {
        row.push({ type: 'wall', x, y });
      } else {
        row.push({ type: 'floor', x, y });
      }
    }
    tiles.push(row);
  }
  // Place player at (1,1)
  tiles[1][1].type = 'player';

  // Add furniture by period
  if (period === 'present') {
    tiles[2][2].type = 'couch';
    tiles[2][3].type = 'couch';
    tiles[2][4].type = 'couch';
    tiles[3][7].type = 'desk';
    tiles[3][8].type = 'computer';
    tiles[5][2].type = 'bed';
    tiles[6][2].type = 'bed';
    tiles[4][5].type = 'rug';
  } else if (period === 'near-future') {
    tiles[2][2].type = 'couch';
    tiles[2][3].type = 'couch';
    tiles[2][4].type = 'couch';
    tiles[3][7].type = 'desk';
    tiles[3][8].type = 'computer';
    tiles[5][2].type = 'bed';
    tiles[6][2].type = 'bed';
    tiles[4][5].type = 'rug';
    tiles[3][6].type = 'computer'; // more tech
  } else if (period === 'mid-future') {
    tiles[2][2].type = 'couch';
    tiles[2][3].type = 'couch';
    tiles[2][4].type = 'couch';
    tiles[3][7].type = 'desk';
    tiles[3][8].type = 'computer';
    tiles[3][6].type = 'computer';
    tiles[5][2].type = 'bed';
    tiles[6][2].type = 'bed';
    tiles[4][5].type = 'rug';
    tiles[5][7].type = 'computer';
  } else if (period === 'far-future') {
    tiles[2][2].type = 'couch';
    tiles[2][3].type = 'couch';
    tiles[2][4].type = 'couch';
    tiles[3][7].type = 'desk';
    tiles[3][8].type = 'computer';
    tiles[3][6].type = 'computer';
    tiles[5][2].type = 'bed';
    tiles[6][2].type = 'bed';
    tiles[4][5].type = 'rug';
    tiles[5][7].type = 'computer';
    tiles[6][7].type = 'computer'; // futuristic room
  }

  return { width, height, tiles };
}
