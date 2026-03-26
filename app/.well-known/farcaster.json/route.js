import { NextResponse } from 'next/server';

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
      iconUrl: 'https://base-chain-guestbook.vercel.app/icon.svg',
      homeUrl: 'https://base-chain-guestbook.vercel.app',
      imageUrl: 'https://base-chain-guestbook.vercel.app/og-image.svg',
      buttonTitle: 'Open Chain Guestbook',
      splashImageUrl: 'https://base-chain-guestbook.vercel.app/hero-art.svg',
      splashBackgroundColor: '#09111f',
      webhookUrl: 'https://base-chain-guestbook.vercel.app/api/webhook'
    }
  });
}
