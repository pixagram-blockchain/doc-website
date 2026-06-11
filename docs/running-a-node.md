---
sidebar_position: 6
title: Running a Node
---

# Running a Node

## Docker images

| Image | Use |
|---|---|
| `pixadock/pixagram:pre-mainnet` | Main blockchain node (`hived`) and CLI wallet |
| `pixadock/pixagram-haf:pre-mainnet` | HAF node (`hived` + PostgreSQL indexer) |
| `pixadock/hivemind:pre-mainnet` | Hivemind setup, sync, and social API server |
| `pixadock/bigmac-feed:latest` | Witness price-feed publisher (Big Mac Index) |

## Quick start: a single node

```bash
mkdir -p pixagram
docker run --rm -it \
  -p 7777:7777 -p 2001:2001 \
  -v "$PWD/pixagram:/home/hived/datadir" \
  -e DATADIR=/home/hived/datadir \
  -e SHM_DIR=/home/hived/datadir/blockchain \
  -e HTTP_PORT=7777 \
  -e HIVED_UID=1000 \
  --ulimit nofile=1048576:1048576 \
  --entrypoint /bin/bash \
  pixadock/pixagram:pre-mainnet \
  -lc 'exec /home/hived_admin/docker_entrypoint.sh /home/hived/bin/hived'
```

:::warning
Without a `pixagram/config.ini` in the bind-mounted datadir, `hived` starts in
**isolation** — no `p2p-seed-node`, no witness plugin, defaults only. To join the live
network, use the witness repo below, which ships a pre-wired `config.ini`.
:::

## Becoming a witness

The [`pixagram-blockchain/witness`](https://github.com/pixagram-blockchain/witness)
repo is a turnkey witness setup: docker-compose plus a minimal `config.ini` pre-wired
to seed from `api.pixagram.com:2001`. Witnesses also publish PXS price feeds with
`pixadock/bigmac-feed`.

## Full API stack

For a complete API node (hived + HAF + Hivemind + Jussi + TLS), use the
[`pixagram-blockchain/alphanet`](https://github.com/pixagram-blockchain/alphanet)
Docker Compose setup.

## CLI wallet

The main image bundles `cli_wallet`, pre-configured with the Pixagram chain ID:

```bash
mkdir -p wallet
docker run --rm -it \
  -v "$PWD/wallet:/wallet" \
  -w /wallet \
  --entrypoint /home/hived/bin/cli_wallet \
  pixadock/pixagram:pre-mainnet \
  -o
```

`-o` runs offline (for signing). To connect to a node instead, replace `-o` with
`--server-rpc-endpoint=ws://your-node:8090`.
