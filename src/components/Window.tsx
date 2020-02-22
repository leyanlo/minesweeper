/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

import MinesweeperIcon from '../images/minesweeper-icon.png';
import { BOARD_INFO, createBoard, Level } from './utils';
import WindowBody from './WindowBody';
import WindowMenu from './WindowMenu';

const Window = (): JSX.Element => {
  const [level, setLevel] = React.useState<Level>(Level.Beginner);
  const [hasMarks, setMarks] = React.useState<boolean>(false);
  const [mines, setMines] = React.useState<number>(BOARD_INFO[level].mines);
  const [board, setBoard] = React.useState<number[][]>(createBoard(level));
  const [startMs, setStartMs] = React.useState<number | null>(null);

  const resetGame = React.useCallback((l: Level) => {
    setLevel(l);
    setMines(BOARD_INFO[l].mines);
    setBoard(createBoard(l));
    setStartMs(null);
  }, []);

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
          hasMarks={hasMarks}
          setMarks={setMarks}
          resetGame={resetGame}
        />
        <WindowBody
          mines={mines}
          startMs={startMs}
          board={board}
          level={level}
          resetGame={resetGame}
        />
      </article>
    </div>
  );
};

export default Window;
