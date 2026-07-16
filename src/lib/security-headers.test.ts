import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const headers = readFileSync(new URL('../../public/_headers', import.meta.url), 'utf8');

describe('production security headers', () => {
  it('allows the Cloudflare Turnstile script and challenge frame used by the pilot form', () => {
    expect(headers).toMatch(
      /script-src[^;]*https:\/\/challenges\.cloudflare\.com/,
    );
    expect(headers).toMatch(
      /frame-src[^;]*https:\/\/challenges\.cloudflare\.com/,
    );
  });
});
