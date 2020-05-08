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
    <path d="m8 0c-4.42 0-8 3.58-8 8 0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38a8.013 8.013 0 0 0 5.45-7.59c0-4.42-3.58-8-8-8z" />
  </svg>
);

const MediumIcon = (): JSX.Element => (
  <svg
    height="11"
    viewBox="0 0 195 195"
    width="11"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="monogram">
      <path d="m0 0h195v195h-195z" fill="#fff" />
      <path
        d="m46.5340803 65.2157554c.1627575-1.6080982-.4504803-3.1975244-1.6512605-4.2798354l-12.2315593-14.7348618v-2.2010582h37.9789916l29.3557423 64.380952 25.8085906-64.380952h36.205415v2.2010582l-10.457983 10.0270429c-.901593.6872466-1.348829 1.8167851-1.161998 2.9347443v73.6743096c-.186831 1.117959.260405 2.247497 1.161998 2.934744l10.213352 10.027043v2.201058h-51.372549v-2.201058l10.580299-10.271605c1.039682-1.039389 1.039682-1.345091 1.039682-2.934744v-59.5508528l-29.4169 74.7136978h-3.9752567l-34.2483661-74.7136978v50.0740738c-.2855504 2.105255.4136417 4.224786 1.8958917 5.747208l13.7605042 16.691358v2.201058h-39.0186741v-2.201058l13.7605042-16.691358c1.4714579-1.524946 2.1298796-3.658537 1.7735761-5.747208z"
        fill="#000"
      />
    </mask>
    <path d="m0 0h195v195h-195z" mask="url(#monogram)" />
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
        name="About"
        list={[
          {
            type: ItemType.Item,
            name: 'Medium',
            onClick: () => {
              window.open(
                'https://medium.com/@leyanlo/building-pixel-perfect-minesweeper-in-react-51391c5a3061',
                '_blank',
                'noopener noreferrer',
              );
            },
            Icon: MediumIcon,
          },
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
