---
sidebar_position: 4
title: API Reference
---

# API Reference

All methods accept JSON-RPC 2.0 POSTs to `https://api.pixagram.com` (mainnet) or
`https://pixagram.dev` (testnet). This page shows the core methods; the full method
surface follows the [Hive API definitions](https://developers.hive.io/apidefinitions/),
using Pixagram's [field names](protocol-reference#api-field-names).

## Chain state

### condenser_api.get_dynamic_global_properties

```bash
curl -s -X POST https://api.pixagram.com -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"condenser_api.get_dynamic_global_properties","params":[],"id":1}'
```

Pixagram fields: `current_pxs_supply`, `total_vesting_fund_pixa`, `pxs_interest_rate`,
`pxs_print_rate`, `dpf_interval_ledger`.

### condenser_api.get_block

```bash
curl -s -X POST https://api.pixagram.com -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"condenser_api.get_block","params":[1000000],"id":1}'
```

### condenser_api.get_reward_fund

```bash
curl -s -X POST https://api.pixagram.com -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"condenser_api.get_reward_fund","params":["post"],"id":1}'
```

Returns the live reward curves (`convergent_linear` / `convergent_square_root`),
`content_constant` (2500) and `percent_curation_rewards` (4000 = 40%).

### condenser_api.get_current_median_history_price

```bash
curl -s -X POST https://api.pixagram.com -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"condenser_api.get_current_median_history_price","params":[],"id":1}'
```

The PXS/PIXA median feed (PXS references the Big Mac Index).

## Accounts

### condenser_api.get_accounts

```bash
curl -s -X POST https://api.pixagram.com -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"condenser_api.get_accounts","params":[["pixa.omnibus"]],"id":1}'
```

Note the balance fields: `pxs_balance`, `reward_pixa_balance`, `reward_pxs_balance`.

## Broadcasting

### condenser_api.broadcast_transaction_synchronous

Broadcasts a signed transaction and waits for inclusion in a block. Sign with the
[CLI wallet](running-a-node#cli-wallet) or any compatible library configured with
the Pixagram chain ID and `PIX` prefix (see
[Accounts & Transactions](accounts-and-transactions)).

This is a template, not runnable as-is — replace `SIGNED_TX_JSON` with your signed transaction object:

```bash
curl -s -X POST https://api.pixagram.com -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"condenser_api.broadcast_transaction_synchronous","params":[SIGNED_TX_JSON],"id":1}'
```

## Social (Hivemind)

### bridge.get_ranked_posts

```bash
curl -s -X POST https://api.pixagram.com -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"bridge.get_ranked_posts","params":{"sort":"trending","tag":"","limit":20},"id":1}'
```

### bridge.get_account_posts

```bash
curl -s -X POST https://api.pixagram.com -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"bridge.get_account_posts","params":{"sort":"blog","account":"initminer","limit":20},"id":1}'
```

### bridge.get_profile

```bash
curl -s -X POST https://api.pixagram.com -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"bridge.get_profile","params":{"account":"initminer"},"id":1}'
```
