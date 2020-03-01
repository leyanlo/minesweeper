/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

import Mine0 from '../images/sprites/mine-0.svg';
import Mine1 from '../images/sprites/mine-1.svg';
import Mine2 from '../images/sprites/mine-2.svg';
import Mine3 from '../images/sprites/mine-3.svg';
import Mine4 from '../images/sprites/mine-4.svg';
import Mine5 from '../images/sprites/mine-5.svg';
import Mine6 from '../images/sprites/mine-6.svg';
import Mine7 from '../images/sprites/mine-7.svg';
import Mine8 from '../images/sprites/mine-8.svg';
import MineCovered from '../images/sprites/mine-covered.svg';
import MineExploded from '../images/sprites/mine-exploded.svg';
import Mine from '../images/sprites/mine.svg';
import { ActionType, GameContext, GameState, Mask } from './Game';

const getMineUrl = (cell: number): string => {
  switch (cell) {
    case 0:
      return Mine0;
    case 1:
      return Mine1;
    case 2:
      return Mine2;
    case 3:
      return Mine3;
    case 4:
      return Mine4;
    case 5:
      return Mine5;
    case 6:
      return Mine6;
    case 7:
      return Mine7;
    case 8:
      return Mine8;
    default:
      return Mine;
  }
};

const WindowBodyBoard = (): JSX.Element => {
  const { state, dispatch } = React.useContext(GameContext);

  return (
    <React.Fragment>
      {state.board.map((row, i) => (
        <div
          css={css`
            display: flex;
          `}
        >
          {row.map((cell, j) => {
            if (state.mask[i][j] === Mask.Hidden) {
              return (
                // eslint-disable-next-line jsx-a11y/control-has-associated-label
                <button
                  type="button"
                  disabled={state.gameState !== GameState.Playing}
                  css={css`
                    border: none;
                    padding: 0;
                    width: 16px;
                    height: 16px;
                    background-image: url(${MineCovered});
                    :active {
                      background-image: url(${Mine0});
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
                    dispatch({
                      type: ActionType.Click,
                      row: i,
                      column: j,
                    });
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
                  background-image: url(${state.mask[i][j] === Mask.Exploded
                    ? MineExploded
                    : getMineUrl(cell)});
                `}
              />
            );
          })}
        </div>
      ))}
    </React.Fragment>
  );
};

export default WindowBodyBoard;
