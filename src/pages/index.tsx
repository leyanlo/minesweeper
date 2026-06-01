/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { Layout } from '../components/Layout';
import Window from '../components/Window';

export default function IndexPage(): JSX.Element {
  return (
    <Layout>
      <main
        css={css`
          display: flex;
        `}
      >
        <Window />
      </main>
    </Layout>
  );
}
