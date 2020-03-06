const siteMetadata = {
  name: 'Minesweeper',
  description: 'JS minesweeper',
  keywords: 'minesweeper, js, gatsby',
};

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-126651057-2',
        head: true,
        respectDNT: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        ...siteMetadata,
        display: 'minimal-ui',
        theme_color: '#d4d0c8',
        background_color: '#3a6ea5',
        icon: 'src/images/minesweeper-icon.png',
        lang: 'en-US',
        start_url: '/',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-offline',
  ],
};
