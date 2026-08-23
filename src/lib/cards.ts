import type { Card } from './og';
import { SITE } from './site';

/**
 * Social cards for the standing pages. Pieces are not listed here — their cards
 * are generated from the collection, so adding a Markdown file needs no edit.
 */
export const PAGE_CARDS: Record<string, Card> = {
  home: { kicker: SITE.name, title: SITE.description },
  about: { kicker: 'About', title: SITE.name },
  writing: {
    kicker: 'Writing',
    title: 'Pieces, in series',
    meta: SITE.name,
  },
  standards: {
    kicker: 'Standards',
    title: 'How the work is checked',
    meta: SITE.name,
  },
  'field-guide': {
    kicker: 'Field Guide',
    title: 'Field Guide',
    meta: SITE.name,
  },
};
