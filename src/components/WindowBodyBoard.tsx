/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import debounce from 'just-debounce-it';
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
import CellMarkedClicking from '../images/sprites/cell-marked-clicking.svg';
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
    case Mask.MarkedClicking:
      return CellMarkedClicking;
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
  const [
    touchTimeoutId,
    setTouchTimeoutId,
  ] = React.useState<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    try {
      document.createEvent('TouchEvent');
    } catch (e) {
      setTouch(false);
    }
  }, []);

  React.useEffect(
    () => () => {
      if (touchTimeoutId) {
        clearTimeout(touchTimeoutId);
        setTouchTimeoutId(null);
      }
    },
    [touchTimeoutId, setTouchTimeoutId],
  );

  const debouncedStopClick = React.useMemo(
    () =>
      debounce(
        () => {
          dispatch({
            type: ActionType.StopClick,
          });
          if (touchTimeoutId) {
            clearTimeout(touchTimeoutId);
            setTouchTimeoutId(null);
          }
        },
        100,
        true,
      ),
    [dispatch, touchTimeoutId, setTouchTimeoutId],
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events,jsx-a11y/mouse-events-have-key-events
    <div
      css={css`
        background-color: #7b7b7b;
        -webkit-touch-callout: none;
        user-select: none;
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
            dispatch({
              type: ActionType.StartChord,
              row,
              column,
            });
            break;
          default:
        }
      }}
      onMouseOut={e => {
        e.preventDefault();
        if (hasTouch || state.gameState !== GameState.Playing) {
          return;
        }
        switch (e.buttons) {
          case 1:
          case 3:
            dispatch({
              type: ActionType.StopClick,
            });
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
        switch (e.buttons) {
          case 1:
            dispatch({
              type: ActionType.StartClick,
              row,
              column,
            });
            break;
          case 3:
            dispatch({
              type: ActionType.StartChord,
              row,
              column,
            });
            break;
          default:
        }
      }}
      onMouseUp={e => {
        e.preventDefault();
        if (state.gameState !== GameState.Playing) {
          return;
        }
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
            dispatch({
              type: ActionType.Chord,
              row,
              column,
            });
            break;
          default:
        }
        setButtons(null);
      }}
      onTouchStart={e => {
        e.preventDefault();
        const { row, column } = getCoordinates(e.target as HTMLElement);
        dispatch({
          type: ActionType.StartClick,
          row,
          column,
        });
        setTouchTimeoutId(
          setTimeout(() => {
            switch (state.mask[row][column]) {
              case Mask.Hidden:
              case Mask.MarkedClicking:
              case Mask.Flagged:
                dispatch({
                  type: ActionType.Flag,
                  row,
                  column,
                });
                break;
              case Mask.Visible:
                dispatch({
                  type: ActionType.Chord,
                  row,
                  column,
                });
                break;
              default:
            }
            setTouchTimeoutId(null);
          }, 500),
        );
      }}
      onTouchMove={e => {
        e.preventDefault();
        debouncedStopClick();
      }}
      onTouchEnd={e => {
        e.preventDefault();
        if (!state.isClicking || state.gameState !== GameState.Playing) {
          return;
        }
        const { row, column } = getCoordinates(e.target as HTMLElement);
        dispatch({
          type: ActionType.Click,
          row,
          column,
        });
        if (touchTimeoutId) {
          clearTimeout(touchTimeoutId);
          setTouchTimeoutId(null);
        }
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
