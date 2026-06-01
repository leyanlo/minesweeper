import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';

import { css, Global } from '@emotion/react';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import SegoeUIWoff from '../fonts/SegoeUI.woff';
import SegoeUIWoff2 from '../fonts/SegoeUI.woff2';
import SegoeUIBoldWoff from '../fonts/SegoeUIBold.woff';
import SegoeUIBoldWoff2 from '../fonts/SegoeUIBold.woff2';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
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
      <Global
        styles={css`
          @font-face {
            font-family: 'Segoe UI';
            src:
              url(${SegoeUIWoff2}) format('woff2'),
              url(${SegoeUIWoff}) format('woff');
          }

          @font-face {
            font-family: 'Segoe UI';
            src:
              url(${SegoeUIBoldWoff2}) format('woff2'),
              url(${SegoeUIBoldWoff}) format('woff');
            font-weight: 700;
          }

          body {
            background-color: #3a6ea5;
            font-family: 'Segoe UI', sans-serif;
            font-size: 11px;
            overscroll-behavior: none;
          }
        `}
      />
      <Helmet
        titleTemplate={`%s - ${data.site.siteMetadata.name}`}
        defaultTitle={data.site.siteMetadata.name}
      >
        <meta name="description" content={data.site.siteMetadata.description} />
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"82b6de855bf44322927edb4d9e4160b2"}'
         />
      </Helmet>
      {children}
    </React.StrictMode>
  );
}
