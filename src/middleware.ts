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
  const lang = getLangFromUrl(url);  // estrae 'it' o 'en' dal path
  context.locals.lang = lang;
  return next();
});

export const onRequest = sequence(languageMiddleware);