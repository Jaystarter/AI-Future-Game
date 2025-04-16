export interface NPC {
  id: string;
  name: string;
  x: number;
  y: number;
  dialogue: string[];
  period: string;
}

export const sampleNPCs: NPC[] = [
  {
    id: 'npc1',
    name: 'Alex',
    x: 3,
    y: 3,
    dialogue: [
      "Welcome to the present! AI is everywhere, but still learning.",
      "Check back in the future to see how things change!"
    ],
    period: 'present',
  },
  {
    id: 'npc2',
    name: 'FutureBot',
    x: 6,
    y: 5,
    dialogue: [
      "In the far future, AI and humans collaborate closely.",
      "What will you discover next?"
    ],
    period: 'far-future',
  },
];
