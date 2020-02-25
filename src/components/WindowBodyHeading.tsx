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
import { Level } from './utils';

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
  const clampedNumber = Math.min(999, Math.max(-99, ~~number));
  const displayString = clampedNumber.toString().padStart(3, '0');

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

const WindowBodyHeading = ({
  level,
  mines,
  resetGame,
  startMs,
}: {
  level: Level;
  mines: number;
  resetGame: (level: Level) => void;
  startMs: number | null;
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
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        padding: 4px 5px;
      `}
    >
      <HeadingNumber number={mines} />
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
          padding: 0 0 0 1px;
          :active {
            border-color: transparent;
            padding: 1px 0 0 2px;
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
      <HeadingNumber number={time} />
    </div>
  );
};

export default WindowBodyHeading;
