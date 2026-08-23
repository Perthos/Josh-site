import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, href } from '../lib/site';

export const GET: APIRoute = async (context) => {
  const pieces = (
    await getCollection('writing', ({ data }) => !data.draft)
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const site = context.site ?? new URL(`https://${SITE.domain}`);
  const feedUrl = new URL(href('/rss.xml'), site);

  return rss({
    title: `${SITE.name} — writing`,
    description: SITE.description,
    site,
    trailingSlash: true,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    items: pieces.map((piece) => ({
      title: piece.data.title,
      description: piece.data.description,
      pubDate: piece.data.date,
      link: href(`/writing/${piece.id}`),
      categories: piece.data.series ? [piece.data.series] : undefined,
    })),
    customData: [
      `<language>${SITE.locale}</language>`,
      `<atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>`,
    ].join(''),
  });
};
