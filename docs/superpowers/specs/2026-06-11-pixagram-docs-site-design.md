# Pixagram Developer Docs Site — Design

**Date:** 2026-06-11
**Repo:** `pixagram-blockchain/doc-website`
**Status:** Approved

## Goal

A developer documentation website for the Pixagram blockchain (a Hive fork), hosted as a
GitHub Pages project site at `https://pixagram-blockchain.github.io/doc-website`, with a
custom domain planned later. Content adapts the core sections of Hive's developer portal,
corrected for everything Pixagram changes (endpoints, tokens, governance, parameters).

## Stack & Hosting

- **Framework:** Docusaurus 3, classic preset, docs-focused. Node 20.
- **Pages config:** `url: "https://pixagram-blockchain.github.io"`, `baseUrl: "/doc-website/"`,
  `organizationName: "pixagram-blockchain"`, `projectName: "doc-website"`.
- **Link hygiene:** `onBrokenLinks: "throw"` and `onBrokenMarkdownLinks: "throw"` so the
  build fails on dead internal links.
- **Custom domain later:** change `url` to the new domain, set `baseUrl: "/"`, add a
  `static/CNAME` file, and configure the domain in repo Pages settings. No content changes.

## Content Structure

Sidebar order and pages (all Markdown under `docs/`):

1. **Getting Started**
   - What Pixagram is: a Hive fork; the standard Hive RPC surface applies.
   - Endpoints: mainnet `https://api.pixagram.com`, testnet `https://pixagram.dev`.
   - Chain identity: chain ID derived from the ASCII string `"pixagram"` (padded to
     32 bytes); public-key prefix `PIX`.
   - First API call: working `curl` against `condenser_api.get_dynamic_global_properties`.
2. **Differences from Hive** (the signature page)
   - Token model: PIXA (liquid, replaces HIVE), PXS (stable, replaces HBD), VESTS (staked).
     Legacy-format payloads must use `PIXA`/`PXS` symbol bytes; HF26 NAI assets unchanged.
   - API field renames table: `pxs_balance`, `pxs_exchange_rate`, `pxs_interest_rate`,
     `reward_pixa`/`reward_pxs`, `total_vesting_fund_pixa`, `current_pxs_supply`,
     `dpf_interval_ledger`. Symbols inside response strings normalized to PIXA/PXS.
   - Governance: DPF (Decentralized Proposal Fund) replaces DHF; treasury account
     `pixa.omnibus`; `proposal_fund_percent = 15%` of per-block inflation.
   - Reward curves: `convergent_linear` author / `convergent_square_root` curation
     (as Hive post-HF21), but `content_constant = 2500` (vs upstream 2e12) and
     `percent_curation_rewards = 40%`.
   - Genesis allocations: 50M VESTS `pixa.ico`, 25M VESTS `pixa.team`, ~250k PXS
     `pixa.omnibus`; zero liquid PIXA at genesis; VESTS:PIXA = 1:1 in display units;
     genesis median feed 1 PXS = 102 PIXA.
   - Communities: Hivemind community names keep upstream's `portal-[123]\d{4,6}` pattern.
3. **API Reference**
   - Core `condenser_api`, `database_api`, and `bridge.*` (Hivemind) methods with working
     `curl` examples against `api.pixagram.com`. Covered methods:
     `get_dynamic_global_properties`, `get_accounts`, `get_block`, `get_reward_fund`,
     `get_current_median_history_price`, `broadcast_transaction_synchronous`,
     `bridge.get_ranked_posts`, `bridge.get_account_posts`, `bridge.get_profile`.
   - Explicit pointer to Hive's developer portal for the unchanged full method surface.
4. **Accounts & Transactions**
   - Keys and authorities (owner/active/posting/memo), account creation, transaction
     signing basics — adapted from Hive docs with PIXA/PXS symbols and `PIX` prefix.
5. **Running a Node**
   - Docker images: `pixadock/pixagram:pre-mainnet` (node + cli_wallet),
     `pixadock/pixagram-haf:pre-mainnet`, `pixadock/hivemind:pre-mainnet`,
     `pixadock/bigmac-feed:latest`.
   - Witness setup via the `pixagram-blockchain/witness` repo (pre-wired to
     `api.pixagram.com:2001`); full stack via `pixagram-blockchain/alphanet` compose.
   - Note that a datadir without `config.ini` starts hived in isolation.
6. **Resources**
   - Org repos, Hive developer portal, explorers/tools as they appear.

Landing page (`/`) is a short intro that routes into Getting Started.

## Deployment

- GitHub Actions workflow (`.github/workflows/deploy.yml`): on push to `main`,
  `npm ci && npm run build`, upload `build/` and deploy with `actions/deploy-pages`.
- Repo Pages source set to "GitHub Actions" (configured via `gh` CLI).
- Every merge to `main` publishes automatically; PRs run the build as a check.

## Verification

- `npm run build` is the gate: compiles and fails on broken links.
- Local preview with `npm start` during authoring.
- Success criteria: site live at `https://pixagram-blockchain.github.io/doc-website`,
  all six sections navigable, all curl examples copy-paste runnable against mainnet.

## Out of Scope

- Custom domain setup (planned later; design keeps it a config-only change).
- Versioned docs, i18n, search service (Docusaurus local search can be added later).
- Auto-generated API definitions from the node source (Hive devportal-style); examples
  are hand-written for the core methods only.
