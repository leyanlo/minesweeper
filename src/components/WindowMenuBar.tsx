import { css } from '@emotion/core';
import React from 'react';

import MenuItemCheckFocused from '../images/sprites/menu-item-check-focused.svg';
import MenuItemCheck from '../images/sprites/menu-item-check.svg';
import { ActionType, GameContext, Level } from './Game';
import WindowMenu, { ItemType } from './WindowMenu';

const checkIcon = {
  default: MenuItemCheck,
  focused: MenuItemCheckFocused
}

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
            ...(level === state.level ? { icon: checkIcon } : {}),
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
            ...(state.hasMarks ? { icon: checkIcon } : {}),
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
          },
        ]}
      />
    </ul>
  );
};

export default WindowMenuBar;
