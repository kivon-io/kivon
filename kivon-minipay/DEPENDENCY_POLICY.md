# Dependency policy

This document describes how `kivon-minipay` manages npm dependencies for supply-chain security, aligned with the dependency section of [MiniPay submission requirements](https://docs.minipay.xyz/getting-started/submit-your-miniapp.html).

For the full MiniPay listing checklist (network manifest, legal links, etc.), see [SUBMISSION.md](./SUBMISSION.md).

## Pinned versions

All direct dependencies in `package.json` use **exact versions** (no `^`, `~`, or `*` ranges). Transitive versions are locked in `package-lock.json`.

## Install hardening (`.npmrc`)

| Setting | Value | Purpose |
|--------|-------|---------|
| `save-exact=true` | on | New installs are saved without ranges |
| `ignore-scripts=true` | on | Blocks dependency postinstall scripts |
| `min-release-age=7` | 7 days | Rejects package versions published in the last week |

Requires **npm 11.10+** (project pins `npm@11.17.0` via `packageManager`).

## Local setup

```bash
corepack enable
cd kivon-minipay
npm ci
```

Use `npm ci`, not `npm install`, for reproducible installs from the lockfile.

To add or upgrade a dependency intentionally:

1. Confirm the target version is at least 7 days old on npm.
2. Update `package.json` with the exact version.
3. Run `npm install` once to refresh the lockfile.
4. Run `npm run typecheck`, `npm run lint`, and `npm run build`.
5. Commit both `package.json` and `package-lock.json`.

## CI

GitHub Actions runs on changes under `kivon-minipay/`:

1. `npm ci` (frozen lockfile)
2. `npm run typecheck`
3. `npm run build`

Lint is run locally (`npm run lint`) but is not in CI yet due to existing rule violations to clean up separately.

Workflow: `.github/workflows/kivon-minipay-ci.yml`

## Production vs development dependencies

CLI and scaffolding tools (e.g. `shadcn`) belong in `devDependencies` only. Runtime libraries used by the app stay in `dependencies`.

## Update cadence

Dependency updates are deliberate PRs, not automatic range resolution. Review changelogs before merging updates that touch wallet, bridge, or networking libraries (`viem`, `wagmi`, `next`, etc.).

## Dependency security checklist

- [x] All `package.json` versions pinned exactly
- [x] `.npmrc` enforces `ignore-scripts`, `min-release-age=7`, `save-exact`
- [x] `packageManager` pins npm 11.17.0
- [x] `package-lock.json` committed; CI uses `npm ci` only
- [x] `npm ci` + typecheck + build pass with install hardening enabled
- [x] CLI tools (e.g. `shadcn`) in `devDependencies` only
- [x] Local npm upgraded to 11+ (`corepack enable`)
