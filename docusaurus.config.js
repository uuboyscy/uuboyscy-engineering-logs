// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

const config = {
  title: 'UUBOYSCY ENGINEERING LOGS', // Update the title
  tagline: 'Learn data engineering and more!', // Update the tagline
  favicon: 'img/favicon.ico',

  // The URL where your site will be deployed
  // url: 'https://uuboyscy.github.io', // GitHub Pages URL
  // baseUrl: '/uuboyscy-engineering-logs/', // Include trailing slash and your repository name
  url: 'https://docs.uuboyscy.dev',
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: 'uuboyscy', // Your GitHub username
  projectName: 'uuboyscy-engineering-logs', // Your repository name

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hant'],
    localeConfigs: {
      en: { label: 'English', direction: 'ltr' },
      'zh-Hant': { label: '中文', direction: 'ltr' },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: 'All Posts',
          blogSidebarCount: 'ALL', // Show all posts in the sidebar
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark', // Set the default mode to dark
      disableSwitch: false, // Allow users to switch between light and dark mode
      respectPrefersColorScheme: false, // Respect the user's OS-level preference
    },
    navbar: {
      title: 'UUBOYSCY ENGINEERING LOGS',
      logo: {
        alt: 'My Tech Blog Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          type: 'localeDropdown', // Enables the language switcher
          position: 'right', // Position in the navbar
        },
        {
          href: 'https://github.com/uuboyscy/uuboyscy-engineering-logs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Information',
          items: [
            {
              label: 'About Me',
              to: '/',
            },
            {
              label: 'About This Page',
              to: '/about_this_page'
            },
            {
              label: 'TibaMe Page',
              href: 'https://www.tibame.com/teacher/uuboyscy'
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/uuboyscy/uuboyscy-engineering-logs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} uuboyscy. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    metadata: [
      { name: 'keywords', content: ' uuboy, scy, uuboyscy, data engineering, big data, Python, Java, consulting' },
    ],
  },
  headTags: [
    // Declare a <link> preconnect tag
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://docs.uuboyscy.dev',
      },
    },
    // Declare some json-ld structured data
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'Organization',
        name: 'uuboyscy',
        url: 'https://docs.uuboyscy.dev',
        logo: 'https://docs.uuboyscy.dev/zh-Hant/img/logo.svg',
        sameAs: [
          'https://github.com/uuboyscy',
        ],
        description: 'uuboyscy is a data engineering consulting company specializing in big data, data pipeline, and analytics solutions.',
      }),
    },
  ],
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
