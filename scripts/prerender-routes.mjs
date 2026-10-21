import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const seo = JSON.parse(readFileSync(join(root, 'src', 'seoRoutes.json'), 'utf-8'));
const template = readFileSync(join(dist, 'index.html'), 'utf-8');
const ORIGIN = 'https://www.conopsglobal.com';

const routes = ['/services', '/construction', '/about', '/faq', '/contact', '/careers', '/media'];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const setMeta = (html, attr, key, value) =>
  html.replace(
    new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`),
    (_, a, b) => `${a}${esc(value)}${b}`
  );

for (const route of routes) {
  const { title, desc } = seo[route];
  const url = `${ORIGIN}${route}`;
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = setMeta(html, 'name', 'title', title);
  html = setMeta(html, 'name', 'description', desc);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', desc);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'name', 'twitter:title', title);
  html = setMeta(html, 'name', 'twitter:description', desc);
  html = setMeta(html, 'name', 'twitter:url', url);
  html = html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`);

  const outDir = join(dist, route.slice(1));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
}

console.log(`Prerendered SEO meta for ${routes.length} routes`);
