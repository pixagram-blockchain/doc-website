---
sidebar_position: 3
title: Tokenomics & Governance
---

# Tokenomics & Governance

## Genesis distribution

Genesis allocations total the equivalent of **100,000,000 Pixa Power**: 75M issued as VESTS, plus the DPF's 25M-PIXA value equivalent held as PXS.

| Allocation | % | Amount | Account | Purpose |
|---|---|---|---|---|
| Fundraising (ICO) | 50% | 50M PP | `pixa.rex` | 5 rounds over ~5 years |
| Team + Advisors | 25% | 25M PP | `pixa.team` | ~20 accounts (co-founders, advisors, contributors) |
| Decentralized Pixa Fund | 25% | 25M PP equivalent | `pixa.omnibus` | held as ~250,000 PXS at the genesis feed |
| **Total** | **100%** | **75M PP + ~250,000 PXS** (≈100M PP equivalent) | | |

Key genesis facts:

- **Zero liquid PIXA at genesis** — all liquid supply flows from inflation and
  power-downs.
- VESTS : PIXA = **1 : 1** in display units at genesis (the ratio drifts upward as
  inflation accrues to the vesting fund).
- Genesis median price feed: **1 PXS = 102 PIXA**, seeded so conversions work before
  witnesses publish feeds.
- ICO participants' accounts are created with their PP allocation debited from
  `pixa.rex` (which can only ever transfer VESTS — a consensus-level rule).

## Inflation

The total inflation schedule is unchanged from Hive (decreasing 0.01% per 250k blocks
toward the 0.95% floor). The **split** differs:

| Recipient | Hive | Pixagram |
|---|---|---|
| Content rewards (authors + curators) | 65% | **70%** |
| Witnesses | 10% | **15%** |
| DHF / DPF | 10% | **15%** |
| Staker interest | 15% | **0%** |

Within content rewards, the split is **60% authors / 40% curators**.

## Interest: eliminated

Both PXS interest and PP staker interest are **0%** (verify: `pxs_interest_rate: 0`
in `get_dynamic_global_properties`). Rationale:

- PP is already rewarded through use (curation and author rewards).
- PXS already appreciates against fiat via the Big Mac Index peg.
- No interest-bearing tokens simplifies the regulatory posture: returns come only
  from active participation — posting, curating, witnessing.

## The DPF (Decentralized Pixa Fund)

Mechanically identical to Hive's [DHF](https://developers.hive.io/): anyone can submit
a funding proposal; stakeholders vote; funded proposals draw a daily PXS payout from
`pixa.omnibus`.

- **Return proposal**: a `daily_pay: 0.000 PXS` proposal from the treasury sets the
  funding threshold — proposals with fewer votes than it receive nothing.
- **Proposal listing fee**: 10 PXS, plus 1 PXS per day for proposals longer than
  60 days.

## Special-account multisig

The treasury and ICO accounts use a **3-of-3** authority (native Hive multisig:
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
