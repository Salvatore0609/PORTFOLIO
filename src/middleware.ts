import { defineMiddleware, sequence } from 'astro:middleware';
import { getLangFromUrl } from './i18n/utils';

declare global {
  namespace App {
    interface Locals {
      lang: string;
    }
  }
}

const languageMiddleware = defineMiddleware(async (context, next) => {
  const url = context.url;
  let lang = context.cookies.get('lang')?.value;
  
  if (!lang) {
    lang = getLangFromUrl(url);
  }

  // Imposta la lingua nelle variabili locali di Astro per usarla nei componenti
  context.locals.lang = lang;
 
  console.log(`[middleware] lingua impostata: ${lang} per URL: ${url.pathname}`);
  return next();
});

export const onRequest = sequence(languageMiddleware);