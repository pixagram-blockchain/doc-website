---
sidebar_position: 5
title: Accounts & Transactions
---

# Accounts & Transactions

Pixagram accounts use a role-based key and authority model: every account carries
four keys with different permission levels, and any authority can be a weighted
multisig.

## Keys and authorities

Each account has four key roles:

| Role | Used for |
|---|---|
| Owner | changing other keys; recovery — keep offline |
| Active | transfers, witness ops, market ops |
| Posting | posts, comments, votes, follows |
| Memo | encrypting/decrypting transfer memos |

Public keys are encoded with the **`PIX`** prefix (e.g. `PIX6LLegb…`). Any
Hive-compatible key-generation library works — configure the address prefix to
`PIX`.

## Multisig authorities

Authorities are native multisig: a list of keys/accounts with weights and a threshold.
Pixagram's special accounts use 3-of-3. Example `account_update` authority:

```json
{
  "weight_threshold": 3,
  "account_auths": [],
  "key_auths": [
    ["PIX7abc...keyA", 1],
    ["PIX8def...keyB", 1],
    ["PIX5ghi...keyC", 1]
  ]
}
```

All three keys must sign for any operation at that authority level.

## Creating accounts

Accounts are created on-chain with `account_create` (paying the witness-set creation
fee in PIXA) or `create_claimed_account`. Account creation is free pre-mainnet; the
mainnet fee is set by witness consensus via `update_witness`.

## Signing transactions

To sign transactions, configure your library with:

- **Chain ID**: the ASCII string `"pixagram"` padded with zero bytes to 32 bytes,
  hex-encoded.
- **Address prefix**: `PIX`.
- **Asset symbols**: in legacy serialization, use `PIXA` and `PXS` symbol strings.
  NAI asset format (`@@000000021` etc.) is also supported.

The simplest signer is the bundled CLI wallet (see
[Running a Node](running-a-node#cli-wallet)), which defaults to the Pixagram chain ID:

```text
unlock yourpassword
import_key 5J...your-active-key
transfer "alice" "bob" "1.000 PIXA" "thanks!" true
```

Or sign offline and broadcast yourself via
[`broadcast_transaction_synchronous`](api-reference#condenser_apibroadcast_transaction_synchronous).
