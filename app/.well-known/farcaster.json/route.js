import { NextResponse } from 'next/server';

const homeUrl = 'https://base-chain-guestbook.vercel.app';
const ownerAddress = '0x54e2acab04c89a3fe02852bf8dd69ee8f526bc75';

export async function GET() {
  return NextResponse.json({
    accountAssociation: {
      header: 'placeholder',
      payload: 'placeholder',
      signature: 'placeholder'
    },
    baseBuilder: {
      allowedAddresses: [ownerAddress],
      ownerAddress
    },
    frame: {
      version: '1',
      name: 'Chain Guestbook',
      homeUrl,
      iconUrl: `${homeUrl}/icon.svg`,
      imageUrl: `${homeUrl}/og-image.svg`,
      buttonTitle: 'Open Chain Guestbook',
      splashImageUrl: `${homeUrl}/hero-art.svg`,
      splashBackgroundColor: '#09111f',
      webhookUrl: `${homeUrl}/api/webhook`
    },
    miniapp: {
      version: '1',
      name: 'Chain Guestbook',
      subtitle: 'One short note from every wallet',
      description: 'Wallet addresses can leave one short message on Base for community interaction, social prompts, event check-ins, and shared community moments.',
      tagline: 'Write one line on Base',
      homeUrl,
      iconUrl: `${homeUrl}/icon.svg`,
      splashImageUrl: `${homeUrl}/hero-art.svg`,
      splashBackgroundColor: '#09111f',
      heroImageUrl: `${homeUrl}/og-image.svg`,
      screenshotUrls: [
        `${homeUrl}/screenshot-portrait.svg`
      ],
      webhookUrl: `${homeUrl}/api/webhook`,
      primaryCategory: 'social',
      tags: ['social', 'guestbook', 'base', 'onchain'],
      ogTitle: 'Chain Guestbook',
      ogDescription: 'Wallet addresses can leave one short message on Base for community interaction.',
      ogImageUrl: `${homeUrl}/og-image.svg`,
      buttonTitle: 'Open Chain Guestbook',
      imageUrl: `${homeUrl}/og-image.svg`,
      canonicalDomain: 'base-chain-guestbook.vercel.app',
      requiredChains: ['eip155:8453'],
      requiredCapabilities: ['actions.ready']
    }
  });
}