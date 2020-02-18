/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { Layout } from '../components/Layout';
import Window from '../components/Window';

export default function IndexPage(): JSX.Element {
  return (
    <Layout>
      <main
        css={css`
          align-items: center;
          display: flex;
          justify-content: center;
          min-height: 100vh;
        `}
      >
        <Window />
      </main>
    </Layout>
  );
}
