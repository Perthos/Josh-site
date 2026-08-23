// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { baseLinksPlugin } from './base-links-plugin.mjs';

// The site is built for its canonical home. CI overrides both values so the
// same commit can deploy to a *.github.io placeholder until DNS lands; see
// DEPLOY.md.
const site = process.env.SITE_URL || 'https://joshvanstone.com';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  // Pages are emitted as directories, which every static host serves with a
  // trailing slash. Canonical URLs, the feed and internal links all match that,
  // so no link costs a visitor a redirect.
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { format: 'directory' },
  markdown: {
    processor: satteri({ hastPlugins: [baseLinksPlugin(base)] }),
  },
});
