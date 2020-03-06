import { css } from '@emotion/core';
import React from 'react';

import { ActionType, GameContext, Level } from './Game';
import WindowMenu, { ItemType } from './WindowMenu';

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
            isChecked: level === state.level,
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
            isChecked: state.hasMarks,
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
                'noreferrer',
              );
            },
          },
        ]}
      />
    </ul>
  );
};

export default WindowMenuBar;
