import { describe, expect, it } from 'vitest';
import { site } from './site';

describe('site content contract', () => {
  it('publishes the canonical Alomat identity', () => {
    expect(site.name).toBe('Alomat LLC');
    expect(site.tagline).toBe('Building signals into systems.');
    expect(site.email).toBe('hello@alomattech.com');
  });
});
