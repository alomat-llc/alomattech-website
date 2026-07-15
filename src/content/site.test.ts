import { describe, expect, it } from 'vitest';
import {
  capabilities,
  deploymentPatterns,
  experienceNotes,
  faqItems,
  managedOffer,
  navigation,
  productModules,
  publishingWorkflow,
  servicePages,
  site,
} from './site';

describe('site content contract', () => {
  it('publishes the canonical Alomat identity', () => {
    expect(site.name).toBe('Alomat LLC');
    expect(site.email).toBe('hello@alomattech.com');
    expect(site.github).toBe('https://github.com/alomat-llc/alomattech-website');
  });

  it('publishes the approved managed SaaS positioning', () => {
    expect(site.category).toBe('Agentic publishing operations platform');
    expect(site.tagline).toBe('Turn trusted sources into publish-ready content.');
    expect(site.description).toMatch(/managed agentic publishing platform/i);
    expect(navigation.map(({ label }) => label)).toEqual([
      'Product',
      'Workflow',
      'Deployments',
      'About',
      'FAQ',
    ]);
  });

  it('defines the complete source-to-delivery product loop', () => {
    expect(productModules.map(({ title }) => title)).toEqual([
      'Source Intelligence',
      'Editorial Memory',
      'Agent Workflow',
      'Content Packaging',
      'Human Control',
      'Operations & Evaluation',
    ]);
    expect(publishingWorkflow.map(({ title }) => title)).toEqual([
      'Monitor',
      'Verify',
      'Understand',
      'Produce',
      'Review',
      'Learn',
    ]);
  });

  it('uses anonymous factual production evidence', () => {
    const copy = JSON.stringify({ deploymentPatterns, managedOffer });
    expect(copy).toMatch(/active digital publisher/i);
    expect(copy).not.toMatch(/xushnudbek|uzbek|telegram|customer logo/i);
  });

  it('keeps the SaaS claim boundary intact', () => {
    const copy = JSON.stringify({
      site,
      productModules,
      publishingWorkflow,
      deploymentPatterns,
      managedOffer,
    });
    expect(copy).not.toMatch(
      /guaranteed|accuracy rate|customers served|revenue|funded by|official partner|fully autonomous publishing/i,
    );
  });

  it('defines exactly three canonical capabilities', () => {
    expect(capabilities.map(({ title }) => title)).toEqual([
      'Agent systems',
      'Language technologies',
      'Full-stack AI products',
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
      publishingWorkflow,
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

  it('answers managed publishing buyer questions', () => {
    const questions = faqItems.map(({ question }) => question);
    expect(questions).toEqual(
      expect.arrayContaining([
        'What does the Alomat publishing platform do?',
        'What does managed SaaS mean at Alomat?',
        'Does a human approve content before delivery?',
        'How does editorial memory work?',
        'How does a managed pilot begin?',
      ]),
    );
  });

  it('positions technical pages as platform foundations', () => {
    const copy = JSON.stringify(servicePages);
    expect(copy).toMatch(/publishing platform/i);
    expect(copy).not.toMatch(
      /general software agency|custom software for any industry/i,
    );
  });

  it('keeps search content inside the verified claim boundary', () => {
    const copy = JSON.stringify({ servicePages, faqItems, site });
    expect(copy).not.toMatch(
      /our clients|trusted by|award-winning|guaranteed|us-based|headquartered|founded in|employees|five-star/i,
    );
  });
});
