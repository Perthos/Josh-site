import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// One Markdown file under src/content/writing/ is a whole piece: it appears in
// the Writing index, the feed and the sitemap, and gets its own social card,
// with no other edit anywhere in the repo.
const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    series: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
