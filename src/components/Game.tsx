import React from 'react';

export enum Level {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Expert = 'Expert',
}

export enum Mask {
  Hidden,
  Visible,
  Exploded,
  Flagged,
  Marked,
}

export enum GameState {
  Playing,
  Won,
  Lost,
}

const BOARD_INFO = {
  Beginner: {
    rows: 8,
    columns: 8,
    mines: 10,
  },
  Intermediate: {
    rows: 16,
    columns: 16,
    mines: 40,
  },
  Expert: {
    rows: 16,
    columns: 30,
    mines: 99,
  },
};

const incrementNeighbors = ({
  board,
  row,
  column,
}: {
  board: number[][];
  row: number;
  column: number;
}): void => {
  const rows = board.length;
  const columns = board[0].length;

  for (let i = Math.max(row - 1, 0); i <= Math.min(row + 1, rows - 1); i++) {
    for (
      let j = Math.max(column - 1, 0);
      j <= Math.min(column + 1, columns - 1);
      j++
    ) {
      if (board[i][j] !== -1) {
        // eslint-disable-next-line no-param-reassign
        board[i][j]++;
      }
    }
  }
};

const createBoard = (level: Level): number[][] => {
  const { rows, columns, mines } = BOARD_INFO[level];
  const board = [...Array(rows)].map(() => [...Array(columns)].map(() => 0));

  [...Array(mines)].forEach(() => {
    let i;
    let j;
    do {
      i = ~~(Math.random() * rows);
      j = ~~(Math.random() * columns);
    } while (board[i][j] === -1);
    board[i][j] = -1;

    incrementNeighbors({
      board,
      row: i,
      column: j,
    });
  });
  return board;
};

const createMask = (level: Level): Mask[][] => {
  const { rows, columns } = BOARD_INFO[level];
  return [...Array(rows)].map(() => [...Array(columns)].map(() => Mask.Hidden));
};

type State = {
  level: Level;
  hasMarks: boolean;
  mines: number;
  board: number[][];
  mask: Mask[][];
  startMs: number | null;
  endMs: number | null;
  gameState: GameState;
};

const init = (level: Level, state?: State): State => ({
  level,
  hasMarks: state?.hasMarks || false,
  mines: BOARD_INFO[level].mines,
  board: createBoard(level),
  mask: createMask(level),
  startMs: null,
  endMs: null,
  gameState: GameState.Playing,
});

const onClickMine = ({
  state,
  row,
  column,
}: {
  state: State;
  row: number;
  column: number;
}): State => ({
  ...state,
  mask: state.mask.map((r, i) =>
    r.map((c, j) =>
      state.board[i][j] !== -1
        ? c
        : i === row && j === column
        ? Mask.Exploded
        : Mask.Visible,
    ),
  ),
  startMs: state.startMs || Date.now(),
  endMs: Date.now(),
  gameState: GameState.Lost,
});

const onClickNumber = ({
  state,
  row,
  column,
}: {
  state: State;
  row: number;
  column: number;
}): State => {
  const checks = [[row, column]];
  const nextMask = [...state.mask];
  for (let check = checks.pop(); check; check = checks.pop()) {
    const [i, j] = check;
    if (
      i < 0 ||
      i >= nextMask.length ||
      j < 0 ||
      j >= nextMask[0].length ||
      nextMask[i][j] === Mask.Visible
    ) {
      continue;
    }
    nextMask[i][j] = Mask.Visible;
    if (!state.board[i][j]) {
      checks.push(
        [i - 1, j],
        [i - 1, j + 1],
        [i, j + 1],
        [i + 1, j + 1],
        [i + 1, j],
        [i + 1, j - 1],
        [i, j - 1],
        [i - 1, j - 1],
      );
    }
  }

  // win if every non-mine cell is visible
  const hasWon = nextMask.every((r, i) =>
    r.every((c, j) => state.board[i][j] === -1 || c !== Mask.Hidden),
  );

  return {
    ...state,
    mask: nextMask,
    startMs: state.startMs || Date.now(),
    ...(hasWon
      ? {
          endMs: Date.now(),
          gameState: GameState.Won,
        }
      : {}),
  };
};

const onClick = ({
  state,
  row,
  column,
}: {
  state: State;
  row: number;
  column: number;
}): State =>
  state.board[row][column] === -1
    ? onClickMine({
        state,
        row,
        column,
      })
    : onClickNumber({ state, row, column });

export enum ActionType {
  Init,
  Click,
  ToggleMarks,
}

type Action =
  | {
      type: ActionType.Init;
      level: Level;
      state: State;
    }
  | {
      type: ActionType.Click;
      row: number;
      column: number;
    }
  | {
      type: ActionType.ToggleMarks;
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.Init:
      return init(action.level, state);
    case ActionType.Click:
      return onClick({ state, row: action.row, column: action.column });
    default:
      return {
        ...state,
        hasMarks: !state.hasMarks,
      };
  }
};

export const GameContext = React.createContext({
  state: init(Level.Beginner),
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  dispatch: (action: Action) => {},
});

const Game = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, Level.Beginner, init);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default Game;
