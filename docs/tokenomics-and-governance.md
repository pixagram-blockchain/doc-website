---
sidebar_position: 3
title: Tokenomics & Governance
---

# Tokenomics & Governance

## The three tokens

| Token | Ticker | Role |
|---|---|---|
| PIXA | **PXA** | Liquid token — freely transferable; does not exist at genesis |
| Pixa Power | **PXP** | Staked governance token — the display projection of on-chain VESTS |
| Pixa Supra | **PXS** | Supracoin referencing the Big Mac Index — floats freely, not pegged, not redeemable |

On-chain, RPC responses render the liquid symbol as `PIXA` and stake as `VESTS`.
Exchanges integrating at the RPC level deal in three symbols — PXA, PXS, and VESTS —
while product UIs may render VESTS as PXP at the current vesting ratio.

## Genesis distribution

At block 0 the protocol creates exactly **100,000,000 PXP** (expressed on-chain as
VESTS at the genesis vesting price) and seeds **~250,000 PXS** into the DPF treasury.
No further PXP is ever created.

| Allocation | Amount | Account | Purpose |
|---|---|---|---|
| Operational & sale stake | 75,000,000 PXP | `pixa.rex` | token sale rounds and operations |
| Founders & advisors | 25,000,000 PXP | `pixa.team` | ~20 accounts (co-founders, advisors, contributors) |
| DPF treasury seed | ~250,000 PXS | `pixa.omnibus` | community-governed proposals |

The reward pool, witness rewards, and ongoing DPF funding come from algorithmic
inflation, not from genesis allocations.

Key genesis facts:

- **Zero liquid PIXA (PXA) at genesis** — liquid supply emerges from power-downs,
  content rewards, and witness rewards.
- VESTS : PIXA = **1 : 1** in display units at genesis (the ratio drifts upward as
  inflation accrues to the vesting fund).
- Genesis median price feed: **1 PXS = 102 PIXA**, carried over from the pre-mainnet
  chain so conversions work before witnesses publish feeds.
- Sale participants' accounts are created with their PXP allocation debited from
  `pixa.rex` (which can only ever transfer VESTS — a consensus-level rule).

:::note Pre-mainnet
The chain currently running at `api.pixagram.com` predates this genesis
specification — its balances (e.g. `pixa.rex` holding 49.5M VESTS) will differ
until the production launch.
:::

## Inflation

Inflation decreases by 0.01% per 250k blocks toward a 0.95% floor, and is split:

| Recipient | Share |
|---|---|
| Content rewards (authors + curators) | **70%** |
| Witnesses | **15%** |
| DPF | **15%** |
| Staker interest | **0%** |

Within content rewards, the split is **60% authors / 40% curators**.

## Interest: eliminated

Both PXS interest and PXP staker interest are **0%** (verify: `pxs_interest_rate: 0`
in `get_dynamic_global_properties`). Rationale:

- PXP is already rewarded through use (curation and author rewards).
- PXS tracks a purchasing-power reference (the Big Mac Index) rather than paying
  yield.
- No interest-bearing tokens simplifies the regulatory posture: returns come only
  from active participation — posting, curating, witnessing.

## The DPF (Decentralized Pixa Fund)

Anyone can submit a funding proposal; stakeholders vote; funded proposals draw a
daily PXS payout from `pixa.omnibus`.

- **Return proposal**: a `daily_pay: 0.000 PXS` proposal from the treasury sets the
  funding threshold — proposals with fewer votes than it receive nothing.
- **Proposal listing fee**: 10 PXS, plus 1 PXS per day for proposals longer than
  60 days.

## Special-account multisig

The treasury and ICO accounts use a **3-of-3** authority (native multisig:
three keys of weight 1, `weight_threshold: 3`):

| Key | Holder |
|---|---|
| Key 1 | Co-founder A |
| Key 2 | Co-founder B |
| Key 3 | Shared among advisors (any one advisor can co-sign) |

Every operation requires both co-founders plus an advisor. Keys are rotatable via
`account_update`.

## Launch posture

The chain currently runs pre-mainnet with `initminer` as the sole block producer.
It will be disabled once at least 3 community witnesses are running. There are 21
witness slots — see [Running a Node](running-a-node) to set one up.
