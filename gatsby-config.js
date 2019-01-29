const path = require(`path`);

module.exports = {
  pathPrefix: `/minesweeper`,
  siteMetadata: {
    title: `Minesweeper`,
    description: `Responsive minesweeper`,
    keywords: `minesweeper, responsive, gatsby`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-126651057-1`,
        head: true,
        respectDNT: true
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Minesweeper`,
        short_name: `Minesweeper`,
        start_url: `/`,
        background_color: `#008080`,
        theme_color: `#BDBDBD`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        include: /images/
      }
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: false
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`)
      }
    },
    `gatsby-transformer-sharp`
  ]
};
