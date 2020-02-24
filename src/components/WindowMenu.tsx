import { css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { fadeIn, Level } from './utils';

const menuButtonOpenCss = css`
  padding: 1px 4px 0 6px;
  border-color: #808080 #fff #fff #808080;
  :hover {
    border-color: #808080 #fff #fff #808080;
  }
`;

const menuButtonClosedCss = css`
  :hover {
    border-color: #fff #808080 #808080 #fff;
  }
`;

const MenuButton = styled.button<{ isOpen: boolean }>`
  border: 1px solid transparent;
  padding: 0 5px;
  height: 18px;
  :focus {
    outline: none;
  }
  :active,
  :focus {
    ${menuButtonOpenCss};
  }
  ${({ isOpen }) => (isOpen ? menuButtonOpenCss : menuButtonClosedCss)};
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
    css={css`
      display: block;
      width: 100%;
      height: 17px;
      text-align: left;
      border: none;
      padding: 0 16px;
      :focus {
        outline: none;
      }
      :hover,
      :focus {
        background: #0b246a;
        color: white;
      }
      ${isChecked
        ? `
              ::before {
                content: '✓';
                position: absolute;
                margin-left: -12px;
              }
            `
        : ``};
    `}
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
      margin: 3px 1px;
      border-style: solid;
      border-width: 1px 0;
      border-color: #808080 transparent white;
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
        <MenuButton
          type="button"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          isOpen={isOpen}
          onClick={({ currentTarget }) => {
            setOpen(!isOpen);
            // https://bugs.chromium.org/p/chromium/issues/detail?id=1038823
            currentTarget.blur();
          }}
        >
          Game
        </MenuButton>
        {isOpen && (
          <div
            role="menu"
            css={css`
              position: absolute;
              border: 1px solid;
              border-color: #d4d0c8 #404040 #404040 #d4d0c8;
              box-shadow: 8px 8px 4px -4px rgba(0, 0, 0, 0.5);
              animation: ${fadeIn} 150ms;
            `}
          >
            <div
              css={css`
                border: 1px solid;
                border-color: #fff #808080 #808080 #fff;
                background-color: #d4d0c8;
                padding: 1px;
                min-width: 123px;
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
                  onClick={() => {
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
                onClick={() => {
                  setMarks(!hasMarks);
                  setOpen(false);
                }}
              >
                Marks (?)
              </MenuItem>
            </div>
          </div>
        )}
      </li>
    </ul>
  );
};

export default WindowMenu;
