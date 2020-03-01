/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

import DisplayDigitHyphen from '../images/sprites/display-digit--.svg';
import DisplayDigit0 from '../images/sprites/display-digit-0.svg';
import DisplayDigit1 from '../images/sprites/display-digit-1.svg';
import DisplayDigit2 from '../images/sprites/display-digit-2.svg';
import DisplayDigit3 from '../images/sprites/display-digit-3.svg';
import DisplayDigit4 from '../images/sprites/display-digit-4.svg';
import DisplayDigit5 from '../images/sprites/display-digit-5.svg';
import DisplayDigit6 from '../images/sprites/display-digit-6.svg';
import DisplayDigit7 from '../images/sprites/display-digit-7.svg';
import DisplayDigit8 from '../images/sprites/display-digit-8.svg';
import DisplayDigit9 from '../images/sprites/display-digit-9.svg';
import FaceActive from '../images/sprites/face-active.svg';
import Face from '../images/sprites/face.svg';
import { ActionType, GameContext } from './Game';
import { VisuallyHidden } from './styled-components';

const getDisplayNumberSrc = (s: string): string => {
  switch (s) {
    case '0':
      return DisplayDigit0;
    case '1':
      return DisplayDigit1;
    case '2':
      return DisplayDigit2;
    case '3':
      return DisplayDigit3;
    case '4':
      return DisplayDigit4;
    case '5':
      return DisplayDigit5;
    case '6':
      return DisplayDigit6;
    case '7':
      return DisplayDigit7;
    case '8':
      return DisplayDigit8;
    case '9':
      return DisplayDigit9;
    default:
      return DisplayDigitHyphen;
  }
};

const HeadingNumber = ({ number }: { number: number }): JSX.Element => {
  let displayString;
  if (number < 0) {
    const clampedNumber = Math.max(-99, ~~number);
    displayString = `-${Math.abs(clampedNumber)
      .toString()
      .padStart(2, '0')}`;
  } else {
    const clampedNumber = Math.min(999, ~~number);
    displayString = clampedNumber.toString().padStart(3, '0');
  }

  return (
    <div
      css={css`
        border: 1px solid;
        border-color: #808080 #fff #fff #808080;
      `}
    >
      {displayString.split('').map((s, i) => (
        <img key={i} alt={s} src={getDisplayNumberSrc(s)} />
      ))}
    </div>
  );
};

const getTime = (startMs: number | null): number =>
  startMs ? ~~((Date.now() - startMs) / 1000) : 0;

const WindowBodyHeading = (): JSX.Element => {
  const { state, dispatch } = React.useContext(GameContext);
  const [time, setTime] = React.useState<number>(getTime(state.startMs));

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getTime(state.startMs));
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, [state.startMs]);

  return (
    <div
      css={css`
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        padding: 4px 5px;
      `}
    >
      <HeadingNumber number={state.mines} />
      <button
        type="button"
        css={css`
          border: none;
          padding: 0;
          width: 26px;
          height: 26px;
          background-image: url(${Face});
          :active {
            background-image: url(${FaceActive});
            :focus {
              outline: none;
            }
          }
          :focus {
            outline: 1px dotted black;
            outline-offset: -5px;
          }
        `}
        onClick={({ currentTarget }) => {
          dispatch({
            type: ActionType.Init,
            level: state.level,
            state,
          });
          // https://bugs.chromium.org/p/chromium/issues/detail?id=1038823
          currentTarget.blur();
        }}
      >
        <VisuallyHidden>New game</VisuallyHidden>
      </button>
      <HeadingNumber number={time} />
    </div>
  );
};

export default WindowBodyHeading;
