import * as keymirror from 'keymirror';
import React from 'react';

import {
  Window,
  WindowHeader,
  WindowHeaderIcon,
  WindowMenu,
  WindowMenuItem,
  WindowMenuItemButton,
  WindowSubMenu,
  WindowSubMenuItem,
  WindowSubMenuItemButton,
  WindowSubMenuSeparator
} from './styled/window';
import MinesweeperIcon from '../images/minesweeper-icon.png';

const LEVEL = keymirror({
  BEGINNER: null,
  INTERMEDIATE: null,
  EXPERT: null
});

class MinesweeperWindow extends React.PureComponent {
  gameMenuButtonRef = React.createRef();

  state = {
    level: LEVEL.BEGINNER,
    hasMarks: false
  };

  componentDidMount() {
    document.body.addEventListener(
      'click',
      (this.handleClickBody = event => {
        if (event.target === this.gameMenuButtonRef.current) {
          return;
        }
        this.handleCloseGameMenu(event);
      }),
      false
    );
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClickBody, false);
    this.handleClickBody = null;
  }

  handleOpenGameMenu = event => {
    if (event.currentTarget.parentElement.classList.contains('-open')) {
      this.handleCloseGameMenu();
      event.currentTarget.blur();
    } else {
      event.currentTarget.parentElement.classList.add('-open');
    }
  };

  handleCloseGameMenu = () => {
    this.gameMenuButtonRef.current.parentElement.classList.remove('-open');
  };

  render() {
    const { level, hasMarks } = this.state;

    return (
      <Window>
        <WindowHeader>
          <WindowHeaderIcon src={MinesweeperIcon} /> Minesweeper
        </WindowHeader>
        <nav role="navigation">
          <WindowMenu>
            <WindowMenuItem>
              <WindowMenuItemButton
                ref={this.gameMenuButtonRef}
                type="button"
                aria-haspopup="true"
                onClick={this.handleOpenGameMenu}
              >
                Game
              </WindowMenuItemButton>
              <WindowSubMenu className="dropdown" aria-label="submenu">
                <WindowSubMenuItem>
                  <WindowSubMenuItemButton type="button">
                    New
                  </WindowSubMenuItemButton>
                </WindowSubMenuItem>
                <WindowSubMenuSeparator />
                <WindowSubMenuItem>
                  <WindowSubMenuItemButton
                    type="button"
                    checked={level === LEVEL.BEGINNER}
                  >
                    Beginner
                  </WindowSubMenuItemButton>
                </WindowSubMenuItem>
                <WindowSubMenuItem>
                  <WindowSubMenuItemButton
                    type="button"
                    checked={level === LEVEL.INTERMEDIATE}
                  >
                    Intermediate
                  </WindowSubMenuItemButton>
                </WindowSubMenuItem>
                <WindowSubMenuItem>
                  <WindowSubMenuItemButton
                    type="button"
                    checked={level === LEVEL.EXPERT}
                  >
                    Expert
                  </WindowSubMenuItemButton>
                </WindowSubMenuItem>
                <WindowSubMenuSeparator />
                <WindowSubMenuItem>
                  <WindowSubMenuItemButton type="button" checked={hasMarks}>
                    Marks (?)
                  </WindowSubMenuItemButton>
                </WindowSubMenuItem>
              </WindowSubMenu>
            </WindowMenuItem>
          </WindowMenu>
        </nav>
      </Window>
    );
  }
}

export default MinesweeperWindow;
