import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel'   // ← adattatore per Vercel

export default defineConfig({
  site: process.env.CI
    ? 'https://astro-shadcn-ui-template.vercel.app'
    : 'http://localhost:4321',
  output: 'server',                               // ← abilita SSR (necessario per middleware e i18n manuale)
  adapter: vercel(),                              // ← usa l'adapter serverless di Vercel
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    optimizeDeps: {
      force: true,
    },
  },
  image: {
    domains: ['images.ctfassets.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: 'manual',
  },
})