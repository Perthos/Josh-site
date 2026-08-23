/**
 * Normalises root-relative links written in Markdown (`/standards`) so they
 * match what the site actually serves: prefixed with the deploy's base path,
 * and given the trailing slash a static host would redirect to anyway.
 *
 * A Sätteri hast plugin — Sätteri is Astro's default Markdown processor.
 */
export function baseLinksPlugin(base) {
  const prefix = base.replace(/\/$/, '');

  return {
    name: 'base-links',
    element: {
      filter: ['a'],
      visit(node, ctx) {
        const href = node.properties?.href;
        if (
          typeof href !== 'string' ||
          !href.startsWith('/') ||
          href.startsWith('//')
        ) {
          return;
        }

        const [path, suffix = ''] = splitSuffix(href);
        const prefixed = path.startsWith(`${prefix}/`)
          ? path
          : `${prefix}${path}`;
        const isFile = /\.[a-z0-9]+$/i.test(prefixed);
        const normalised =
          isFile || prefixed.endsWith('/') ? prefixed : `${prefixed}/`;

        if (normalised + suffix !== href) {
          ctx.setProperty(node, 'href', normalised + suffix);
        }
      },
    },
  };
}

/** Splits `/writing#top` into `['/writing', '#top']`. */
function splitSuffix(href) {
  const cut = href.search(/[?#]/);
  return cut === -1 ? [href] : [href.slice(0, cut), href.slice(cut)];
}
