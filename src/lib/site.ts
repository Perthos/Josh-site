export const SITE = {
  name: 'Josh Van Stone',
  title: 'Josh Van Stone',
  description:
    'Writing on youth philanthropy, and the standards the writing is held to. Every claim carries its source.',
  locale: 'en',
  /**
   * Canonical home. Kept in sync with `site` in astro.config.mjs. The surname
   * is two words; the domain closes it up because a hostname cannot hold a
   * space.
   */
  domain: 'joshvanstone.com',
} as const;

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
  { href: '/standards', label: 'Standards' },
  { href: '/field-guide', label: 'Field Guide' },
] as const;

/**
 * The operator's LinkedIn profile URL. Left empty on purpose: the footer slot
 * is wired, but a guessed profile URL would ship a wrong link. Fill this in and
 * the LinkedIn link appears everywhere the footer renders.
 */
export const LINKEDIN_URL = '';

export const FOOTER_LINKS = [
  {
    href: 'https://growyouthgiving.org',
    label: 'growyouthgiving.org',
    external: true,
  },
  { href: LINKEDIN_URL, label: 'LinkedIn', external: true },
  { href: '/rss.xml', label: 'RSS', external: false },
].filter((link) => link.href !== '');

/**
 * Base-aware URL for an in-site path. Internal links must go through this so a
 * placeholder deploy under a sub-path (e.g. /Josh-site) resolves correctly.
 *
 * Page URLs carry a trailing slash because that is what a static host serves a
 * directory as; linking without one costs every visitor a redirect. Files
 * (anything with an extension) are left alone.
 */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const rest = path.replace(/^\//, '').replace(/\/$/, '');
  if (!rest) return `${base}/`;
  const isFile = /\.[a-z0-9]+$/i.test(rest);
  return `${base}/${rest}${isFile ? '' : '/'}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
