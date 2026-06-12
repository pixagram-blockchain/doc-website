---
sidebar_position: 1
slug: /
title: Getting Started
---

# Getting Started

**Pixagram** is a delegated-proof-of-stake blockchain. Its RPC interface exposes the
full Graphene-style API surface — `condenser_api.*`, `database_api.*`, `bridge.*`,
`follow_api.*`, `tags_api.*` — so existing Hive-compatible tooling and libraries work
out of the box. This site documents the chain: endpoints, tokens, governance, and
economic parameters.

## Endpoints

| Network | RPC endpoint |
|---|---|
| Mainnet | `https://api.pixagram.com` |
| Testnet | `https://pixagram.dev` |

Both serve full JSON-RPC. Social methods (`bridge.*`, `follow_api.*`,
`tags_api.*` and some `condenser_api.*`) are routed to a Hivemind indexer behind the
same endpoint.

## Chain identity

| | |
|---|---|
| Block interval | 3 seconds |
| Witness slots | 21 |
| Public-key prefix | `PIX` (e.g. `PIX6LLegb…`) |
| Chain ID | `706978616772616d000000000000000000000000000000000000000000000000` |
| Max transaction size | 128 KB |

## Your first API call

```bash
curl -s -X POST https://api.pixagram.com -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"condenser_api.get_dynamic_global_properties","params":[],"id":1}'
```

You'll get the chain's global state, with fields like `current_pxs_supply` and
`total_vesting_fund_pixa`:

```json
{
  "head_block_number": 1022145,
  "current_pxs_supply": "247355.185 PXS",
  "total_vesting_fund_pixa": "77402778.538 PIXA",
  "pxs_interest_rate": 0
}
```

## JavaScript SDK (Dpixa)

The official TypeScript client library is [`@pixagram/dpixa`](https://www.npmjs.com/package/@pixagram/dpixa) — install it only from that npm page to be sure you get the official package. Point it at the mainnet RPC:

```ts
import { Client } from '@pixagram/dpixa';

const client = new Client(['https://api.pixagram.com']);

// Read chain state
const props = await client.database.getDynamicGlobalProperties();
console.log('head block:', props.head_block_number);

// Broadcast a post (image encoded as base64 data URI in the body field)
await client.broadcast.comment({
  parent_author: '',
  parent_permlink: 'portrait',   // hashtag
  author: 'your-username',
  permlink: 'first-portrait-' + Date.now(),
  title: 'My first pixel-art portrait',
  body: '![](data:image/png;base64,iVBORw0KG...)',
  json_metadata: JSON.stringify({
    tags: ['portrait', 'ai', 'firstpost'],
    app: 'pixagram/1.0',
    image: ['data:image/png;base64,iVBORw0KG...'],
  }),
}, postingKey);
```

Hive-compatible libraries (dhive, Beem, Hive-JS) also work against Pixagram — set the [chain ID](#chain-identity) and address prefix (`PIX`).

## Where to go next

- [Protocol Reference](protocol-reference) — tokens, parameters, field names, reward curves
- [Tokenomics & Governance](tokenomics-and-governance) — supply, inflation, the DPF
- [API Reference](api-reference) — core methods with runnable examples
- [Accounts & Transactions](accounts-and-transactions) — keys, multisig, and signing
- [Running a Node](running-a-node) — Docker images and witness setup
