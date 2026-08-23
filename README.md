# joshvanstone.com

The canonical home for work published under Josh Vanstone's name. A static site:
every page is HTML generated at build time, and no page ships client-side
JavaScript.

Deployment, DNS and the custom-domain switch are in [`DEPLOY.md`](DEPLOY.md).

## Running it

```sh
npm install
npm run dev      # local server on http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve the built output
npm run check    # type-check .astro and .ts files
```

Node 22.12 or newer — Astro 7 refuses to run on anything older.

## Publishing a piece

Add one Markdown file to `src/content/writing/`. Nothing else needs editing: it
gets its own page, appears on the Writing index and the front page, enters the
feed and the sitemap, and gets a social card generated from its own title.

```markdown
---
title: The title as it appears everywhere
description: One or two sentences. Used on the index, the feed and the card.
date: 2026-08-23
series: Notes # optional
updated: 2026-09-01 # optional
draft: false # optional; a draft is left out of the build entirely
---

The piece.
```

Internal links can be written as plain absolute paths (`/standards`) — the build
adds the base path and trailing slash the host actually serves.

## What is deliberately absent

These are requirements, not preferences:

- No analytics, no cookies, and so no consent banner.
- No comments, no newsletter capture, no chat widget, no engagement mechanics.
- No client-side JavaScript. Every page renders with scripting disabled.
- No stock imagery. Social cards are typographic, generated at build time.

## Layout

| Path                            | What it holds                                          |
| ------------------------------- | ------------------------------------------------------ |
| `src/content/writing/`          | The pieces, one Markdown file each                      |
| `src/pages/`                     | Standing pages, the feed, robots.txt, the card endpoint |
| `src/layouts/Base.astro`         | The shell: head, metadata, nav, footer                  |
| `src/lib/site.ts`                | Site metadata, nav, footer links, URL helper            |
| `src/lib/og.ts`, `src/lib/cards.ts` | Social-card rendering and the standing pages' cards  |
| `src/styles/global.css`          | The whole stylesheet                                    |
| `assets/fonts/`                  | Inter, used at build time for cards only ([OFL](assets/fonts/Inter-LICENSE.txt)) |

## Things worth knowing

- **The footer's LinkedIn link is off until a profile URL is set.** Fill in
  `LINKEDIN_URL` in `src/lib/site.ts` and it appears.
- **Social cards need the fonts in `assets/fonts/`.** They are read from the
  project root at build time and never served to a browser.
- **`SITE_URL` and `BASE_PATH`** override the canonical origin and base path at
  build time. CI sets them; see `DEPLOY.md`.
