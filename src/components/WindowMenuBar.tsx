import { css } from '@emotion/core';
import React from 'react';

import { ActionType, GameContext, Level } from './Game';
import WindowMenu, { ItemType } from './WindowMenu';

const CheckIcon = (): JSX.Element => (
  <svg
    height="11"
    viewBox="0 0 11 11"
    width="11"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m8 3h1v3h-1v1h-1v1h-1v1h-1v1h-1v-1h-1v-1h-1v-3h1v1h1v1h1v-1h1v-1h1v-1h1z" />
  </svg>
);

const Octicon = (): JSX.Element => (
  <svg
    height="11"
    viewBox="0 0 16 16"
    width="11"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m8 0c-4.42 0-8 3.58-8 8 0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38a8.013 8.013 0 0 0 5.45-7.59c0-4.42-3.58-8-8-8z"
    />
  </svg>
);

const WindowMenuBar = (): JSX.Element => {
  const { state, dispatch } = React.useContext(GameContext);

  return (
    <ul
      css={css`
        display: flex;
        margin-top: 0;
        margin-bottom: 0;
        padding-top: 1px;
        padding-left: 0;
        list-style-type: none;
      `}
    >
      <WindowMenu
        name="Game"
        list={[
          {
            type: ItemType.Item,
            name: 'New',
            onClick: () => {
              dispatch({
                type: ActionType.Init,
                level: state.level,
                state,
              });
            },
          },
          {
            type: ItemType.Divider,
          },
          ...[Level.Beginner, Level.Intermediate, Level.Expert].map(level => ({
            type: ItemType.Item,
            name: level,
            onClick: () => {
              dispatch({
                type: ActionType.Init,
                level,
                state,
              });
            },
            ...(level === state.level ? { Icon: CheckIcon } : {}),
          })),
          {
            type: ItemType.Divider,
          },
          {
            type: ItemType.Item,
            name: 'Marks (?)',
            onClick: () => {
              dispatch({
                type: ActionType.ToggleMarks,
              });
            },
            ...(state.hasMarks ? { Icon: CheckIcon } : {}),
          },
        ]}
      />
      <WindowMenu
        name="Help"
        list={[
          {
            type: ItemType.Item,
            name: 'GitHub',
            onClick: () => {
              window.open(
                'https://github.com/leyanlo/minesweeper',
                '_blank',
                'noopener noreferrer',
              );
            },
            Icon: Octicon,
          },
        ]}
      />
    </ul>
  );
};

export default WindowMenuBar;
