/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

import Cell0 from '../images/sprites/cell-0.svg';
import Cell1 from '../images/sprites/cell-1.svg';
import Cell2 from '../images/sprites/cell-2.svg';
import Cell3 from '../images/sprites/cell-3.svg';
import Cell4 from '../images/sprites/cell-4.svg';
import Cell5 from '../images/sprites/cell-5.svg';
import Cell6 from '../images/sprites/cell-6.svg';
import Cell7 from '../images/sprites/cell-7.svg';
import Cell8 from '../images/sprites/cell-8.svg';
import CellCovered from '../images/sprites/cell-covered.svg';
import CellFlagged from '../images/sprites/cell-flagged.svg';
import CellMarked from '../images/sprites/cell-marked.svg';
import MineExploded from '../images/sprites/mine-exploded.svg';
import MineWrong from '../images/sprites/mine-wrong.svg';
import Mine from '../images/sprites/mine.svg';
import { ActionType, GameContext, GameState, Mask } from './Game';

const CellUrlMap: { [cell: number]: string } = {
  [-1]: Mine,
  0: Cell0,
  1: Cell1,
  2: Cell2,
  3: Cell3,
  4: Cell4,
  5: Cell5,
  6: Cell6,
  7: Cell7,
  8: Cell8,
};

const getBackgroundUrl = ({
  mask,
  cell,
}: {
  mask: Mask;
  cell: number;
}): string => {
  switch (mask) {
    case Mask.Visible:
      return CellUrlMap[cell];
    case Mask.Exploded:
      return MineExploded;
    case Mask.Flagged:
      return CellFlagged;
    case Mask.Marked:
      return CellMarked;
    case Mask.Clicking:
      return Cell0;
    case Mask.Wrong:
      return MineWrong;
    default:
      return CellCovered;
  }
};

const getCoordinates = (
  target: HTMLElement,
): { row: number; column: number } => {
  const [row, column] = (target.getAttribute('data-coordinates') as string)
    .split(',')
    .map((n: string) => parseInt(n, 10));
  return { row, column };
};

const WindowBodyBoard = (): JSX.Element => {
  const { state, dispatch } = React.useContext(GameContext);
  const [hasTouch, setTouch] = React.useState<boolean>(true);
  const [buttons, setButtons] = React.useState<number | null>(null);

  React.useEffect(() => {
    try {
      document.createEvent('TouchEvent');
    } catch (e) {
      setTouch(false);
    }
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events,jsx-a11y/mouse-events-have-key-events
    <div
      css={css`
        background-color: #7b7b7b;
      `}
      onContextMenu={e => {
        e.preventDefault();
      }}
      onMouseDown={e => {
        e.preventDefault();
        if (state.gameState !== GameState.Playing) {
          return;
        }
        const { row, column } = getCoordinates(e.target as HTMLElement);
        console.log('test: onMouseDown', e.buttons);
        setButtons(e.buttons);
        switch (e.buttons) {
          case 1:
            dispatch({
              type: ActionType.StartClick,
              row,
              column,
            });
            break;
          case 2:
            dispatch({
              type: ActionType.Flag,
              row,
              column,
            });
            break;
          case 3:
            // TODO: handle chords
            break;
          default:
        }
      }}
      onMouseOut={e => {
        e.preventDefault();
        if (hasTouch || state.gameState !== GameState.Playing) {
          return;
        }
        console.log('test: onMouseOut', e.buttons);
        switch (e.buttons) {
          case 1:
            dispatch({
              type: ActionType.StopClick,
            });
            break;
          case 3:
            // TODO: handle chords
            break;
          default:
        }
      }}
      onMouseOver={e => {
        e.preventDefault();
        if (hasTouch || state.gameState !== GameState.Playing) {
          return;
        }
        const { row, column } = getCoordinates(e.target as HTMLElement);
        console.log('test: onMouseOver', e.buttons);
        switch (e.buttons) {
          case 1:
            dispatch({
              type: ActionType.StartClick,
              row,
              column,
            });
            break;
          case 3:
            // TODO: handle chords
            break;
          default:
        }
      }}
      onMouseUp={e => {
        e.preventDefault();
        if (state.gameState !== GameState.Playing) {
          return;
        }
        console.log('test: onMouseUp', e.buttons);
        const { row, column } = getCoordinates(e.target as HTMLElement);
        switch (buttons) {
          case 1:
            dispatch({
              type: ActionType.Click,
              row,
              column,
            });
            break;
          case 3:
            // TODO: handle chords
            break;
          default:
        }
        setButtons(null);
      }}
      onTouchEnd={e => {
        e.preventDefault();
        console.log('test: onTouchEnd');
        // TODO: handle mobile
      }}
      onTouchMove={e => {
        e.preventDefault();
        console.log('test: onTouchMove');
        // TODO: handle mobile
      }}
      onTouchStart={e => {
        e.preventDefault();
        console.log('test: onTouchStart');
        // TODO: handle mobile
      }}
    >
      {state.board.map((row, i) => (
        <div
          key={i}
          css={css`
            display: flex;
          `}
        >
          {row.map((cell, j) => (
            <div
              key={`${i},${j}`}
              css={css`
                width: 16px;
                height: 16px;
                background-image: url(${getBackgroundUrl({
                  mask: state.mask[i][j],
                  cell,
                })});
              `}
              data-coordinates={`${i},${j}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default WindowBodyBoard;
