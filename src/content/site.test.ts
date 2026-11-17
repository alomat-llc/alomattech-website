import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { feedSample, navigation, productScreens, site, stage, team } from './site';

const publicDir = join(process.cwd(), 'public');

describe('one-page site content', () => {
  it('sends visitors to the real app sign-in page', () => {
    expect(site.appUrl).toBe('https://app-staging.alomattech.com/sign-in');
  });

  it('links navigation to sections of the home page only', () => {
    for (const item of navigation) {
      expect(item.href).toMatch(/^\/#[a-z]+$/);
    }
  });

  it('uses screenshots that exist in public/', () => {
    for (const screen of productScreens) {
      expect(existsSync(join(publicDir, screen.src))).toBe(true);
      expect(screen.alt.length).toBeGreaterThan(10);
    }
    expect(existsSync(join(publicDir, 'screens/home.jpg'))).toBe(true);
    expect(existsSync(join(publicDir, 'screens/signin.jpg'))).toBe(true);
  });

  it('states the development stage and what is not built yet', () => {
    expect(stage.label).toBe('Early access');
    expect(stage.products.map((p) => [p.title, p.live])).toEqual([
      ['News feed', true],
      ['Channel editor', false],
    ]);
  });

  it('names the founder with a personal LinkedIn link', () => {
    expect(team).toHaveLength(1);
    expect(team[0].name).toBe('Habib Salim');
    expect(team[0].linkedin).toMatch(/^https:\/\/www\.linkedin\.com\/in\//);
  });

  it('keeps customer identity and unsupported claims out', () => {
    const copy = JSON.stringify({ site, feedSample, productScreens, stage, team });
    expect(copy).not.toMatch(/xushnudbek|customer name|investor|funded/i);
    expect(copy).not.toMatch(/\b\d+(?:\.\d+)?%|guaranteed|trusted by/i);
  });
});
