import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  site: process.env.CI
    ? 'https://astro-shadcn-ui-template.vercel.app'
    : 'http://localhost:4321',
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
  // AGGIUNTA QUESTA SEZIONE i18n
  i18n: {
    defaultLocale: 'it',          // lingua predefinita (italiano)
    locales: ['it', 'en'],        // lingue supportate
    routing: 'manual'             // usiamo cookie + middleware per gestire la lingua
  }
})