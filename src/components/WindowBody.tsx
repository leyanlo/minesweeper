/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

import { Level, Mask } from './utils';
import WindowBodyBoard from './WindowBodyBoard';
import WindowBodyHeading from './WindowBodyHeading';

const BodySection = styled.section`
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  :not(:last-child) {
    margin-bottom: 6px;
  }
`;

const WindowBody = ({
  mines,
  startMs,
  board,
  level,
  resetGame,
  mask,
  onClickCell,
}: {
  mines: number;
  startMs: number | null;
  board: number[][];
  level: Level;
  resetGame: (level: Level) => void;
  mask: Mask[][];
  onClickCell: ({ row, column }: { row: number; column: number }) => void;
}): JSX.Element => (
  <div
    css={css`
      padding: 6px;
      background-color: #c0c0c0;
      border-width: 3px 0 0 3px;
      border-style: solid;
      border-color: #fff;
    `}
  >
    <BodySection>
      <WindowBodyHeading
        level={level}
        mines={mines}
        resetGame={resetGame}
        startMs={startMs}
      />
    </BodySection>
    <BodySection>
      <WindowBodyBoard board={board} mask={mask} onClickCell={onClickCell} />
    </BodySection>
  </div>
);

export default WindowBody;
