import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { SITE } from './site';

// Build-time only: these faces render the social cards and are never served to
// a browser. Read from the project root rather than through `import.meta.url`,
// which does not survive Astro's bundling of the prerender entrypoint.
const fontFile = (name: string) =>
  readFileSync(join(process.cwd(), 'assets', 'fonts', name));

const fonts = [
  {
    name: 'Inter',
    weight: 400 as const,
    style: 'normal' as const,
    data: fontFile('Inter-Regular.ttf'),
  },
  {
    name: 'Inter',
    weight: 600 as const,
    style: 'normal' as const,
    data: fontFile('Inter-SemiBold.ttf'),
  },
  {
    name: 'Newsreader',
    weight: 400 as const,
    style: 'normal' as const,
    data: fontFile('Newsreader-Regular.ttf'),
  },
  {
    name: 'Newsreader',
    weight: 600 as const,
    style: 'normal' as const,
    data: fontFile('Newsreader-SemiBold.ttf'),
  },
];

export interface Card {
  /** Small line above the title — the section this page belongs to. */
  kicker: string;
  title: string;
  /** Optional single line under the title: a date, a series, a summary. */
  meta?: string;
}

const INK = '#1a1c1f';
const MUTED = '#5f6570';
const PAPER = '#faf8f3';
const ACCENT = '#9e3412';
const RULE = '#e6e1d7';

/** Titles run long; drop a step rather than let satori clip the box. */
function titleSize(title: string): string {
  if (title.length > 88) return '52px';
  if (title.length > 60) return '62px';
  return '74px';
}

/**
 * Plain typographic card, no imagery. 1200x630, the size LinkedIn unfurls.
 * Same parts as a page header on the site — accent rule, kicker, serif title,
 * dateline — so a card and the page it points at read as one thing.
 */
function card({ kicker, title, meta }: Card) {
  const row = (children: unknown[], style: Record<string, unknown> = {}) => ({
    type: 'div',
    props: { style: { display: 'flex', ...style }, children },
  });
  const text = (content: string, style: Record<string, unknown>) => ({
    type: 'div',
    props: { style: { display: 'flex', ...style }, children: content },
  });

  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: PAPER,
        padding: '76px 88px 60px',
        fontFamily: 'Inter',
        borderTop: `10px solid ${ACCENT}`,
      },
      children: [
        text(kicker, {
          fontSize: '25px',
          fontWeight: 500,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: MUTED,
        }),
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column' },
            children: [
              text(title, {
                fontFamily: 'Newsreader',
                fontSize: titleSize(title),
                fontWeight: 600,
                lineHeight: 1.14,
                letterSpacing: '-0.015em',
                color: INK,
              }),
              ...(meta
                ? [
                    text(meta, {
                      marginTop: '28px',
                      fontSize: '28px',
                      color: MUTED,
                    }),
                  ]
                : []),
            ],
          },
        },
        row([text(SITE.domain, { fontSize: '26px', color: MUTED })], {
          borderTop: `1px solid ${RULE}`,
          paddingTop: '26px',
        }),
      ],
    },
  };
}

export async function renderCard(input: Card): Promise<Buffer> {
  const svg = await satori(card(input) as never, {
    width: 1200,
    height: 630,
    fonts,
  });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
    .render()
    .asPng();
}
