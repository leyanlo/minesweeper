import React from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';
import MinesweeperWindow from '../components/minesweeper-window';

export const Desktop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: var(--mainMinHeight);
  background-color: var(--bodyBackground);
`;

export default () => (
  <Layout>
    <Desktop>
      <MinesweeperWindow />
    </Desktop>
  </Layout>
);
