import { describe, expect, it } from 'vitest';
import { productDemo } from './product-demo';

describe('product demo contract', () => {
  it('describes the recorded walkthrough scene by scene', () => {
    expect(productDemo.scenes.map(({ label }) => label)).toEqual([
      'Opening',
      'Home',
      'Sources',
      'Add a source',
      'Interests',
      'Delivery',
      'Archive',
      'Telegram',
      'Plans',
    ]);
    expect(productDemo.durationIso).toBe('PT2M5S');
    expect(productDemo.durationSeconds).toBe(125);
  });

  it('says what was recorded and what is not shown', () => {
    expect(productDemo.recordingNote).toMatch(/real public news sources/);
    expect(productDemo.recordingNote).toMatch(/not saved/);
    expect(productDemo.scopeNote).toMatch(/Channel editor.*in development/);
  });

  it('keeps customer identity and unsupported claims out', () => {
    const copy = JSON.stringify(productDemo);
    expect(copy).not.toMatch(/xushnudbek|customer name/i);
    expect(copy).not.toMatch(/\b\d+(?:\.\d+)?%|time saved|accuracy rate|guaranteed/i);
  });
});
