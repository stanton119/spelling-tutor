const vowels = ['a', 'e', 'i', 'o', 'u'];
const phoneticSubstitutions: Record<string, string[]> = {
  'c': ['k', 's'],
  'k': ['c'],
  's': ['c', 'z'],
  'z': ['s'],
  'f': ['ph'],
  'ph': ['f'],
  'j': ['g'],
  'g': ['j'],
  'ee': ['ea', 'ie'],
  'ea': ['ee'],
  'ie': ['ei', 'ee'],
  'oo': ['u'],
  'u': ['oo'],
};

export const generateDistractors = (word: string, count: number): string[] => {
  const distractors = new Set<string>();
  const lowerWord = word.toLowerCase();

  while (distractors.size < count) {
    let distractor = lowerWord;
    const strategy = Math.random();

    if (strategy < 0.3) {
      // Swap two adjacent letters
      if (lowerWord.length > 1) {
        const i = Math.floor(Math.random() * (lowerWord.length - 1));
        const chars = lowerWord.split('');
        [chars[i], chars[i+1]] = [chars[i+1], chars[i]];
        distractor = chars.join('');
      }
    } else if (strategy < 0.6) {
      // Substitute a vowel
      const vowelIndices = [];
      for (let i = 0; i < lowerWord.length; i++) {
        if (vowels.includes(lowerWord[i])) vowelIndices.push(i);
      }
      if (vowelIndices.length > 0) {
        const i = vowelIndices[Math.floor(Math.random() * vowelIndices.length)];
        const newVowel = vowels[Math.floor(Math.random() * vowels.length)];
        const chars = lowerWord.split('');
        chars[i] = newVowel;
        distractor = chars.join('');
      }
    } else {
      // Phonetic or common replacement
      const chars = lowerWord.split('');
      const i = Math.floor(Math.random() * chars.length);
      const char = chars[i];
      if (phoneticSubstitutions[char]) {
        const replacement = phoneticSubstitutions[char][Math.floor(Math.random() * phoneticSubstitutions[char].length)];
        chars[i] = replacement;
        distractor = chars.join('');
      } else {
        // Random char replacement as fallback
        const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        chars[i] = randomChar;
        distractor = chars.join('');
      }
    }

    if (distractor !== lowerWord) {
      distractors.add(distractor);
    }
    
    // Safety break if we can't find unique distractors (unlikely with random)
    if (distractors.size < count && distractors.size > 0 && Math.random() > 0.99) break;
  }

  return Array.from(distractors);
};
