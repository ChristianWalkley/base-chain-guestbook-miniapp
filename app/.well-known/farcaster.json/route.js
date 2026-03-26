import { NextResponse } from 'next/server';

const homeUrl = 'https://base-chain-guestbook.vercel.app';

export async function GET() {
  return NextResponse.json({
    accountAssociation: {
      header: 'placeholder',
      payload: 'placeholder',
      signature: 'placeholder'
    },
    frame: {
      version: '1',
      name: 'Chain Guestbook',
      iconUrl: `${homeUrl}/icon.svg`,
      homeUrl,
      imageUrl: `${homeUrl}/og-image.svg`,
      buttonTitle: 'Open Chain Guestbook',
      splashImageUrl: `${homeUrl}/hero-art.svg`,
      splashBackgroundColor: '#09111f',
      webhookUrl: `${homeUrl}/api/webhook`
    },
    miniapp: {
      version: '1',
      name: 'Chain Guestbook',
      description: 'Wallet addresses can leave one short message on Base for community interaction.',
      iconUrl: `${homeUrl}/icon.svg`,
      homeUrl,
      imageUrl: `${homeUrl}/og-image.svg`,
      buttonTitle: 'Open Chain Guestbook',
      splashImageUrl: `${homeUrl}/hero-art.svg`,
      splashBackgroundColor: '#09111f',
      webhookUrl: `${homeUrl}/api/webhook`,
      canonicalDomain: 'base-chain-guestbook.vercel.app',
      requiredChains: ['eip155:8453'],
      tags: ['base', 'guestbook', 'social'],
      requiredCapabilities: ['actions.ready']
    }
  });
}
