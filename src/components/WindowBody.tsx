import styled from '@emotion/styled';
import React from 'react';

import { Level } from './utils';

const StyledMinesweeperBody = styled.div`
  padding: 7px;
  background-color: #bdbdbd;
  border-width: 1px;
  border-style: solid;
  border-color: #dedede #000 #000 #dedede;
  box-shadow: inset -1px -1px #7b7b7b, inset 1px 1px white;
`;

const MinesweeperSection = styled.section`
  border: 2px solid;
  border-color: #7d7d7d #fff #fff #7d7d7d;
  &:not(:last-child) {
    margin-bottom: 7px;
  }
`;

const MinesweeperHeading = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
`;

const MinesweeperHeadingNumber = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 23px;
  padding-top: 4px;
  color: #ff0201;
  font-size: 29px;
  font-family: 'Digital-7 Mono', sans-serif;
  background: black;
`;

const MinesweeperHeadingButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  background-color: #bdbdbd;
  box-shadow: inset -1px -1px #7b7b7b, inset 1px 1px white;
  padding: 0;
`;

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
    <StyledMinesweeperBody>
      <MinesweeperSection>
        <MinesweeperHeading>
          <MinesweeperHeadingNumber>
            {mines.toString().padStart(3, '0')}
          </MinesweeperHeadingNumber>
          <MinesweeperHeadingButton
            onClick={() => {
              resetGame(level);
            }}
          >
            <span role="img" aria-label="smile">
              🙂
            </span>
          </MinesweeperHeadingButton>
          <MinesweeperHeadingNumber>
            {time.toString().padStart(3, '0')}
          </MinesweeperHeadingNumber>
        </MinesweeperHeading>
      </MinesweeperSection>
      <MinesweeperSection>
        {board.map(row => (
          <>
            {row.map(cell => (
              <span>{cell}</span>
            ))}
            <br />
          </>
        ))}
      </MinesweeperSection>
    </StyledMinesweeperBody>
  );
};

export default WindowBody;
