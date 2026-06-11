---
sidebar_position: 1
slug: /
title: Getting Started
---

# Getting Started

**Pixagram** is a delegated-proof-of-stake blockchain forked from [Hive](https://hive.io).
The entire standard Hive RPC surface works on Pixagram — `condenser_api.*`,
`database_api.*`, `bridge.*`, `follow_api.*`, `tags_api.*` — so almost everything in the
[Hive developer portal](https://developers.hive.io/) applies here. This site documents
what Pixagram **changes**: endpoints, token names, governance, and economic parameters.

## Endpoints

| Network | RPC endpoint |
|---|---|
| Mainnet | `https://api.pixagram.com` |
| Testnet | `https://pixagram.dev` |

Both serve full Hive-compatible JSON-RPC. Social methods (`bridge.*`, `follow_api.*`,
`tags_api.*` and some `condenser_api.*`) are routed to a Hivemind indexer behind the
same endpoint.

## Chain identity

| | |
|---|---|
| Block interval | 3 seconds |
| Witness slots | 21 |
| Public-key prefix | `PIX` (e.g. `PIX6LLegb…`) — Hive uses `STM` |
| Chain ID | derived from the ASCII string `"pixagram"` padded to 32 bytes |
| Max transaction size | 128 KB (Hive: 64 KB) |

## Your first API call

```bash
curl -s -X POST https://api.pixagram.com -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"condenser_api.get_dynamic_global_properties","params":[],"id":1}'
```

You'll get the chain's global state. Note the Pixagram field names — `current_pxs_supply`,
`total_vesting_fund_pixa` — where Hive has `current_hbd_supply`, `total_vesting_fund_hive`:

```json
{
  "head_block_number": 1022145,
  "current_pxs_supply": "247355.185 PXS",
  "total_vesting_fund_pixa": "77402778.538 PIXA",
  "pxs_interest_rate": 0
}
```

## Where to go next

- [Differences from Hive](differences-from-hive) — everything Pixagram renames or retunes
- [Tokenomics & Governance](tokenomics-and-governance) — supply, inflation, the DPF
- [API Reference](api-reference) — core methods with runnable examples
- [Accounts & Transactions](accounts-and-transactions) — keys, multisig, and signing
- [Running a Node](running-a-node) — Docker images and witness setup
