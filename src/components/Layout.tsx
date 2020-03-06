import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';

import { injectGlobal } from 'emotion';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  injectGlobal`
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

    body {
      background-color: #3a6ea5;
      font-family: 'Segoe UI', sans-serif;
      font-size: 11px;
      overscroll-behavior: none;
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
