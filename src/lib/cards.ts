import type { Card } from './og';
import { SITE } from './site';

/**
 * Social cards for the standing pages. Pieces are not listed here — their cards
 * are generated from the collection, so adding a Markdown file needs no edit.
 */
export const PAGE_CARDS: Record<string, Card> = {
  // The home card takes the working half of the identity line. The full line
  // is two sentences and overruns the box; the clause that survives compression
  // is the one that earned the line.
  home: {
    kicker: SITE.name,
    title: 'What changes in a software organization when AI becomes part of the system',
    meta: 'And the evidence for it',
  },
  about: { kicker: 'About', title: SITE.name },
  writing: {
    kicker: 'Writing',
    title: 'A series on one question',
    meta: SITE.name,
  },
  standards: {
    kicker: 'Standards',
    title: 'How to read an AI incident report',
    meta: SITE.name,
  },
  'field-guide': {
    kicker: 'Field Guide',
    title: 'Design Principles',
    meta: SITE.name,
  },
};
