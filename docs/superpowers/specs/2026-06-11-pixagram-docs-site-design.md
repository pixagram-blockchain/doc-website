# Pixagram Developer Docs Site — Design

**Date:** 2026-06-11
**Repo:** `pixagram-blockchain/doc-website`
**Status:** Approved

## Goal

A developer documentation website for the Pixagram blockchain (a Hive fork), hosted as a
GitHub Pages project site at `https://pixagram-blockchain.github.io/doc-website`, with a
custom domain planned later. Content adapts the core sections of Hive's developer portal,
corrected for everything Pixagram changes (endpoints, tokens, governance, parameters).

## Content Sources

- Hive developer portal (structure and unchanged material).
- **`pixagram-blockchain/pixagram` issue #5 ("Pixagram Mainnet Launch Checklist")** — the
  authoritative list of Pixagram-vs-Hive changes and decided launch parameters. Must be
  fully reflected on the site.
- Attachments on issue #5: `Pixa_Pixagram_Getting_Started.pdf` (basis for Getting
  Started) and the updated `Pixagram_TGE_Specification.pdf` (tokenomics reference).
- The live chain (`api.pixagram.com`) is ground truth where it and the issue disagree;
  discrepancies verified on 2026-06-11 are noted inline below.

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
2. **Differences from Hive** (the signature page — must fully reflect issue #5)
   - Token model: PIXA (liquid, replaces HIVE), PXS (stable, replaces HBD), VESTS /
     "Pixa Power (PP)" (staked). Legacy-format payloads must use `PIXA`/`PXS` symbol
     bytes; HF26 NAI assets unchanged.
   - **PXS peg**: pegged to the **Big Mac Index**, not the USD (witness price feeds via
     `bigmac-feed`).
   - Address/key prefix `PIX` (vs `STM`); chain ID derived from `"pixagram"`.
   - **Max transaction size 128 KB** (vs Hive's 64 KB); live max block size 256 KB.
   - **Jussi proxy translation layer**: the chain's C++ protocol layer keeps native
     names/symbols; the API proxy bidirectionally translates them to Pixagram names
     (`reward_hive` → `reward_pixa`, etc.). Field renames table: `pxs_balance`,
     `pxs_exchange_rate`, `pxs_interest_rate`, `reward_pixa`/`reward_pxs`,
     `total_vesting_fund_pixa`, `current_pxs_supply`, `dpf_interval_ledger`. Symbols
     inside response strings normalized to PIXA/PXS.
   - Governance: DPF (Decentralized Pixa Fund) replaces DHF; treasury account
     **`pixa.omnibus`** (verified live; issue #5's `pixa.fund` name is stale).
   - **Special accounts & restrictions**: the ICO account is restricted at the
     **consensus layer** to VESTS-only transfers (no liquid PIXA/PXS out); special
     accounts cannot vote for witnesses. The ICO account is documented as
     **`pixa.rex`** (the live on-chain name, 49.5M VESTS; issue #5's `pixa.ico` is
     stale — decision confirmed 2026-06-11).
   - Reward curves (verified live): `convergent_linear` author /
     `convergent_square_root` curation, `content_constant = 2500` (vs upstream 2e12),
     **60% author / 40% curation** split. (Hive HF25+ uses linear/linear; Pixagram
     deliberately returns to the HF21-style convergent curves.)
   - Communities: Hivemind community names keep upstream's `portal-[123]\d{4,6}` pattern.
3. **Tokenomics & Governance** (new page, sourced from issue #5 + TGE spec)
   - Genesis distribution: **100,000,000 PP total** — 50M ICO (5 fundraising rounds
     over ~5 years), 25M team + advisors (~20 accounts), 25M DPF (held as ~246k PXS in
     `pixa.omnibus` at the genesis feed of 1 PXS = 102 PIXA). Zero liquid PIXA at
     genesis; VESTS:PIXA = 1:1 in display units.
   - Inflation split: **70% content rewards / 15% witnesses / 15% DPF / 0% stakers**.
     Total inflation schedule unchanged from Hive (decreasing 0.01% per 250k blocks
     toward the 0.95% floor).
   - **Interest eliminated**: PXS interest rate 0% (verified live) and 0% PP staker
     interest — returns come only from participation (posting, curating, witnessing).
   - DPF mechanics: return proposal (`daily_pay: 0.000 PXS`) sets the funding
     threshold, identical to Hive's DHF; proposal listing fee 10 PXS, +1 PXS/day for
     proposals beyond 60 days.
   - Multisig policy for special accounts: 3-of-3 (each key weight 1, threshold 3) —
     two co-founder keys plus one advisor-shared key; rotatable.
   - Launch posture: `initminer` is the sole block producer pre-mainnet, to be
     disabled once at least 3 community witnesses run; max witnesses 21.
4. **API Reference**
   - Core `condenser_api`, `database_api`, and `bridge.*` (Hivemind) methods with working
     `curl` examples against `api.pixagram.com`. Covered methods:
     `get_dynamic_global_properties`, `get_accounts`, `get_block`, `get_reward_fund`,
     `get_current_median_history_price`, `broadcast_transaction_synchronous`,
     `bridge.get_ranked_posts`, `bridge.get_account_posts`, `bridge.get_profile`.
   - Explicit pointer to Hive's developer portal for the unchanged full method surface.
5. **Accounts & Transactions**
   - Keys and authorities (owner/active/posting/memo), account creation, transaction
     signing basics — adapted from Hive docs with PIXA/PXS symbols and `PIX` prefix.
6. **Running a Node**
   - Docker images: `pixadock/pixagram:pre-mainnet` (node + cli_wallet),
     `pixadock/pixagram-haf:pre-mainnet`, `pixadock/hivemind:pre-mainnet`,
     `pixadock/bigmac-feed:latest`.
   - Witness setup via the `pixagram-blockchain/witness` repo (pre-wired to
     `api.pixagram.com:2001`); full stack via `pixagram-blockchain/alphanet` compose.
   - Note that a datadir without `config.ini` starts hived in isolation.
7. **Resources**
   - Org repos, Hive developer portal, explorers/tools as they appear.
   - Witness setup and installation guide is also tracked in issue #5 as a TODO —
     covered here by the Running a Node section.

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
  all seven sections navigable, all curl examples copy-paste runnable against
  `api.pixagram.com`, and every Pixagram-vs-Hive change from issue #5 represented on
  the Differences or Tokenomics pages.

## Out of Scope

- Custom domain setup (planned later; design keeps it a config-only change).
- Versioned docs, i18n, search service (Docusaurus local search can be added later).
- Auto-generated API definitions from the node source (Hive devportal-style); examples
  are hand-written for the core methods only.
