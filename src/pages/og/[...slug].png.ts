import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { PAGE_CARDS } from '../../lib/cards';
import { renderCard, type Card } from '../../lib/og';
import { formatDate } from '../../lib/site';

export const getStaticPaths = (async () => {
  const pieces = await getCollection('writing', ({ data }) => !data.draft);

  return [
    ...Object.entries(PAGE_CARDS).map(([slug, card]) => ({
      params: { slug },
      props: { card },
    })),
    ...pieces.map((piece) => ({
      params: { slug: `writing-${piece.id}` },
      props: {
        card: {
          kicker: piece.data.series ?? 'Writing',
          title: piece.data.title,
          meta: formatDate(piece.data.date),
        } satisfies Card,
      },
    })),
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderCard(props.card as Card);
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
