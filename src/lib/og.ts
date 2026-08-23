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
];

export interface Card {
  /** Small line above the title — the section this page belongs to. */
  kicker: string;
  title: string;
  /** Optional single line under the title: a date, a series, a summary. */
  meta?: string;
}

const INK = '#16181d';
const MUTED = '#5b6069';
const PAPER = '#fbfaf7';
const RULE = '#c9502f';

/** Plain typographic card, no imagery. 1200x630, the size LinkedIn unfurls. */
function card({ kicker, title, meta }: Card) {
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
        padding: '72px 80px',
        fontFamily: 'Inter',
        borderTop: `16px solid ${RULE}`,
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              fontSize: '26px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: MUTED,
            },
            children: kicker,
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: '24px' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    fontSize: title.length > 68 ? '58px' : '72px',
                    fontWeight: 600,
                    lineHeight: 1.15,
                    color: INK,
                  },
                  children: title,
                },
              },
              ...(meta
                ? [
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          fontSize: '30px',
                          color: MUTED,
                        },
                        children: meta,
                      },
                    },
                  ]
                : []),
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', fontSize: '28px', color: MUTED },
            children: SITE.domain,
          },
        },
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
