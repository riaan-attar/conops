import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const seo = JSON.parse(readFileSync(join(root, 'src', 'seoRoutes.json'), 'utf-8'));
const template = readFileSync(join(dist, 'index.html'), 'utf-8');
const ORIGIN = 'https://www.conopsglobal.com';

const routes = ['/', '/services', '/construction', '/about', '/faq', '/contact', '/careers', '/media'];

const crumbNames = {
  '/services': 'Services',
  '/construction': 'Construction',
  '/about': 'About Amit Gole',
  '/faq': 'FAQ',
  '/contact': 'Contact',
  '/careers': 'Careers',
  '/media': 'Media & Press',
};

// Must match the visible answers on the /faq page.
const faqEntries = [
  {
    q: 'What is ConOps Global?',
    a: 'ConOps Global is a managed workforce partner founded by Amit Gole that places full-time, exclusively assigned remote civil engineers, estimators, project coordinators, and support staff from India for US companies. ConOps Global employs them directly and handles all HR, payroll, compliance, equipment, onboarding, and performance monitoring.',
  },
  {
    q: 'Who founded ConOps Global?',
    a: 'ConOps Global was founded by Amit Gole, a civil engineering and US infrastructure veteran with over 15 years of hands-on operational leadership in US heavy civil contracting, asphalt paving, and concrete operations.',
  },
  {
    q: 'How much does it cost?',
    a: 'Our transparent pricing ranges from $375 to $1,200 per week all-inclusive. This single flat rate covers the professional’s salary, benefits, company-issued equipment, software licenses, HR management, and ongoing compliance.',
  },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const setMeta = (html, attr, key, value) =>
  html.replace(
    new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`),
    (_, a, b) => `${a}${esc(value)}${b}`
  );

const ldRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/;

function buildJsonLd(html, route) {
  const match = html.match(ldRegex);
  if (!match) return html;
  const data = JSON.parse(match[1]);
  const graph = data['@graph'].filter((n) => n['@type'] !== 'FAQPage' && n['@type'] !== 'BreadcrumbList');

  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` }];
  if (route !== '/') {
    items.push({ '@type': 'ListItem', position: 2, name: crumbNames[route], item: `${ORIGIN}${route}` });
  }
  graph.push({ '@type': 'BreadcrumbList', '@id': `${ORIGIN}${route === '/' ? '/' : route}#breadcrumbs`, itemListElement: items });

  if (route === '/faq') {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${ORIGIN}/faq#faq`,
      mainEntity: faqEntries.map((e) => ({
        '@type': 'Question',
        name: e.q,
        acceptedAnswer: { '@type': 'Answer', text: e.a },
      })),
    });
  }

  const json = JSON.stringify({ ...data, '@graph': graph }, null, 2).replace(/<\//g, '<\\/');
  return html.replace(ldRegex, () => `<script type="application/ld+json">\n${json}\n    </script>`);
}

function buildFallback(html, route) {
  if (route === '/') return html;
  const { h1, intro } = seo[route];
  const nav = html.match(/<noscript data-seo-fallback>[\s\S]*?(<header>[\s\S]*?<\/header>)/)?.[1] ?? '';
  const block = `<noscript data-seo-fallback>
        ${nav}
        <main>
          <h1>${escText(h1)}</h1>
          <p>${escText(intro)}</p>
        </main>
    </noscript>`;
  return html.replace(/<noscript data-seo-fallback>[\s\S]*?<\/noscript>/, () => block);
}

for (const route of routes) {
  const { title, desc } = seo[route];
  const url = route === '/' ? `${ORIGIN}/` : `${ORIGIN}${route}`;
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
  html = buildFallback(html, route);
  html = buildJsonLd(html, route);

  if (route === '/') {
    writeFileSync(join(dist, 'index.html'), html);
  } else {
    const outDir = join(dist, route.slice(1));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
  }
}

console.log(`Prerendered SEO meta, fallback content and schema for ${routes.length} routes`);
