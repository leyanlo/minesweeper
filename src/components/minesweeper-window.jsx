import React from 'react';

import {
  Window,
  WindowHeader,
  WindowHeaderIcon,
  WindowMenu,
  WindowMenuItem,
  WindowSubMenu,
  WindowSubMenuItem,
  WindowSubMenuSeparator
} from './styled/window';
import MinesweeperIcon from '../images/minesweeper-icon.png';

class MinesweeperWindow extends React.PureComponent {
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
    return (
      <Window>
        <WindowHeader>
          <WindowHeaderIcon src={MinesweeperIcon} /> Minesweeper
        </WindowHeader>
        <nav role="navigation">
          <WindowMenu>
            <WindowMenuItem>
              <button
                type="button"
                aria-haspopup="true"
                onClick={this.onClickMenuItem}
                onBlur={this.onBlurMenuItem}
              >
                Game
              </button>
              <WindowSubMenu className="dropdown" aria-label="submenu">
                <WindowSubMenuItem>
                  <button type="button">New</button>
                </WindowSubMenuItem>
                <WindowSubMenuSeparator />
                <WindowSubMenuItem>
                  <button type="button">Beginner</button>
                </WindowSubMenuItem>
                <WindowSubMenuItem>
                  <button type="button">Intermediate</button>
                </WindowSubMenuItem>
                <WindowSubMenuItem>
                  <button type="button">Expert</button>
                </WindowSubMenuItem>
                <WindowSubMenuSeparator />
                <WindowSubMenuItem>
                  <button type="button">Marks (?)</button>
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
