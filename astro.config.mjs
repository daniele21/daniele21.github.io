// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://daniele21.github.io',
  base: process.env.ASTRO_BASE || '/',
  integrations: [sitemap()],
  build: {
    assets: 'assets',
  },
});
