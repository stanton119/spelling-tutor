const vowels = ['A', 'E', 'I', 'O', 'U'];
const phoneticSubstitutions: Record<string, string[]> = {
  'C': ['K', 'S'],
  'K': ['C'],
  'S': ['C', 'Z'],
  'Z': ['S'],
  'F': ['PH'],
  'PH': ['F'],
  'J': ['G'],
  'G': ['J'],
  'EE': ['EA', 'IE'],
  'EA': ['EE'],
  'IE': ['EI', 'EE'],
  'OO': ['U'],
  'U': ['OO'],
};

export const generateDistractors = (word: string, count: number): string[] => {
  const distractors = new Set<string>();
  const upperWord = word.toUpperCase();

  while (distractors.size < count) {
    let distractor = upperWord;
    const strategy = Math.random();

    if (strategy < 0.3) {
      // Swap two adjacent letters
      if (upperWord.length > 1) {
        const i = Math.floor(Math.random() * (upperWord.length - 1));
        const chars = upperWord.split('');
        [chars[i], chars[i+1]] = [chars[i+1], chars[i]];
        distractor = chars.join('');
      }
    } else if (strategy < 0.6) {
      // Substitute a vowel
      const vowelIndices = [];
      for (let i = 0; i < upperWord.length; i++) {
        if (vowels.includes(upperWord[i])) vowelIndices.push(i);
      }
      if (vowelIndices.length > 0) {
        const i = vowelIndices[Math.floor(Math.random() * vowelIndices.length)];
        const newVowel = vowels[Math.floor(Math.random() * vowels.length)];
        const chars = upperWord.split('');
        chars[i] = newVowel;
        distractor = chars.join('');
      }
    } else {
      // Phonetic or common replacement
      const chars = upperWord.split('');
      const i = Math.floor(Math.random() * chars.length);
      const char = chars[i];
      if (phoneticSubstitutions[char]) {
        const replacement = phoneticSubstitutions[char][Math.floor(Math.random() * phoneticSubstitutions[char].length)];
        chars[i] = replacement;
        distractor = chars.join('');
      } else {
        // Random char replacement as fallback
        const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        chars[i] = randomChar;
        distractor = chars.join('');
      }
    }

    if (distractor !== upperWord) {
      distractors.add(distractor);
    }
    
    // Safety break if we can't find unique distractors (unlikely with random)
    if (distractors.size < count && distractors.size > 0 && Math.random() > 0.99) break;
  }

  return Array.from(distractors);
};
