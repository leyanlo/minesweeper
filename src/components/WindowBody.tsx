/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { Level, Mask } from './utils';

const BodySection = styled.section`
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  :not(:last-child) {
    margin-bottom: 6px;
  }
`;

const HeadingNumber = styled.div`
  display: flex;
  align-items: center;
  height: 25px;
  padding-top: 3px;
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

const getTime = (startMs: number | null): number =>
  startMs ? ~~((Date.now() - startMs) / 1000) : 0;

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
  const [time, setTime] = React.useState<number>(getTime(startMs));

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getTime(startMs));
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, [startMs]);

  return (
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
        <div
          css={css`
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            padding: 4px 5px;
          `}
        >
          <HeadingNumber>{mines.toString().padStart(3, '0')}</HeadingNumber>
          <button
            type="button"
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #c0c0c0;
              box-shadow: 0 0 0 1px #808080;
              border: 2px solid;
              border-color: #fff #808080 #808080 #fff;
              width: 24px;
              height: 24px;
              font-size: 14px;
              padding: 0 0 0 2px;
              :active {
                border-color: transparent;
                padding: 1px 0 0 3px;
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
};

export default WindowBody;
