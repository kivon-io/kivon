# MiniPay submission checklist

Use this when filling out the [MiniPay Mini App submission form](https://docs.minipay.xyz/getting-started/submit-your-miniapp.html).

Dependency install rules live in [DEPENDENCY_POLICY.md](./DEPENDENCY_POLICY.md).

## Listing fields (form)

Fill these before submitting. Replace placeholders with your production values.

| Field | Value / notes |
|-------|----------------|
| **App name** | Kivon (or `NEXT_PUBLIC_APP_NAME`) |
| **Tagline** | _Draft 1–2 sentences — e.g. bridge from Celo to EVM networks in MiniPay_ |
| **Publisher** | _Your name or organization_ |
| **Support URL** | _In-app support link — Telegram, WhatsApp, email, or web portal_ |
| **Terms of Service** | `{APP_URL}/terms-of-use` (default: `https://kivon.io/terms-of-use`) |
| **Privacy Policy** | `{APP_URL}/privacy-policy` (default: `https://kivon.io/privacy-policy`) |
| **Category** | `finance` |
| **App URL (linkUrl)** | _Production HTTPS URL where the app is hosted_ |
| **Icon** | 512×512 PNG (`NEXT_PUBLIC_APP_LOGO_URL` or hosted asset) |

## Technical requirements

- [x] Auto-connects to wallet (no connect button)
- [x] HTTPS enabled (production host)
- [x] Mobile-optimized (360×640 minimum viewport)
- [x] Works on Celo (mainnet + Sepolia testnet via `NEXT_PUBLIC_USE_TESTNET`)
- [x] Error handling for wallet and bridge operations
- [ ] PageSpeed Insights score captured for production URL
- [ ] Network manifest copied into submission form (below)
- [x] Dependency security policy implemented — see [DEPENDENCY_POLICY.md](./DEPENDENCY_POLICY.md)

## Testing

- [x] Tested in MiniPay Developer Mode on Celo
- [x] Bridge flow completed end-to-end on device

## Branding and legal

- [x] App name and logo visible in UI (sidebar/header)
- [x] Terms and Privacy links reachable from in-app sidebar
- [x] Clear that the service is operated by your entity, not MiniPay

## Network manifest

Provide this list in the submission form. Destination chain RPCs and token logos may also be loaded **dynamically** from Relay chain/token API responses at runtime.

### App origin (your deployment)

| Purpose | URL |
|---------|-----|
| Mini App (linkUrl) | _Your production URL, e.g. `https://…`_ |
| Same-origin API | `{APP_URL}/api/chains` |
| Same-origin API | `{APP_URL}/api/tokens` |
| Same-origin API | `{APP_URL}/api/quote` |
| Terms | `https://kivon.io/terms-of-use` (or `{APP_URL}/terms-of-use`) |
| Privacy | `https://kivon.io/privacy-policy` (or `{APP_URL}/privacy-policy`) |

### Backend / bridge API

| Purpose | URL |
|---------|-----|
| Relay API (default) | `https://api.relay.link` |
| Relay chains | `https://api.relay.link/chains` |
| Relay tokens / quote | Via app proxy routes above |

Override with `NEXT_PUBLIC_RELAY_LINK_BASE_URL` if using a different Relay environment.

### Wallet RPC (Celo — browser / MiniPay)

Configured in `lib/wallet/wagmi.ts`. Used when Alchemy/Infura keys are set; otherwise falls back to chain public RPC.

| Network | Origins |
|---------|---------|
| Celo mainnet | `https://celo-mainnet.g.alchemy.com`, `https://celo-mainnet.infura.io`, Celo public RPC (wagmi default) |
| Celo Sepolia | `https://celo-sepolia.g.alchemy.com`, `https://celo-sepolia.infura.io`, Celo Sepolia public RPC (wagmi default) |

Env vars (optional): `NEXT_PUBLIC_ALCHEMY_ID` or `NEXT_PUBLIC_ALCHEMY_API_KEY`, `NEXT_PUBLIC_INFURA_API_KEY`.

### Static assets (icons / defaults)

| Purpose | URL |
|---------|-----|
| Relay chain icons | `https://assets.relay.link` |
| Default token imagery | `https://coin-images.coingecko.com` |
| Additional token logos | From Relay `featuredTokens` / token list `metadata.logoURI` per chain |

### Block explorers (transaction links)

Used after bridge execution (`lib/bridge/view-model.ts` + Relay chain `explorerUrl`):

- `https://celoscan.io`
- `https://celo-sepolia.blockscout.com`
- `https://basescan.org`
- `https://sepolia.basescan.org`
- `https://etherscan.io`
- `https://optimistic.etherscan.io`
- `https://polygonscan.com`
- `https://arbiscan.io`
- `https://bscscan.com`
- Plus explorer URLs returned by Relay for other destination chains

### Dynamic origins (runtime)

When users pick a destination network, the app may contact URLs from Relay chain metadata, including:

- `httpRpcUrl` / `wsRpcUrl` per chain
- `iconUrl`, token `logoURI`, and third-party icon CDNs
- Destination block explorers from chain config

Review Relay `/chains` response for a complete list of supported networks.

## Pre-submission checklist (summary)

- [ ] Listing fields completed in submission form
- [ ] Production URL live over HTTPS
- [ ] PageSpeed Insights score attached
- [ ] Network manifest pasted into form
- [x] MiniPay device test passed
- [x] Dependency policy committed — [DEPENDENCY_POLICY.md](./DEPENDENCY_POLICY.md)

## Submit

[MiniPay Mini App submission form](https://docs.minipay.xyz/getting-started/submit-your-miniapp.html)
