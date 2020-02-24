/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

import MinesweeperIcon from '../images/minesweeper-icon.png';
import { BOARD_INFO, createBoard, createMask, Level, Mask } from './utils';
import WindowBody from './WindowBody';
import WindowMenu from './WindowMenu';

const Window = (): JSX.Element => {
  const [level, setLevel] = React.useState<Level>(Level.Beginner);
  const [hasMarks, setMarks] = React.useState<boolean>(false);
  const [mines, setMines] = React.useState<number>(BOARD_INFO[level].mines);
  const [board, setBoard] = React.useState<number[][]>(createBoard(level));
  const [mask, setMask] = React.useState<Mask[][]>(createMask(level));
  const [startMs, setStartMs] = React.useState<number | null>(null);

  const resetGame = React.useCallback((l: Level) => {
    setLevel(l);
    setMines(BOARD_INFO[l].mines);
    setBoard(createBoard(l));
    setMask(createMask(l));
    setStartMs(null);
  }, []);

  const onClickCell = React.useCallback(
    ({ row, column }: { row: number; column: number }) => {
      if (!startMs) {
        setStartMs(Date.now());
      }
      mask[row][column] = Mask.Visible;
      setMask([...mask]);
    },
    [mask, startMs],
  );

  return (
    <div
      css={css`
        margin: auto;
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
            mask={mask}
            onClickCell={onClickCell}
          />
        </article>
      </div>
    </div>
  );
};

export default Window;
