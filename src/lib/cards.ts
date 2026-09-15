import type { Card } from './og';
import { SITE } from './site';

/** Existing typographic card renderer, with descriptions matching each page. */
export const PAGE_CARDS: Record<string, Card> = {
  home: {
    kicker: SITE.name,
    title: SITE.focus,
    meta: 'Engineering leadership · Grow Youth Giving',
  },
  about: { kicker: 'About', title: SITE.name, meta: SITE.focus },
  writing: {
    kicker: 'Writing',
    title: 'Architecture, systems, and engineering judgment',
    meta: SITE.name,
  },
  standards: {
    kicker: 'Methods',
    title: 'How I use evidence',
    meta: SITE.name,
  },
  'field-guide': {
    kicker: 'Field Guide',
    title: 'Design Principles',
    meta: SITE.name,
  },
  giving: {
    kicker: 'Grow Youth Giving',
    title: 'A simple way to help young people learn about giving',
    meta: SITE.name,
  },
};
