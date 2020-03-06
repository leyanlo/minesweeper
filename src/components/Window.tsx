/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import MinesweeperIcon from '../images/minesweeper-icon.png';
import Game from './Game';
import WindowBody from './WindowBody';
import WindowMenuBar from './WindowMenuBar';

const Window = (): JSX.Element => (
  <Game>
    <div
      css={css`
        padding: 16px;
      `}
    >
      <div
        css={css`
          border: 1px solid;
          border-color: #d4d0c8 #404040 #404040 #d4d0c8;
        `}
      >
        <article
          css={css`
            border: 1px solid;
            border-color: #fff #808080 #808080 #fff;
            background-color: #d4d0c8;
            padding: 1px;
          `}
        >
          <header
            css={css`
              background: linear-gradient(to right, #0b246a, #a6caf0);
              color: #fff;
              display: flex;
              font-weight: 700;
              height: 18px;
              padding: 1px 2px;
            `}
          >
            <img
              alt="Mine"
              src={MinesweeperIcon}
              css={css`
                width: 16px;
                height: 16px;
                margin-right: 2px;
              `}
            />
            Minesweeper
          </header>
          <WindowMenuBar />
          <WindowBody />
        </article>
      </div>
    </div>
  </Game>
);

export default Window;
