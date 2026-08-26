export const SITE = {
  name: 'Josh Van Stone',
  title: 'Josh Van Stone',
  /**
   * The identity line, Variant A, ruled in the career-narrative record and
   * protected under compression: the last clause is why it won.
   */
  description:
    'Engineering executive and practicing architect. I work out what changes in a software organization when AI becomes part of the system, and I show the evidence.',
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
 * The operator's LinkedIn profile URL. Left empty on purpose: the footer and
 * contact slots are wired, but a guessed profile URL would ship a wrong link.
 * Fill this in and the LinkedIn link appears everywhere the footer renders,
 * and the About's closing gains its reach-me sentence.
 */
export const LINKEDIN_URL = '';

/**
 * A public contact address, if the operator wants one. Same rule as
 * LINKEDIN_URL: wired, empty until supplied, never guessed.
 */
export const CONTACT_EMAIL = '';

/**
 * The channels a reader can actually answer through. The site asks for
 * disagreement on every surface; this is where the ask stops being
 * rhetorical. Empty entries drop out, so with both blanks unset the contact
 * sentence and footer links simply do not render.
 */
export const CONTACT_LINKS = [
  { href: LINKEDIN_URL, label: 'LinkedIn' },
  { href: CONTACT_EMAIL === '' ? '' : `mailto:${CONTACT_EMAIL}`, label: 'email' },
].filter((link) => link.href !== '');

/**
 * A one-line description of the growyouthgiving strand, compressed from the
 * Volunteering entry text ("Built to share the idea" carries the authorship).
 * Deliberately no more than this: what the strand does next is an open
 * decision and the site must not pre-empt it.
 */
export const FOOTER_NOTE =
  'I built growyouthgiving.org: a kit and a story for teaching families affordable, approachable youth philanthropy.';

export const FOOTER_LINKS = [
  {
    href: 'https://growyouthgiving.org',
    label: 'growyouthgiving.org',
    external: true,
  },
  { href: LINKEDIN_URL, label: 'LinkedIn', external: true },
  {
    href: CONTACT_EMAIL === '' ? '' : `mailto:${CONTACT_EMAIL}`,
    label: 'Email',
    external: true,
  },
  { href: '/writing/colophon', label: 'Colophon', external: false },
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
