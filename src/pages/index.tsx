/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { Layout } from '../components/Layout';
import Window from '../components/Window';

export default function IndexPage(): JSX.Element {
  return (
    <Layout>
      <main
        css={css`
          display: flex;
          min-height: 100%;
        `}
      >
        <Window />
      </main>
    </Layout>
  );
}
