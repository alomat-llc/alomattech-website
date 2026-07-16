import { describe, expect, it } from 'vitest';
import { productDemo } from './product-demo';

describe('anonymous product demo contract', () => {
  it('defines a complete 60-second source-to-decision narrative', () => {
    expect(productDemo.durationSeconds).toBe(60);
    expect(productDemo.scenes.map(({ title }) => title)).toEqual([
      'Signals arrive fragmented.',
      'Monitor approved sources.',
      'Verify before drafting.',
      'Bring editorial memory forward.',
      'Coordinate specialist agents.',
      'Prepare one review package.',
      'Keep the decision human.',
      'Start with one real workflow.',
    ]);
    expect(productDemo.scenes.reduce((total, scene) => total + scene.durationSeconds, 0)).toBe(60);
  });

  it('keeps the product and evidence boundary explicit', () => {
    const copy = JSON.stringify(productDemo);
    expect(copy).toMatch(/representative product walkthrough/i);
    expect(copy).toMatch(/agents prepare\. editors decide\./i);
    expect(copy).not.toMatch(/xushnudbek|uzbek|telegram|customer name/i);
    expect(copy).not.toMatch(/\b\d+(?:\.\d+)?%|time saved|accuracy rate|guaranteed/i);
  });
});

