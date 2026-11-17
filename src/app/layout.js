import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  metadataBase: new URL('https://buscador-regalos.vercel.app'),
  title: 'RegaloIdeal RMM | Buscador con IA de Regalos y Mejores Compras en Amazon España',
  description:
    'Encuentra el regalo perfecto o el mejor producto calidad-precio para ti en 10 segundos con Inteligencia Artificial. Ideas personalizadas ajustadas a tu presupuesto en Amazon España.',
  keywords: [
    'buscador de regalos ia',
    'ideas de regalos originales',
    'que regalar amigo invisible',
    'regalos navidad reyes',
    'mejores productos amazon españa',
    'recomendador regalos inteligencia artificial',
  ],
  openGraph: {
    title: 'RegaloIdeal RMM • Acertar con tus regalos y compras en 10 segundos',
    description:
      'Dile a nuestra IA para quién buscas (o qué necesitas para ti) y tu presupuesto. Te selecciona 4 opciones top valoradas en Amazon España.',
    url: 'https://buscador-regalos.vercel.app',
    siteName: 'RegaloIdeal RMM',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RegaloIdeal RMM | Buscador Inteligente de Regalos y Compras',
    description:
      'Descubre al instante 4 ideas personalizadas y bien valoradas en Amazon España según tus gustos y presupuesto.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'RegaloIdeal RMM',
    url: 'https://buscador-regalos.vercel.app',
    applicationCategory: 'ShoppingApplication',
    operatingSystem: 'All',
    inLanguage: 'es-ES',
    description:
      'Asistente con Inteligencia Artificial para encontrar regalos originales y productos con mejor relación calidad-precio en Amazon España.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
  };

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#05070E] text-[#F4F1EA]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}