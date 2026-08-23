---
title: 'Colophon: how this site is built'
description: >-
  What this site runs on, and the deliberate absences — no analytics, no
  comments, no scripts.
date: 2026-08-23
series: Notes
---

This site is a static site. Every page is HTML generated at build time; nothing
is assembled in the reader's browser.

## What it runs on

Pages and pieces are written in Markdown and built by
[Astro](https://astro.build), which ships no client-side JavaScript for any page
here. The result is plain files served over HTTPS. Light and dark follow the
reader's operating system setting through
[`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme),
so there is no theme switch to load and nothing stored about the visit.

## What is deliberately absent

- **No analytics.** No page-view tracking, no cookies, and so no consent banner
  to dismiss.
- **No comments, no newsletter popup, no chat widget.** Nothing on the page is
  trying to capture the reader.
- **No stock imagery.** Social cards are plain type, generated at build time
  from the piece's own title.

## How to follow it

The [feed](/rss.xml) is the whole subscription mechanism. It is
[RSS 2.0](https://www.rssboard.org/rss-specification), readable by any feed
reader, and it requires no address and no account.

## Why links look like links

Every link is underlined, and links that leave the site are marked. On a site
whose [standard](/standards) is that checkable claims carry their sources, the
link is not decoration — it is the part a reader is meant to use.
