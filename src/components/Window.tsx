/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

import MinesweeperIcon from '../images/minesweeper-icon.png';
import { Level } from './types';
import WindowBody from './WindowBody';
import WindowMenu from './WindowMenu';

const NUM_MINES = {
  Beginner: 10,
  Intermediate: 40,
  Expert: 99,
};

const Window = (): JSX.Element => {
  const [level, setLevel] = React.useState<Level>(Level.Beginner);
  const [hasMarks, setMarks] = React.useState<boolean>(false);
  // eslint-disable-next-line no-unused-vars
  const [numMines, setNumMines] = React.useState<number>(NUM_MINES[level]);
  // eslint-disable-next-line no-unused-vars
  const [board, setBoard] = React.useState<number[][]>([[]]);
  // eslint-disable-next-line no-unused-vars
  const [startMs, setStartMs] = React.useState<number | null>(null);
  return (
    <div
      css={css`
        border: 1px solid;
        border-color: #f1efe2 #716f64 #716f64 #f1efe2;
      `}
    >
      <article
        css={css`
          border: 1px solid;
          border-color: #fff #aca899 #aca899 #fff;
          background-color: #ece9d8;
          padding: 1px;
        `}
      >
        <header
          css={css`
            align-items: center;
            background: linear-gradient(to right, #0354e3, #3d95ff);
            color: white;
            display: flex;
            font-weight: 700;
            height: 25px;
            padding: 0 4px;
          `}
        >
          <img
            alt="Mine"
            src={MinesweeperIcon}
            css={css`
              width: 18px;
              height: 18px;
              margin-right: 4px;
            `}
          />
          Minesweeper
        </header>
        <WindowMenu
          level={level}
          setLevel={setLevel}
          hasMarks={hasMarks}
          setMarks={setMarks}
        />
        <WindowBody numMines={numMines} startMs={startMs} />
      </article>
    </div>
  );
};

export default Window;
