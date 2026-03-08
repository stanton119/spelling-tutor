export interface Word {
  id: string;
  word: string;
  image: string;
  level: number;
}

export const words: Word[] = [
  // Level 1: 3-4 letters
  { id: '1-1', word: 'CAT', image: '🐱', level: 1 },
  { id: '1-2', word: 'DOG', image: '🐶', level: 1 },
  { id: '1-3', word: 'SUN', image: '☀️', level: 1 },
  { id: '1-4', word: 'HAT', image: '👒', level: 1 },
  { id: '1-5', word: 'BED', image: '🛏️', level: 1 },
  { id: '1-6', word: 'CUP', image: '🥛', level: 1 },
  { id: '1-7', word: 'BAT', image: '🦇', level: 1 },
  { id: '1-8', word: 'PIG', image: '🐷', level: 1 },
  { id: '1-9', word: 'BUS', image: '🚌', level: 1 },
  { id: '1-10', word: 'CAR', image: '🚗', level: 1 },
  { id: '1-11', word: 'PEN', image: '🖊️', level: 1 },
  { id: '1-12', word: 'JAM', image: '🍯', level: 1 },
  { id: '1-13', word: 'BOX', image: '📦', level: 1 },
  { id: '1-14', word: 'COW', image: '🐮', level: 1 },
  { id: '1-15', word: 'FAN', image: '🌀', level: 1 },
  { id: '1-16', word: 'KEY', image: '🔑', level: 1 },
  { id: '1-17', word: 'MUD', image: '💩', level: 1 },
  { id: '1-18', word: 'ANT', image: '🐜', level: 1 },
  { id: '1-19', word: 'APE', image: '🦍', level: 1 },
  { id: '1-20', word: 'BUG', image: '🐞', level: 1 },
  { id: '1-21', word: 'MAP', image: '🗺️', level: 1 },
  { id: '1-22', word: 'NET', image: '🕸️', level: 1 },
  { id: '1-23', word: 'POT', image: '🍲', level: 1 },
  { id: '1-24', word: 'RAT', image: '🐀', level: 1 },
  { id: '1-25', word: 'SKY', image: '🌤️', level: 1 },
  { id: '1-26', word: 'TEA', image: '🍵', level: 1 },
  { id: '1-27', word: 'TOY', image: '🧸', level: 1 },
  { id: '1-28', word: 'VAN', image: '🚐', level: 1 },
  { id: '1-29', word: 'WEB', image: '🕸️', level: 1 },
  { id: '1-30', word: 'ZEB', image: '🦓', level: 1 },

  // Level 2: 4-5 letters
  { id: '2-1', word: 'FROG', image: '🐸', level: 2 },
  { id: '2-2', word: 'TREE', image: '🌳', level: 2 },
  { id: '2-3', word: 'BIRD', image: '🐦', level: 2 },
  { id: '2-4', word: 'FISH', image: '🐟', level: 2 },
  { id: '2-5', word: 'BOAT', image: '⛵', level: 2 },
  { id: '2-6', word: 'CAKE', image: '🍰', level: 2 },
  { id: '2-7', word: 'MOON', image: '🌙', level: 2 },
  { id: '2-8', word: 'STAR', image: '⭐', level: 2 },
  { id: '2-9', word: 'BALL', image: '⚽', level: 2 },
  { id: '2-10', word: 'BOOK', image: '📖', level: 2 },

  // Level 3: 5-6 letters
  { id: '3-1', word: 'APPLE', image: '🍎', level: 3 },
  { id: '3-2', word: 'HOUSE', image: '🏠', level: 3 },
  { id: '3-3', word: 'TRAIN', image: '🚆', level: 3 },
  { id: '3-4', word: 'TRUCK', image: '🚚', level: 3 },
  { id: '3-5', word: 'CHAIR', image: '🪑', level: 3 },
  { id: '3-6', word: 'PLANE', image: '✈️', level: 3 },
  { id: '3-7', word: 'MOUSE', image: '🐭', level: 3 },
  { id: '3-8', word: 'SNAKE', image: '🐍', level: 3 },
  { id: '3-9', word: 'BREAD', image: '🍞', level: 3 },
  { id: '3-10', word: 'WATER', image: '💧', level: 3 },

  // Level 4: 6-7 letters
  { id: '4-1', word: 'BANANA', image: '🍌', level: 4 },
  { id: '4-2', word: 'TURTLE', image: '🐢', level: 4 },
  { id: '4-3', word: 'ROCKET', image: '🚀', level: 4 },
  { id: '4-4', word: 'FLOWER', image: '🌸', level: 4 },
  { id: '4-5', word: 'WINDOW', image: '🪟', level: 4 },
  { id: '4-6', word: 'SCHOOL', image: '🏫', level: 4 },
  { id: '4-7', word: 'MONKEY', image: '🐒', level: 4 },
  { id: '4-8', word: 'RABBIT', image: '🐰', level: 4 },
  { id: '4-9', word: 'SPIDER', image: '🕷️', level: 4 },
  { id: '4-10', word: 'ORANGE', image: '🍊', level: 4 },

  // Level 5: 7+ letters
  { id: '5-1', word: 'ELEPHANT', image: '🐘', level: 5 },
  { id: '5-2', word: 'DINOSAUR', image: '🦖', level: 5 },
  { id: '5-3', word: 'COMPUTER', image: '💻', level: 5 },
  { id: '5-4', word: 'MOUNTAIN', image: '🏔️', level: 5 },
  { id: '5-5', word: 'AIRPLANE', image: '🛩️', level: 5 },
  { id: '5-6', word: 'BICYCLE', image: '🚲', level: 5 },
  { id: '5-7', word: 'RAINBOW', image: '🌈', level: 5 },
  { id: '5-8', word: 'UMBRELLA', image: '☂️', level: 5 },
  { id: '5-9', word: 'BACKPACK', image: '🎒', level: 5 },
  { id: '5-10', word: 'PENGUIN', image: '🐧', level: 5 },
];
