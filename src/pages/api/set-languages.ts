import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ cookies, request, redirect }) => {
  const formData = await request.formData();
  const language = formData.get('language')?.toString();
  const currentPath = formData.get('path')?.toString() || '/';

  if (language === 'it' || language === 'en') {
    cookies.set('lang', language, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // un anno
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }
  // Rimuovi il prefisso della lingua corrente dal percorso per reindirizzare correttamente
  const pathWithoutLang = currentPath.replace(/^\/(en|it)/, '') || '/';
  const newPath = language === 'it' ? pathWithoutLang : `/${language}${pathWithoutLang}`;
console.log(`[api] lingua: ${language}, path originale: ${currentPath}, path senza prefisso: ${pathWithoutLang}, nuovo path: ${newPath}`);

  
  
  return redirect(newPath);
};