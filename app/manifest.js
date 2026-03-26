export default function manifest() {
  return {
    name: 'Chain Guestbook',
    short_name: 'Guestbook',
    description: 'Wallet addresses can leave one short message on Base for community interaction.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07111d',
    theme_color: '#07111d',
    icons: [
      {
        src: '/icon.svg',
        sizes: '128x128',
        type: 'image/svg+xml'
      }
    ]
  };
}
