---
sidebar_position: 2
title: Protocol Reference
---

# Protocol Reference

The chain parameters, token symbols, field names, and reward settings of the
Pixagram blockchain.

## Tokens

| Token | Ticker | Role |
|---|---|---|
| PIXA | **PXA** | Liquid native token |
| Pixa Supra | **PXS** | Supracoin referencing the Big Mac Index |
| Pixa Power | **PXP** | Staked governance token (on-chain unit: `VESTS`) |

**PXS references the Big Mac Index, not the US dollar.** Witness price feeds are
published against the Big Mac Index (see the `bigmac-feed` tool in
[Running a Node](running-a-node)); PXS floats freely and is not pegged or
redeemable. See [Tokenomics & Governance](tokenomics-and-governance) for the full
token model.

In **legacy-format** asset payloads, the on-wire symbol strings are `PIXA` and
`PXS`. NAI-format assets (`@@000000021` etc.) are also supported.

## Protocol parameters

| Parameter | Value |
|---|---|
| Address/key prefix | `PIX` |
| Chain ID | `706978616772616d000000000000000000000000000000000000000000000000` (ASCII `"pixagram"` zero-padded to 32 bytes) |
| Max transaction size | **128 KB** |
| Max block size | **256 KB** |
| Block interval | 3 s |
| Witness slots | 21 |

## API field names

The API proxy (Jussi) normalizes all field naming **bidirectionally** — requests
and responses use Pixagram names throughout:

| Field |
|---|
| `pxs_balance` |
| `pxs_exchange_rate` |
| `pxs_print_rate` |
| `pxs_interest_rate` |
| `reward_pixa` / `reward_pxs` |
| `total_vesting_fund_pixa` |
| `current_pxs_supply` |
| `dpf_interval_ledger` |

Asset symbols inside response strings (`"1.000 PXS"` etc.) are always rendered as
PIXA/PXS. Client libraries written for other Graphene-family chains work unchanged —
the proxy accepts and returns the names above automatically.

## Governance

The **DPF (Decentralized Pixa Fund)** funds community proposals from 15% of
protocol inflation. The treasury account is **`pixa.omnibus`**. It holds PXS only,
spendable exclusively through approved DPF proposals. See
[Tokenomics & Governance](tokenomics-and-governance) for funding levels and fees.

## Special accounts

| Account | Role | Restriction |
|---|---|---|
| `pixa.rex` | ICO / fundraising pool | can do nothing except transfer VESTS from itself — see below |
| `pixa.team` | Team + advisors allocation | same VESTS-only restriction, multisig-controlled |
| `pixa.omnibus` | DPF treasury | spendable only via approved proposals |

Special accounts **cannot vote for witnesses**, so the foundation accounts can never
control block production.

### The ICO account (`pixa.rex`)

Pixagram uses a purpose-built, **protocol-restricted** account for the token sale.
`pixa.rex` holds the fundraising allocation, and the consensus rules allow it
exactly one kind of operation: **transferring VESTS (Pixa Power) out of itself** —
that's how sale participants receive their allocation.

Everything else is rejected by the chain itself:

- it cannot send or hold spendable liquid PIXA or PXS;
- it cannot vote for witnesses or DPF proposals;
- it cannot post, comment, or vote on content;
- it cannot perform any other operation at all.

These restrictions are **not** a policy, a frontend filter, or a multisig promise —
they are validated by every node on every block (in the node software's consensus
layer), so a transaction breaking them can never be included in the chain. Holders
don't need to trust anyone's discretion: the sale pool can only ever leave
`pixa.rex` as staked Pixa Power, with its keys additionally held under a
[3-of-3 multisig](tokenomics-and-governance#special-account-multisig).

## Reward curves

| Parameter | Value |
|---|---|
| Author reward curve | `convergent_linear` |
| Curation reward curve | `convergent_square_root` |
| `content_constant` (s) | **2500** |
| Author / curation split | **60 / 40** |

The small `content_constant` means the superlinear (anti-sybil) zone covers only very
low-rshare posts; rewards converge to linear quickly, so small accounts still produce
meaningful rshares. Verify live:

```bash
curl -s -X POST https://api.pixagram.com -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"condenser_api.get_reward_fund","params":["post"],"id":1}'
```

## Communities

Community names match the pattern `portal-[123]\d{4,6}` (e.g. `portal-152228`).
Communities exist only after `community_create` operations are broadcast on the
chain.
