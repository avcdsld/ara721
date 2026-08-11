// Generates public/sitemap.xml from the routes under pages/.
// Runs as a prebuild step so the sitemap can never drift from the actual pages.
import { readdirSync, writeFileSync, statSync } from 'fs';
import { join, relative, sep } from 'path';

const SITE = 'https://ara721.art';
const PAGES_DIR = 'pages';
const EXCLUDED = new Set(['_app', '_document', '404']);

function collectRoutes(dir) {
  const routes = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      routes.push(...collectRoutes(full));
      continue;
    }
    if (!/\.(tsx|jsx|ts|js)$/.test(entry)) continue;

    const name = entry.replace(/\.(tsx|jsx|ts|js)$/, '');
    if (EXCLUDED.has(name)) continue;
    // Dynamic routes have no single URL to list.
    if (name.includes('[')) continue;

    const dirPart = relative(PAGES_DIR, dir).split(sep).filter(Boolean).join('/');
    const segments = name === 'index' ? dirPart : [dirPart, name].filter(Boolean).join('/');
    // trailingSlash: true in next.config.js, so every URL ends with "/".
    routes.push(segments ? `/${segments}/` : '/');
  }
  return routes;
}

const routes = collectRoutes(PAGES_DIR).sort();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url>\n    <loc>${SITE}${r}</loc>\n  </url>`).join('\n')}
</urlset>
`;

writeFileSync(join('public', 'sitemap.xml'), xml);
console.log(`sitemap.xml written with ${routes.length} routes`);
