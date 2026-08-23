# Deploying

The site builds to static files in `dist/`. Any static host can serve it. What
is wired today is GitHub Pages, deployed by Actions on every push to `main`
(`.github/workflows/deploy.yml`).

## How the URL is decided

The build reads two environment variables:

| Variable    | Default                    | Meaning                        |
| ----------- | -------------------------- | ------------------------------ |
| `SITE_URL`  | `https://joshvanstone.com` | Origin used for canonical URLs, the feed, the sitemap and social-card URLs |
| `BASE_PATH` | `/`                        | Path prefix the site is served under |

CI does not hard-code either. `actions/configure-pages` reports what Pages will
actually serve on, and the workflow passes that through. So:

- **Before the custom domain is set** — the site deploys to
  `https://<owner>.github.io/<repo>/` and every URL in the output matches that.
- **After the custom domain is set** — the same action reports
  `https://joshvanstone.com` with a base path of `/`, and the next deploy uses
  it. No file in this repo changes.

## First deploy

1. Push to `main`. The workflow runs and calls `configure-pages` with
   `enablement: true`, which turns Pages on for the repo if it is off.
2. If the run fails at that step, enable it by hand: **Settings → Pages →
   Build and deployment → Source: GitHub Actions**, then re-run the workflow.
3. The deployed URL is on the workflow run's `deploy` job.

## Wiring joshvanstone.com

The domain is registered at Cloudflare, so DNS lives there.

**1. Add the DNS records** in the Cloudflare dashboard for `joshvanstone.com`.
For the apex, four A records and four AAAA records, all pointing at GitHub Pages:

```
A     joshvanstone.com  185.199.108.153
A     joshvanstone.com  185.199.109.153
A     joshvanstone.com  185.199.110.153
A     joshvanstone.com  185.199.111.153
AAAA  joshvanstone.com  2606:50c0:8000::153
AAAA  joshvanstone.com  2606:50c0:8001::153
AAAA  joshvanstone.com  2606:50c0:8002::153
AAAA  joshvanstone.com  2606:50c0:8003::153
CNAME www               <owner>.github.io
```

Set every record to **DNS only** (grey cloud), not proxied. GitHub has to reach
the domain directly to issue its TLS certificate, and Cloudflare's proxy blocks
that check. Confirm the current addresses against GitHub's own instructions
before pasting: [Managing a custom domain for your GitHub Pages
site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

**2. Set the domain in GitHub**: Settings → Pages → Custom domain →
`joshvanstone.com` → Save. The setting persists across Actions deploys; there is
no `CNAME` file to commit.

**3. Wait for the certificate**, then tick **Enforce HTTPS** on the same page.

**4. Re-run the workflow** so the output is rebuilt with the new origin. Check
one page's `<link rel="canonical">` afterwards: it should read
`https://joshvanstone.com/…`.

Proxying through Cloudflare can be switched on afterwards if it is wanted. If it
is, set SSL/TLS mode to **Full (strict)** — anything less puts an unencrypted hop
between Cloudflare and GitHub.

## If Cloudflare Pages is preferred instead

Cloudflare can host this directly, which keeps DNS and hosting in one account and
removes the DNS-only caveat above. It is a dashboard change, not a code change:

1. Cloudflare dashboard → Workers & Pages → Create → Pages → connect this repo.
2. Build command `npm run build`, output directory `dist`, Node 22.12 or newer.
3. Set `SITE_URL=https://joshvanstone.com` as a build environment variable.
4. Add `joshvanstone.com` as a custom domain in the Pages project.
5. Disable `.github/workflows/deploy.yml` so two hosts are not both publishing.

Pick one. Two publishers on one domain is the failure mode worth avoiding.

## Verifying a deploy

```sh
npm run build
npm run preview
```

Then check, against the built output:

- Pages render with JavaScript disabled (there is no JavaScript to disable).
- `/rss.xml` parses and lists every non-draft piece.
- `/sitemap-index.xml` exists and links the page URLs.
- `/og/<slug>.png` renders for each page and piece.
- Lighthouse performance and accessibility are green.
