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
import MinesweeperBody from './minesweeper-body';
import MinesweeperIcon from '../images/minesweeper-icon.png';

const LEVEL = {
  BEGINNER: 0,
  INTERMEDIATE: 1,
  EXPERT: 2
};

class MinesweeperWindow extends React.PureComponent {
  gameMenuButtonRef = React.createRef();

  state = {
    level: LEVEL.BEGINNER,
    hasMarks: false,
    board: null,
    numMines: 10,
    timer: 0
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

  initLevel = () => {
    // TODO
  };

  setLevel = level => () => {
    const { level: prevLevel } = this.state;
    if (level === prevLevel) {
      return;
    }
    this.setState({ level });
    this.initLevel();
  };

  setMarks = hasMarks => () => {
    this.setState({ hasMarks });
  };

  render() {
    const { board, level, hasMarks, numMines, timer } = this.state;

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
                  <WindowSubMenuItemButton
                    type="button"
                    onClick={this.initLevel()}
                  >
                    New
                  </WindowSubMenuItemButton>
                </WindowSubMenuItem>
                <WindowSubMenuSeparator />
                <WindowSubMenuItem>
                  <WindowSubMenuItemButton
                    type="button"
                    checked={level === LEVEL.BEGINNER}
                    onClick={this.setLevel(LEVEL.BEGINNER)}
                  >
                    Beginner
                  </WindowSubMenuItemButton>
                </WindowSubMenuItem>
                <WindowSubMenuItem>
                  <WindowSubMenuItemButton
                    type="button"
                    checked={level === LEVEL.INTERMEDIATE}
                    onClick={this.setLevel(LEVEL.INTERMEDIATE)}
                  >
                    Intermediate
                  </WindowSubMenuItemButton>
                </WindowSubMenuItem>
                <WindowSubMenuItem>
                  <WindowSubMenuItemButton
                    type="button"
                    checked={level === LEVEL.EXPERT}
                    onClick={this.setLevel(LEVEL.EXPERT)}
                  >
                    Expert
                  </WindowSubMenuItemButton>
                </WindowSubMenuItem>
                <WindowSubMenuSeparator />
                <WindowSubMenuItem>
                  <WindowSubMenuItemButton
                    type="button"
                    checked={hasMarks}
                    onClick={this.setMarks(!hasMarks)}
                  >
                    Marks (?)
                  </WindowSubMenuItemButton>
                </WindowSubMenuItem>
              </WindowSubMenu>
            </WindowMenuItem>
          </WindowMenu>
        </nav>
        <MinesweeperBody board={board} numMines={numMines} timer={timer} />
      </Window>
    );
  }
}

export default MinesweeperWindow;
