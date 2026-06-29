# Chain Guestbook

A Base mini app for short onchain guestbook messages.

This project lets visitors connect a wallet, sign one short message, and publish it to a guestbook contract on Base mainnet. The app also displays the latest onchain notes in a simple feed.

Repository: https://github.com/ChristianWalkley/base-chain-guestbook-miniapp.git

## Overview

Chain Guestbook is a lightweight onchain social mini app.

It is designed around a single, focused interaction: write a brief guestbook message and make it available onchain. Recent notes are then shown in the app so visitors can see what others have shared.

The app includes Base app metadata, a Talent verification meta tag, and transaction attribution tracking through `utils/track.js`.

## Features

- Base mainnet guestbook contract integration
- Wallet connection flow
- Onchain message submission
- Latest onchain notes feed
- Base app metadata
- Talent verification meta tag
- Transaction attribution tracking via `utils/track.js`

## Contract

- Address: `0xf41cf25dcc080f9af84cb4189215d0d9dc9232bf`
- Type: `On-chain Social / Guestbook`
- Network: Base mainnet

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js
- npm

Use the Node.js version expected by the project if one is specified in the repository configuration.

## Setup

Clone the repository:

```bash
git clone https://github.com/ChristianWalkley/base-chain-guestbook-miniapp.git
```

Move into the project directory:

```bash
cd base-chain-guestbook-miniapp
```

Install dependencies:

```bash
npm install
```

## Development

Start the local development server:

```bash
npm run dev
```

Open the local URL shown in your terminal to view the app.

During development, you can edit the app UI, metadata, contract interaction flow, and supporting utility files as needed.
