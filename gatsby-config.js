const path = require(`path`);

module.exports = {
  pathPrefix: `/minesweeper`,
  siteMetadata: {
    title: `Leyan Lo`,
    description: `Leyan Lo’s personal website`,
    keywords: `software, violin, cubing`
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
        name: `Leyan Lo`,
        short_name: `Leyan Lo`,
        start_url: `/`,
        background_color: `#E3E4E8`,
        theme_color: `#001F7F`,
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
