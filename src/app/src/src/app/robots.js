export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://buscador-regalos.vercel.app/sitemap.xml',
  };
}