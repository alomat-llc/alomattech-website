import { describe, expect, it } from 'vitest';
import { productDemo } from './product-demo';

describe('anonymous product demo contract', () => {
  it('defines a complete 60-second source-to-decision narrative', () => {
    expect(productDemo.durationSeconds).toBe(60);
    expect(productDemo.scenes.map(({ title }) => title)).toEqual([
      'One story, several sources.',
      'Only approved sources count.',
      'Grouped and traced before drafting.',
      'Your voice, remembered.',
      'Drafted in visible stages.',
      'One package to review.',
      'The decision stays human.',
      'Start with one real workflow.',
    ]);
    expect(productDemo.scenes.reduce((total, scene) => total + scene.durationSeconds, 0)).toBe(60);
  });

  it('keeps the product and evidence boundary explicit', () => {
    const copy = JSON.stringify(productDemo);
    expect(copy).toMatch(/representative product walkthrough/i);
    expect(copy).toMatch(/agents prepare\. editors decide\./i);
    expect(copy).toMatch(/representative example\. not customer data\./i);
    expect(copy).not.toMatch(/xushnudbek|uzbek|telegram|customer name/i);
    expect(copy).not.toMatch(/\b\d+(?:\.\d+)?%|time saved|accuracy rate|guaranteed/i);
  });
});

