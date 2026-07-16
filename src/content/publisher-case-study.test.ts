import { describe, expect, it } from 'vitest';
import { publisherCaseStudy } from './publisher-case-study';

describe('anonymous publisher case-study content contract', () => {
  it('defines the approved source-to-package workflow', () => {
    expect(publisherCaseStudy.workflow.map(({ title }) => title)).toEqual([
      'Monitor',
      'Verify',
      'Remember',
      'Produce',
      'Review',
      'Package',
    ]);
  });

  it('keeps human approval between agent output and delivery', () => {
    expect(publisherCaseStudy.architecture.map(({ title }) => title)).toEqual([
      'Source layer',
      'Intelligence layer',
      'Agent workflow',
      'Human review and approval',
      'Delivery layer',
    ]);
    expect(publisherCaseStudy.controlStatement).toBe(
      'The agents prepare. Editors decide.',
    );
  });

  it('defines three real-evidence asset contracts', () => {
    expect(publisherCaseStudy.evidence).toHaveLength(3);
    expect(publisherCaseStudy.evidence.map(({ src }) => src)).toEqual([
      '/case-study/publisher-workflow/source-monitoring.webp',
      '/case-study/publisher-workflow/human-review.webp',
      '/case-study/publisher-workflow/publish-ready-package.webp',
    ]);
    for (const item of publisherCaseStudy.evidence) {
      expect(item.width).toBe(1600);
      expect(item.height).toBe(900);
      expect(item.alt.length).toBeGreaterThan(20);
      expect(item.caption.length).toBeGreaterThan(60);
    }
  });

  it('contains only anonymous and non-quantified public claims', () => {
    const copy = JSON.stringify(publisherCaseStudy);
    expect(copy).not.toMatch(
      /xushnudbek|uzbek|uzbekistan|telegram|customer logo|channel name|audience size/i,
    );
    expect(copy).not.toMatch(
      /\b\d+(?:\.\d+)?%|customers served|time saved|cost savings|accuracy rate|uptime|revenue|guaranteed/i,
    );
  });

  it('points conversion to the real product and pilot routes', () => {
    expect(publisherCaseStudy.primaryCta).toEqual({
      label: 'Request a managed pilot',
      href: '/pilot',
    });
    expect(publisherCaseStudy.secondaryCta).toEqual({
      label: 'Explore the platform',
      href: '/platform',
    });
  });
});
