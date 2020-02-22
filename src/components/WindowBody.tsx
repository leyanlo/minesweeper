/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

import { Level } from './utils';

const MinesweeperSection = styled.section`
  border: 2px solid;
  border-color: #7d7d7d #fff #fff #7d7d7d;
  :not(:last-child) {
    margin-bottom: 7px;
  }
`;

const MinesweeperHeadingNumber = styled.div`
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
    case 7:
      return '#000000';
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
}: {
  mines: number;
  startMs: number | null;
  board: number[][];
  level: Level;
  resetGame: (level: Level) => void;
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
      <MinesweeperSection>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 3px 5px;
          `}
        >
          <MinesweeperHeadingNumber>
            {mines.toString().padStart(3, '0')}
          </MinesweeperHeadingNumber>
          <button
            type="button"
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              width: 26px;
              height: 26px;
              background-color: #bdbdbd;
              padding: 0;
              font-size: 15px;
              border: 1px solid #7b7b7b;
              margin-top: -2px;
            `}
            onClick={() => {
              resetGame(level);
            }}
          >
            <span
              role="img"
              aria-label="smile"
              css={css`
                border: 2px solid;
                border-color: #fff #7b7b7b #7b7b7b #fff;
              `}
            >
              🙂
            </span>
          </button>
          <MinesweeperHeadingNumber>
            {time.toString().padStart(3, '0')}
          </MinesweeperHeadingNumber>
        </div>
      </MinesweeperSection>
      <MinesweeperSection>
        {board.map(row => (
          <div
            css={css`
              display: flex;
            `}
          >
            {row.map(cell => (
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
            ))}
          </div>
        ))}
      </MinesweeperSection>
    </div>
  );
};

export default WindowBody;
