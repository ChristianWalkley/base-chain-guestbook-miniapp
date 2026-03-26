import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet, injected } from 'wagmi/connectors';
import { MINI_APP_NAME } from '@/lib/miniapp';

export const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: MINI_APP_NAME
    }),
    injected()
  ],
  ssr: true,
  transports: {
    [base.id]: http('https://mainnet.base.org')
  }
});
