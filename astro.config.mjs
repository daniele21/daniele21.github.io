// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const base = process.env.ASTRO_BASE || '/';
const basePrefix = (process.env.ASTRO_BASE || '').replace(/\/$/, '');

// https://astro.build/config
export default defineConfig({
  site: 'https://daniele21.github.io',
  base,
  integrations: [sitemap()],
  redirects: {
    '/android-local-llm-harness': `${basePrefix}/harnex`,
  },
  build: {
    assets: 'assets',
  },
});
