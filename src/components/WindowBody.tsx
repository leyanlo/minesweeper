/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

import { Level, Mask } from './utils';
import WindowBodyHeading from './WindowBodyHeading';

const BodySection = styled.section`
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  :not(:last-child) {
    margin-bottom: 6px;
  }
`;

const getColor = (cell: number): string => {
  switch (cell) {
    case 1:
      return '#0700FF';
    case 2:
      return '#007B01';
    case 3:
      return '#FE0201';
    case 4:
      return '#01007B';
    case 5:
      return '#7B0000';
    case 6:
      return '#007B7B';
    case 8:
      return '#7B7B7B';
    default:
      return 'black';
  }
};

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
      {board.map((row, r) => (
        <div
          css={css`
            display: flex;
          `}
        >
          {row.map((cell, c) => {
            if (!mask[r][c]) {
              return (
                // eslint-disable-next-line jsx-a11y/control-has-associated-label
                <button
                  type="button"
                  css={css`
                    width: 16px;
                    height: 16px;
                    border: 2px solid;
                    border-color: #fff #808080 #808080 #fff;
                    padding: 0;
                    :active {
                      border-width: 1px 0 0 1px;
                      border-color: #808080;
                      :focus {
                        outline: none;
                      }
                    }
                    :focus {
                      outline: 1px dotted black;
                      outline-offset: -4px;
                    }
                  `}
                  onClick={({ currentTarget }) => {
                    onClickCell({ row: r, column: c });
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1038823
                    currentTarget.blur();
                  }}
                />
              );
            }

            return (
              <div
                css={css`
                  width: 16px;
                  height: 16px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-family: 'MINE-SWEEPER', sans-serif;
                  font-size: 9px;
                  color: ${getColor(cell)};
                  border-width: 1px 0 0 1px;
                  border-style: solid;
                  border-color: #808080;
                `}
              >
                {cell === -1 ? '*' : !!cell && cell}
              </div>
            );
          })}
        </div>
      ))}
    </BodySection>
  </div>
);

export default WindowBody;
