/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

import { Level, Mask } from './utils';

const BodySection = styled.section`
  border: 2px solid;
  border-color: #7d7d7d #fff #fff #7d7d7d;
  :not(:last-child) {
    margin-bottom: 7px;
  }
`;

const HeadingNumber = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 25px;
  padding-top: 2px;
  color: #ff0201;
  font-size: 30px;
  font-family: 'Digital-7 Mono', sans-serif;
  background: black;
  border: 1px solid;
  border-color: #808080 #fff #fff #808080;
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
}): JSX.Element => {
  const time = startMs ? (Date.now() - startMs) * 1000 : 0;
  return (
    <div
      css={css`
        padding: 7px;
        background-color: #bdbdbd;
        border-width: 1px;
        border-style: solid;
        border-color: #dedede #000 #000 #dedede;
        box-shadow: inset -1px -1px #7b7b7b, inset 1px 1px white;
      `}
    >
      <BodySection>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 3px 5px;
          `}
        >
          <HeadingNumber>{mines.toString().padStart(3, '0')}</HeadingNumber>
          <button
            type="button"
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #bdbdbd;
              box-shadow: 0 0 0 1px #7b7b7b;
              border: 2px solid;
              border-color: #fff #7b7b7b #7b7b7b #fff;
              width: 26px;
              height: 26px;
              font-size: 14px;
              padding-top: 1px;
              :active {
                border-color: transparent;
                padding-top: 2px;
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
              resetGame(level);
              // https://bugs.chromium.org/p/chromium/issues/detail?id=1038823
              currentTarget.blur();
            }}
          >
            <span role="img" aria-label="smile">
              🙂
            </span>
          </button>
          <HeadingNumber>{time.toString().padStart(3, '0')}</HeadingNumber>
        </div>
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
                      border-width: 2px;
                      border-style: solid;
                      border-color: #fff #7b7b7b #7b7b7b #fff;
                      padding: 0;
                      :active {
                        border-width: 1px 0 0 1px;
                        border-color: #7b7b7b;
                        padding-top: 2px;
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
                    border-color: #7b7b7b;
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
};

export default WindowBody;
