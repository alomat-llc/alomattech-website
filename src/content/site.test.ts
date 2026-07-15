import { describe, expect, it } from 'vitest';
import {
  approachSteps,
  capabilities,
  experienceNotes,
  faqItems,
  servicePages,
  site,
} from './site';

describe('site content contract', () => {
  it('publishes the canonical Alomat identity', () => {
    expect(site.name).toBe('Alomat LLC');
    expect(site.tagline).toBe('Building signals into systems.');
    expect(site.email).toBe('hello@alomattech.com');
    expect(site.github).toBe('https://github.com/alomat-llc/alomattech-website');
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

  it('defines the three canonical search service pages', () => {
    expect(servicePages.map(({ slug }) => slug)).toEqual([
      'agent-systems',
      'multilingual-ai',
      'full-stack-ai-products',
    ]);
  });

  it('gives every service unique metadata and complete buyer-facing sections', () => {
    expect(new Set(servicePages.map(({ seoTitle }) => seoTitle)).size).toBe(3);
    expect(new Set(servicePages.map(({ description }) => description)).size).toBe(3);

    for (const service of servicePages) {
      expect(service.seoTitle.length).toBeGreaterThan(25);
      expect(service.description.length).toBeGreaterThan(80);
      expect(service.definition.length).toBeGreaterThan(80);
      expect(service.outcomes.length).toBeGreaterThanOrEqual(3);
      expect(service.deliverables.length).toBeGreaterThanOrEqual(4);
      expect(service.process.length).toBe(4);
      expect(service.relatedSlugs.length).toBe(2);
    }
  });

  it('publishes direct answers for common buyer and reviewer questions', () => {
    expect(faqItems.length).toBeGreaterThanOrEqual(6);
    for (const item of faqItems) {
      expect(item.question).toMatch(/\?$/);
      expect(item.answer.length).toBeGreaterThan(70);
    }
  });

  it('keeps search content inside the verified claim boundary', () => {
    const copy = JSON.stringify({ servicePages, faqItems, site });
    expect(copy).not.toMatch(
      /our clients|trusted by|award-winning|guaranteed|us-based|headquartered|founded in|employees|five-star/i,
    );
  });
});
