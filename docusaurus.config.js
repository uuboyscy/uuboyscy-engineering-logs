module.exports = {
    title: 'My Tech Blog', // The title of your site
    tagline: 'Learn data engineering and more!', // A short description of your site
    url: 'https://your-domain.com', // The production URL of your site
    baseUrl: '/', // Base URL for your project
    favicon: 'img/favicon.ico', // Path to your site's favicon
    organizationName: 'your-github-org', // GitHub org/user name
    projectName: 'your-repo-name', // GitHub repository name
    presets: [
      [
        '@docusaurus/preset-classic',
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
  };