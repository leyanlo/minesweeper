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
      resolve: 'gatsby-plugin-manifest',
      options: {
        ...siteMetadata,
        display: 'minimal-ui',
        theme_color: '#BDBDBD',
        background_color: '#3A6EA5',
        icon: 'src/images/logo.png',
        lang: 'en-US',
        start_url: '/',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-offline',
  ],
};
