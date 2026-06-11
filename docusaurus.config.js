// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Pixagram Developer Docs',
  tagline: 'Developer documentation for the Pixagram blockchain',
  favicon: 'img/favicon.ico',

  // GitHub Pages project site. For the future custom domain: set url to the
  // domain, baseUrl to '/', and add static/CNAME.
  url: 'https://pixagram-blockchain.github.io',
  baseUrl: '/doc-website/',
  organizationName: 'pixagram-blockchain',
  projectName: 'doc-website',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // docs-only mode: docs live at the site root
          sidebarPath: './sidebars.js',
          exclude: ['superpowers/**'], // design specs/plans are not site content
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Pixagram Docs',
        items: [
          {
            href: 'https://github.com/pixagram-blockchain',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © Pixagram. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['json', 'bash'],
      },
    }),
};

export default config;
