import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

export enum Level {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Expert = 'Expert',
}

export enum Mask {
  Hidden,
  Visible,
  Exploded,
  Flagged,
  Marked,
}

export const BOARD_INFO = {
  Beginner: {
    rows: 8,
    columns: 8,
    mines: 10,
  },
  Intermediate: {
    rows: 16,
    columns: 16,
    mines: 40,
  },
  Expert: {
    rows: 16,
    columns: 30,
    mines: 99,
  },
};

const incrementNeighbors = ({
  board,
  row,
  column,
}: {
  board: number[][];
  row: number;
  column: number;
}): void => {
  const rows = board.length;
  const columns = board[0].length;

  for (let r = Math.max(row - 1, 0); r <= Math.min(row + 1, rows - 1); r++) {
    for (
      let c = Math.max(column - 1, 0);
      c <= Math.min(column + 1, columns - 1);
      c++
    ) {
      if (board[r][c] !== -1) {
        // eslint-disable-next-line no-param-reassign
        board[r][c]++;
      }
    }
  }
};

export const createBoard = (level: Level): number[][] => {
  const { rows, columns, mines } = BOARD_INFO[level];
  const board = [...Array(rows)].map(() => [...Array(columns)].map(() => 0));

  for (let i = 0; i < mines; i++) {
    let r;
    let c;
    do {
      r = ~~(Math.random() * rows);
      c = ~~(Math.random() * columns);
    } while (board[r][c] === -1);
    board[r][c] = -1;

    incrementNeighbors({
      board,
      row: r,
      column: c,
    });
  }
  return board;
};

export const createMask = (level: Level): Mask[][] => {
  const { rows, columns } = BOARD_INFO[level];
  return [...Array(rows)].map(() => [...Array(columns)].map(() => Mask.Hidden));
};

export const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

export const VisuallyHidden = styled.div`
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap; /* added line */
`;
