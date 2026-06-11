---
sidebar_position: 2
title: Differences from Hive
---

# Differences from Hive

Pixagram is a Hive fork. Everything not listed on this page behaves exactly as
documented in the [Hive developer portal](https://developers.hive.io/).

## Tokens

| Role | Hive | Pixagram |
|---|---|---|
| Liquid native token | HIVE | **PIXA** |
| Stablecoin | HBD | **PXS** (PixaSupra) |
| Staked token | VESTS ("Hive Power") | VESTS ("Pixa Power", PP) |

**PXS is pegged to the Big Mac Index, not the US dollar.** Witness price feeds are
published against the Big Mac Index (see the `bigmac-feed` tool in
[Running a Node](running-a-node)).

When building **legacy-format** asset payloads, use `PIXA` / `PXS` as the on-wire
symbol bytes — not the `STEEM` / `SBD` strings older Hive clients hardcode. HF26
NAI-format assets work unchanged.

## Protocol parameters

| Parameter | Hive | Pixagram |
|---|---|---|
| Address/key prefix | `STM` | `PIX` |
| Chain ID | Hive's | ASCII `"pixagram"` padded to 32 bytes |
| Max transaction size | 64 KB | **128 KB** |
| Block interval | 3 s | 3 s (unchanged) |
| Max witnesses | 21 | 21 (unchanged) |

## The proxy translation layer (Jussi)

The chain's C++ protocol layer keeps Hive-native field names and symbols internally.
The API proxy translates **bidirectionally** between chain-native names and Pixagram
names, so API consumers only ever see Pixagram naming — and can send it too.

| Hive name | Pixagram name |
|---|---|
| `hbd_balance` | `pxs_balance` |
| `hbd_exchange_rate` | `pxs_exchange_rate` |
| `hbd_print_rate` | `pxs_print_rate` |
| `hbd_interest_rate` | `pxs_interest_rate` |
| `reward_hive` / `reward_hbd` | `reward_pixa` / `reward_pxs` |
| `total_vesting_fund_hive` | `total_vesting_fund_pixa` |
| `current_hbd_supply` | `current_pxs_supply` |
| `dhf_interval_ledger` | `dpf_interval_ledger` |

Asset symbols inside response strings (`"1.000 HBD"` etc.) are also normalized to
PIXA/PXS.

## Governance

The **DPF (Decentralized Pixa Fund)** replaces Hive's DHF with identical mechanics.
The treasury account is **`pixa.omnibus`** (Hive: `hive.fund`). It holds PXS only,
spendable exclusively through approved DPF proposals. See
[Tokenomics & Governance](tokenomics-and-governance) for funding levels and fees.

## Special accounts

| Account | Role | Restriction |
|---|---|---|
| `pixa.rex` | ICO / fundraising pool | **VESTS-only transfers**, enforced at the consensus layer (not just the proxy) — liquid PIXA/PXS can never leave it |
| `pixa.team` | Team + advisors allocation | standard account, multisig-controlled |
| `pixa.omnibus` | DPF treasury | spendable only via approved proposals |

Special accounts **cannot vote for witnesses**, so the foundation accounts can never
control block production.

## Reward curves

Hive (HF25+) uses linear curves for both author and curation rewards. Pixagram
deliberately returns to the HF21-style convergent curves, retuned for its rshare scale:

| Parameter | Hive (HF25+) | Pixagram (live) |
|---|---|---|
| Author reward curve | `linear` | `convergent_linear` |
| Curation reward curve | `linear` | `convergent_square_root` |
| `content_constant` (s) | — | **2500** |
| Author / curation split | 50 / 50 | **60 / 40** |

The small `content_constant` means the superlinear (anti-sybil) zone covers only very
low-rshare posts; rewards converge to linear quickly, so small accounts still produce
meaningful rshares. Verify live:

```bash
curl -s -X POST https://api.pixagram.com -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"condenser_api.get_reward_fund","params":["post"],"id":1}'
```

## Communities

Hivemind community names keep upstream's pattern: `portal-[123]\d{4,6}`
(e.g. `portal-152228`). Communities exist only after `community_create` operations
are broadcast on this chain — Hive communities do not carry over.
