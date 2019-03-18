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
  state = {
    level: LEVEL.BEGINNER,
    hasMarks: false
  };

  onClickMenuItem = event => {
    if (event.currentTarget.parentElement.classList.contains('-open')) {
      event.currentTarget.blur();
    } else {
      event.currentTarget.parentElement.classList.add('-open');
    }
  };

  onBlurMenuItem = event => {
    event.currentTarget.parentElement.classList.remove('-open');
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
                type="button"
                aria-haspopup="true"
                onClick={this.onClickMenuItem}
                onBlur={this.onBlurMenuItem}
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
