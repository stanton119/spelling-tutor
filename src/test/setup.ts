import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock AudioContext for tests
class MockAudioContext {
  state = 'suspended';
  currentTime = 0;
  destination = {};

  resume = vi.fn().mockResolvedValue(undefined);
  
  createOscillator = vi.fn().mockReturnValue({
    type: '',
    frequency: {
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
  });

  createGain = vi.fn().mockReturnValue({
    gain: {
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
    connect: vi.fn(),
  });
}

vi.stubGlobal('AudioContext', MockAudioContext);
vi.stubGlobal('webkitAudioContext', MockAudioContext);
