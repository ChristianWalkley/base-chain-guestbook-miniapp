import './globals.css';
import { Providers } from '@/app/providers';

const appUrl = 'https://base-chain-guestbook.vercel.app';
const appName = '\u94fe\u4e0a\u7559\u8a00\u677f';
const appDescription = 'Wallet addresses can leave one short message on Base for community interaction.';

export const metadata = {
  metadataBase: new URL(appUrl),
  title: appName,
  description: appDescription,
  applicationName: appName,
  openGraph: {
    title: appName,
    description: appDescription,
    url: appUrl,
    siteName: appName,
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: appName
      }
    ],
    locale: 'zh_CN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: appName,
    description: appDescription,
    images: ['/og-image.svg']
  },
  alternates: {
    canonical: appUrl
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="base:app_id" content="69c4f346875674902db2b296" />
        <meta
          name="talentapp:project_verification"
          content="56561434f29fc44de37168a220218fbb1050f35436c05a38c691ace3575d349d68034fad27488b60f112c94a2bd892927057a0adcc80cef8444abf2a305bafb6"
        />
        <meta name="theme-color" content="#0a1020" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
