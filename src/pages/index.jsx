import React from 'react';
import styled from 'styled-components';

import {
  Window,
  WindowHeader,
  WindowHeaderIcon,
  WindowMenu,
  WindowMenuItem,
  WindowSubMenu,
  WindowSubMenuItem,
  WindowSubMenuSeparator
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
        <nav role="navigation">
          <WindowMenu>
            <WindowMenuItem>
              <button type="button" aria-haspopup="true">
                Game
              </button>
              <WindowSubMenu className="dropdown" aria-label="submenu">
                <WindowSubMenuItem>
                  <button type="button">New</button>
                </WindowSubMenuItem>
                <WindowSubMenuSeparator />
                <WindowSubMenuItem>
                  <button type="button">Beginner</button>
                </WindowSubMenuItem>
                <WindowSubMenuItem>
                  <button type="button">Intermediate</button>
                </WindowSubMenuItem>
                <WindowSubMenuItem>
                  <button type="button">Expert</button>
                </WindowSubMenuItem>
                <WindowSubMenuSeparator />
                <WindowSubMenuItem>
                  <button type="button">Marks (?)</button>
                </WindowSubMenuItem>
              </WindowSubMenu>
            </WindowMenuItem>
          </WindowMenu>
        </nav>
      </Window>
    </Desktop>
  </Layout>
);
