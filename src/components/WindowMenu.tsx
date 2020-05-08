import { css } from '@emotion/core';
import React from 'react';

import { fadeIn } from './styles';

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

const MenuItem = ({
  children,
  Icon,
  onClick,
}: {
  children: React.ReactNode;
  Icon?: React.ElementType;
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
        color: #fff;
      }
    `}
    type="button"
    role="menuitem"
    onClick={onClick}
  >
    {Icon ? (
      <div
        css={css`
          position: absolute;
          margin-top: 2px;
          margin-left: -14px;
          width: 11px;
          height: 11px;
          display: flex;
          button:hover > &,
          button:focus > & {
            color: #fff;
          }
        `}
      >
        <Icon />
      </div>
    ) : null}
    {children}
  </button>
);

const MenuDivider = (): JSX.Element => (
  <hr
    css={css`
      margin: 3px 1px;
      border-style: solid;
      border-width: 1px 0;
      border-color: #808080 transparent #fff;
    `}
    aria-orientation="horizontal"
  />
);

export enum ItemType {
  Item,
  Divider,
}

type ListItem =
  | {
      type: ItemType.Item;
      name: string;
      onClick: () => void;
      Icon?: React.ElementType;
    }
  | {
      type: ItemType.Divider;
    };

const WindowMenu = ({
  name,
  list,
}: {
  name: string;
  list: ListItem[];
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
    <li ref={menuEl}>
      <button
        css={css`
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
          ${isOpen ? menuButtonOpenCss : menuButtonClosedCss};
        `}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={({ currentTarget }) => {
          setOpen(!isOpen);
          // https://bugs.chromium.org/p/chromium/issues/detail?id=1038823
          currentTarget.blur();
        }}
      >
        {name}
      </button>
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
            {list.map((item, i) => {
              switch (item.type) {
                case ItemType.Item:
                  return (
                    <MenuItem
                      key={i}
                      Icon={item.Icon}
                      onClick={() => {
                        item.onClick();
                        setOpen(false);
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  );
                case ItemType.Divider:
                  return <MenuDivider key={i} />;
                default:
                  return null;
              }
            })}
          </div>
        </div>
      )}
    </li>
  );
};

export default WindowMenu;
