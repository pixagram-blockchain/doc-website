# Pixagram Developer Docs

Developer documentation for the Pixagram blockchain, built with [Docusaurus 3](https://docusaurus.io/).

**Live site:** https://pixagram-blockchain.github.io/doc-website/ (redirects to https://pixagram.com/doc-website/)

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm start
```

`npm start` opens a dev server at http://localhost:3000/doc-website/ with live reload — edits to the Markdown files appear instantly.

To run the same production build the CI does (compiles the site and fails on any broken internal link):

```bash
npm run build
npm run serve   # preview the production build locally
```

## Editing content

The pages live in `docs/` as Markdown (MDX):

| File | Page |
|---|---|
| `docs/getting-started.md` | Getting Started (site root) |
| `docs/protocol-reference.md` | Protocol Reference |
| `docs/tokenomics-and-governance.md` | Tokenomics & Governance |
| `docs/api-reference.md` | API Reference |
| `docs/accounts-and-transactions.md` | Accounts & Transactions |
| `docs/running-a-node.md` | Running a Node |
| `docs/resources.md` | Resources |

Sidebar order comes from the `sidebar_position` frontmatter in each file. Site configuration is in `docusaurus.config.js`. The `docs/superpowers/` directory holds internal design specs/plans and is excluded from the published site.

## Deployment

Every push to `main` builds and deploys automatically to GitHub Pages via `.github/workflows/deploy.yml`. Pull requests run the build as a status check without deploying. No manual deploy step is needed.
