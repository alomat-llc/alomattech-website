import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { appUrl, copy, languages, screenFiles, site } from './site';

const publicDir = join(process.cwd(), 'public');

/** Every string leaf of an object, with its path. */
function leaves(value: unknown, path = ''): [string, string][] {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => leaves(v, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => leaves(v, path ? `${path}.${k}` : k));
  }
  return [];
}

describe('one-page site content', () => {
  it('sends visitors to the real app sign-in page in their language', () => {
    expect(appUrl('en')).toBe('https://app-staging.alomattech.com/sign-in?lang=en');
    expect(appUrl('uz')).toBe('https://app-staging.alomattech.com/sign-in?lang=uz');
  });

  it('has the same copy structure in every language', () => {
    const shape = (lang: (typeof languages)[number]) =>
      leaves(copy[lang]).map(([path]) => path).sort();
    for (const lang of languages) {
      expect(shape(lang)).toEqual(shape('en'));
      for (const [path, text] of leaves(copy[lang])) {
        expect(text.trim().length, `${lang}.${path}`).toBeGreaterThan(0);
      }
    }
  });

  it('writes Uzbek o‘ and g‘ with one apostrophe style', () => {
    const uz = leaves(copy.uz).map(([, text]) => text).join('\n');
    expect(uz).not.toMatch(/[og][ʻ'`]/);
  });

  it('uses screenshots that exist in public/', () => {
    for (const src of Object.values(screenFiles)) {
      expect(existsSync(join(publicDir, src)), src).toBe(true);
    }
  });

  it('states the stage and what is not built yet in every language', () => {
    for (const lang of languages) {
      expect(copy[lang].stage.products.map((p) => p.live)).toEqual([true, false]);
    }
  });

  it('names the founder with a personal LinkedIn link', () => {
    expect(site.founderLinkedin).toMatch(/^https:\/\/www\.linkedin\.com\/in\//);
    expect(copy.en.company.founder).toBe('Habib Salim, Founder');
  });

  it('keeps customer identity and unsupported claims out', () => {
    const text = JSON.stringify(copy);
    expect(text).not.toMatch(/xushnudbek|customer name|investor|funded/i);
    expect(text).not.toMatch(/\b\d+(?:\.\d+)?%|guaranteed|trusted by/i);
  });
});
