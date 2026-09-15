export const SITE = {
  name: 'Josh Van Stone',
  title: 'Josh Van Stone',
  focus: 'Architecture and technical strategy',
  description:
    'Architecture and technical strategy, informed by a career across engineering, product, and program management. Creator of Grow Youth Giving.',
  locale: 'en',
  domain: 'joshvanstone.com',
} as const;

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
  { href: '/field-guide', label: 'Field Guide' },
  { href: '/giving', label: 'Giving' },
  { href: '/standards', label: 'Methods' },
] as const;

/** Profile URL already linked from Josh's Grow Youth Giving website. */
export const LINKEDIN_URL =
  'https://www.linkedin.com/in/josh-van-stone-02659aab/';

/** No public email address has been supplied. */
export const CONTACT_EMAIL = '';

export const CONTACT_LINKS = [
  { href: LINKEDIN_URL, label: 'LinkedIn' },
  { href: CONTACT_EMAIL === '' ? '' : `mailto:${CONTACT_EMAIL}`, label: 'email' },
].filter((link) => link.href !== '');

export const GIVING_URL = 'https://www.growyouthgiving.org/';

export const FOOTER_NOTE =
  'Grow Youth Giving shares a simple way to help young people learn about giving.';

export const FOOTER_LINKS = [
  { href: GIVING_URL, label: 'Grow Youth Giving', external: true },
  { href: LINKEDIN_URL, label: 'LinkedIn', external: true },
  {
    href: CONTACT_EMAIL === '' ? '' : `mailto:${CONTACT_EMAIL}`,
    label: 'Email',
    external: true,
  },
  { href: '/rss.xml', label: 'RSS', external: false },
].filter((link) => link.href !== '');

/** Resolve internal paths for root and sub-path GitHub Pages deployments. */
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
