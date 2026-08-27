import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, href } from '../lib/site';

export const GET: APIRoute = async (context) => {
  // The feed is titled "writing" and promises the series; Notes (the
  // colophon) stay out so subscribers get pieces, not site meta.
  const pieces = (
    await getCollection(
      'writing',
      ({ data }) => !data.draft && data.series !== 'Notes',
    )
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  // `context.site` is the origin alone; the base path is configured separately.
  // The channel link has to carry both, or a reader sent to the "homepage" of a
  // sub-path deploy lands at the host root instead of the site.
  const origin = context.site ?? new URL(`https://${SITE.domain}`);
  const home = new URL(href('/'), origin);
  const feedUrl = new URL(href('/rss.xml'), origin);

  return rss({
    title: `${SITE.name} — writing`,
    description: SITE.description,
    site: home,
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
