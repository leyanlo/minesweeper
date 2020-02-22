import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';

import { injectGlobal } from 'emotion';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import Digit7MonoWoff from '../fonts/digit-7-mono.woff';
import Digit7MonoWoff2 from '../fonts/digit-7-mono.woff2';
import MineSweeperWoff from '../fonts/mine-sweeper.woff';
import MineSweeperWoff2 from '../fonts/mine-sweeper.woff2';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  injectGlobal`
    @font-face {
      font-family: 'Digital-7 Mono';
      src: url(${Digit7MonoWoff2}) format('woff2'),
        url(${Digit7MonoWoff}) format('woff');
    }
    
    @font-face {
      font-family: 'MINE-SWEEPER';
      src: url(${MineSweeperWoff2}) format('woff2'),
        url(${MineSweeperWoff}) format('woff');
    }
    
    html, body, #___gatsby, #gatsby-focus-wrapper {
      height: 100%;
    }
    
    body {
      -webkit-font-smoothing: antialiased;
      background-color: #3A6EA5;
      font-family: Arial, sans-serif;
      font-size: 12px;
    }
  `;

  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          name
          description
        }
      }
    }
  `);

  return (
    <React.StrictMode>
      <Helmet
        titleTemplate={`%s - ${data.site.siteMetadata.name}`}
        defaultTitle={data.site.siteMetadata.name}
      >
        <meta name="description" content={data.site.siteMetadata.description} />
      </Helmet>
      {children}
    </React.StrictMode>
  );
}
