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
    locales: ['en'],
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
      respectPrefersColorScheme: true, // Respect the user's OS-level preference
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
          title: 'About Me',
          items: [
            {
              label: 'Home Page',
              to: '/',
            },
            {
              label: 'About This Page',
              to: '/about_this_page'
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
  },
};

export default config;
