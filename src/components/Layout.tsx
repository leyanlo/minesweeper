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
import SegoeUIWoff from '../fonts/SegoeUI.woff';
import SegoeUIWoff2 from '../fonts/SegoeUI.woff2';
import SegoeUIBoldWoff from '../fonts/SegoeUIBold.woff';
import SegoeUIBoldWoff2 from '../fonts/SegoeUIBold.woff2';

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

    @font-face {
      font-family: 'Segoe UI';
      src: url(${SegoeUIWoff2}) format('woff2'),
        url(${SegoeUIWoff}) format('woff');
    }

    @font-face {
      font-family: 'Segoe UI';
      src: url(${SegoeUIBoldWoff2}) format('woff2'),
        url(${SegoeUIBoldWoff}) format('woff');
      font-weight: 700;
    }

    html, body, #___gatsby, #gatsby-focus-wrapper {
      height: 100%;
    }

    body {
      background-color: #3a6ea5;
      font-family: 'Segoe UI', sans-serif;
      font-size: 11px;
      overflow: hidden;
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
