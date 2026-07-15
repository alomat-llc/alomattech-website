import { describe, expect, it } from 'vitest';
import {
  approachSteps,
  capabilities,
  experienceNotes,
  site,
} from './site';

describe('site content contract', () => {
  it('publishes the canonical Alomat identity', () => {
    expect(site.name).toBe('Alomat LLC');
    expect(site.tagline).toBe('Building signals into systems.');
    expect(site.email).toBe('hello@alomattech.com');
  });

  it('defines exactly three canonical capabilities', () => {
    expect(capabilities.map(({ title }) => title)).toEqual([
      'Agent systems',
      'Language technologies',
      'Full-stack AI products',
    ]);
  });

  it('defines the four-stage engineering approach', () => {
    expect(approachSteps.map(({ title }) => title)).toEqual([
      'Understand the signal',
      'Design the system',
      'Build the harness',
      'Observe and improve',
    ]);
  });

  it('describes experience without presenting former workplaces as clients', () => {
    const copy = JSON.stringify(experienceNotes).toLowerCase();
    expect(copy).toContain('aisha');
    expect(copy).toContain('wordexpert');
    expect(copy).not.toContain('our client');
    expect(copy).not.toContain('partnered with');
  });

  it('does not publish unverified formation claims', () => {
    const copy = JSON.stringify({
      site,
      capabilities,
      approachSteps,
      experienceNotes,
    });
    expect(copy).not.toMatch(
      /registered in new mexico|formation approved|incorporated on/i,
    );
  });
});
