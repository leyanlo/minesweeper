import { css } from '@emotion/core';
import React from 'react';

import { Level } from './utils';

const buttonHighlightCss = css`
  background: #316ac5;
  color: white;
`;

const buttonCss = css`
  border: none;
  padding: 3px 6px;
  :focus {
    outline: none;
  }
  :hover,
  :focus {
    ${buttonHighlightCss};
  }
`;

const MenuItem = ({
  children,
  isChecked,
  onClick,
}: {
  children: React.ReactNode;
  isChecked?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}): JSX.Element => (
  <button
    css={[
      css`
        ${buttonCss};
        display: block;
        width: 100%;
        text-align: left;
        padding: 4px 16px;
      `,
      ...(isChecked
        ? [
            css`
              ::before {
                content: '✓';
                position: absolute;
                margin-left: -13px;
              }
            `,
          ]
        : []),
    ]}
    type="button"
    role="menuitem"
    onClick={onClick}
  >
    {children}
  </button>
);

const MenuDivider = (): JSX.Element => (
  <hr
    css={css`
      margin: 5px 1px;
      border-style: solid;
      border-width: 1px 0 0 0;
      border-color: #aca899;
    `}
    aria-orientation="horizontal"
  />
);

const WindowMenu = ({
  level,
  hasMarks,
  setMarks,
  resetGame,
}: {
  level: Level;
  hasMarks: boolean;
  setMarks: (hasMarks: boolean) => void;
  resetGame: (level: Level) => void;
}): JSX.Element => {
  const [isOpen, setOpen] = React.useState<boolean>(false);

  const menuEl = React.useRef<HTMLLIElement>(null);

  React.useEffect(() => {
    const listener = ({ target }: MouseEvent): void => {
      if (
        menuEl.current &&
        target instanceof Node &&
        menuEl.current.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener('click', listener, false);
    return () => {
      document.body.removeEventListener('click', listener, false);
    };
  }, []);

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
      <li ref={menuEl}>
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          css={[buttonCss, ...(isOpen ? [buttonHighlightCss] : [])]}
          onClick={({ currentTarget }) => {
            setOpen(!isOpen);
            currentTarget.blur();
          }}
        >
          Game
        </button>
        {isOpen && (
          <div
            role="menu"
            css={css`
              position: absolute;
              background-color: white;
              padding: 2px;
              border: 1px solid #aca899;
              min-width: 128px;
            `}
          >
            <MenuItem
              onClick={() => {
                resetGame(level);
                setOpen(false);
              }}
            >
              New
            </MenuItem>
            <MenuDivider />
            {[Level.Beginner, Level.Intermediate, Level.Expert].map(l => (
              <MenuItem
                key={l}
                onClick={({ currentTarget }) => {
                  if (l === level) {
                    currentTarget.blur();
                    return;
                  }
                  resetGame(l);
                  setOpen(false);
                }}
                isChecked={l === level}
              >
                {l}
              </MenuItem>
            ))}
            <MenuDivider />
            <MenuItem
              isChecked={hasMarks}
              onClick={({ currentTarget }) => {
                setMarks(!hasMarks);
                currentTarget.blur();
              }}
            >
              Marks (?)
            </MenuItem>
          </div>
        )}
      </li>
    </ul>
  );
};

export default WindowMenu;
