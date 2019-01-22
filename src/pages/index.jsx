import React from 'react';
import styled from 'styled-components';

import {
  Window,
  WindowHeader,
  WindowHeaderIcon
} from '../components/styled/window';
import Layout from '../components/layout';
import MinesweeperIcon from '../images/minesweeper-icon.png';

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
      <Window>
        <WindowHeader>
          <WindowHeaderIcon src={MinesweeperIcon} /> Minesweeper
        </WindowHeader>
        Game
      </Window>
    </Desktop>
  </Layout>
);
