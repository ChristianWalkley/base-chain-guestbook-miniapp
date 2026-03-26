'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { formatEther } from 'viem';
import { guestbookAbi, guestbookAddress } from '@/lib/guestbook';
import { BUILDER_CODE, DATA_SUFFIX, MINI_APP_NAME } from '@/lib/miniapp';
import { trackTransaction } from '@/utils/track';

const MAX_LENGTH = 140;

function shortAddress(address) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatDate(timestamp) {
  if (!timestamp) return '';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(Number(timestamp) * 1000));
}

function MessageCard({ entry, index }) {
  return (
    <article className="message-card">
      <div className="message-card__header">
        <span className="message-card__index">#{String(index + 1).padStart(2, '0')}</span>
        <span className="message-card__address">{shortAddress(entry.user)}</span>
      </div>
      <p>{entry.message}</p>
      <time>{formatDate(entry.timestamp)}</time>
    </article>
  );
}

export default function GuestbookClient() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const [message, setMessage] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const [entries, setEntries] = useState([]);
  const [isEntriesLoading, setIsEntriesLoading] = useState(true);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const { data: countData, refetch: refetchCount, isLoading: countLoading } = useReadContract({
    abi: guestbookAbi,
    address: guestbookAddress,
    functionName: 'getEntriesCount',
    query: {
      refetchInterval: 15000
    }
  });

  const totalEntries = Number(countData ?? 0n);
  const indexes = useMemo(() => {
    const amount = Math.min(totalEntries, 6);
    return Array.from({ length: amount }, (_, idx) => BigInt(totalEntries - 1 - idx));
  }, [totalEntries, refreshKey]);

  useEffect(() => {
    let ignore = false;

    async function loadEntries() {
      setIsEntriesLoading(true);

      if (!indexes.length) {
        setEntries([]);
        setIsEntriesLoading(false);
        return;
      }

      const { publicClient } = await import('@/lib/public-client');
      const results = await Promise.all(
        indexes.map(async (index) => {
          const [user, currentMessage, timestamp] = await publicClient.readContract({
            address: guestbookAddress,
            abi: guestbookAbi,
            functionName: 'getEntry',
            args: [index]
          });

          return {
            user,
            message: currentMessage,
            timestamp
          };
        })
      );

      if (!ignore) {
        setEntries(results);
        setIsEntriesLoading(false);
      }
    }

    loadEntries();

    return () => {
      ignore = true;
    };
  }, [indexes]);

  const { data: hash, isPending, writeContract, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash
  });

  useEffect(() => {
    if (!isSuccess || !hash || !address) return;

    trackTransaction('app-326', MINI_APP_NAME, address, hash);
    setMessage('');
    refetchCount();
    setRefreshKey((current) => current + 1);
  }, [address, hash, isSuccess, refetchCount]);

  const remaining = MAX_LENGTH - message.length;
  const walletConnector = connectors.find((connector) => connector.id === 'coinbaseWalletSDK') ?? connectors[0];

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div className="hero-panel__copy">
          <span className="eyebrow">BASE MINI APP</span>
          <h1>Leave one line onchain and let the community discover the moment.</h1>
          <p>
            Chain Guestbook turns a quick message into a shared onchain memory. Connect your wallet, write a note in 140
            characters, and let the next visitor discover it on Base.
          </p>
          <div className="hero-panel__stats">
            <div>
              <strong>{countLoading ? '...' : totalEntries}</strong>
              <span>Onchain notes</span>
            </div>
            <div>
              <strong>{chain?.name ?? 'Base'}</strong>
              <span>Target network</span>
            </div>
            <div>
              <strong>140</strong>
              <span>Character cap</span>
            </div>
          </div>
        </div>
        <div className="hero-panel__art" aria-hidden="true">
          <div className="orb orb--large" />
          <div className="orb orb--small" />
          <div className="signal-grid" />
        </div>
      </section>

      <section className="content-grid">
        <div className="composer-card">
          <div className="section-heading">
            <span>Write a note</span>
            <span className="badge">Guestbook</span>
          </div>

          {isConnected ? (
            <div className="wallet-chip">
              <span>{shortAddress(address)}</span>
              <button type="button" onClick={() => disconnect()}>
                Disconnect
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="primary-button"
              disabled={!walletConnector || isConnecting || !isHydrated}
              onClick={() => walletConnector && connect({ connector: walletConnector })}
            >
              {isConnecting ? 'Connecting...' : 'Connect wallet'}
            </button>
          )}

          <label className="composer-field">
            <span>Your onchain message</span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value.slice(0, MAX_LENGTH))}
              placeholder="What should Base remember from you today?"
              maxLength={MAX_LENGTH}
            />
          </label>

          <div className="composer-meta">
            <span>{remaining} characters left</span>
            <span>{isConfirming ? 'Transaction confirming...' : 'Your note will be stored permanently in the contract'}</span>
          </div>

          <button
            type="button"
            className="primary-button primary-button--wide"
            disabled={!isConnected || !message.trim() || isPending || isConfirming}
            onClick={() =>
              writeContract({
                abi: guestbookAbi,
                address: guestbookAddress,
                functionName: 'sign',
                args: [message.trim()],
                dataSuffix: DATA_SUFFIX
              })
            }
          >
            {isPending || isConfirming ? 'Submitting...' : 'Sign onchain'}
          </button>

          {hash ? (
            <p className="status-line">
              Tx hash:
              <a href={`https://basescan.org/tx/${hash}`} target="_blank" rel="noreferrer">
                {shortAddress(hash)}
              </a>
            </p>
          ) : null}

          {error ? <p className="status-line status-line--error">{error.shortMessage || error.message}</p> : null}

          <div className="micro-note">
            <span>Contract</span>
            <a href={`https://basescan.org/address/${guestbookAddress}`} target="_blank" rel="noreferrer">
              {shortAddress(guestbookAddress)}
            </a>
          </div>

          <p className="status-line">Builder code: {BUILDER_CODE}</p>
        </div>

        <div className="feed-card">
          <div className="section-heading">
            <span>Latest notes</span>
            <button type="button" className="ghost-button" onClick={() => setRefreshKey((current) => current + 1)}>
              Refresh
            </button>
          </div>

          <div className="feed-list">
            {isEntriesLoading && !entries.length ? <p className="empty-state">Loading guestbook from Base...</p> : null}
            {!isEntriesLoading && !entries.length ? (
              <p className="empty-state">No messages yet. Be the first wallet to leave a note onchain.</p>
            ) : null}
            {entries.map((entry, index) => (
              <MessageCard key={`${entry.user}-${entry.timestamp}-${index}`} entry={entry} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="footer-strip">
        <div>
          <span>Onchain Social / Guestbook</span>
          <strong>Built for community prompts, event check-ins, and moments worth preserving.</strong>
        </div>
        <div>
          <span>8021 attribution</span>
          <strong>The guestbook transaction appends your verified builder suffix before submission.</strong>
        </div>
      </section>
    </main>
  );
}
