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
  MarkedClicking,
  Clicking,
  Wrong,
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
  isClicking: boolean;
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
  isClicking: false,
});

const onStartClick = ({
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
    r.map((c, j) => {
      if (i === row && j === column) {
        return c === Mask.Hidden
          ? Mask.Clicking
          : c === Mask.Marked
          ? Mask.MarkedClicking
          : c;
      }
      return c === Mask.Clicking ? Mask.Hidden : c;
    }),
  ),
  isClicking: true,
});

const onStopClick = ({ state }: { state: State }): State => ({
  ...state,
  mask: state.mask.map(r =>
    r.map(c => (c === Mask.Clicking ? Mask.Hidden : c)),
  ),
  isClicking: false,
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
    r.map((c, j) => {
      if (state.board[i][j] === -1) {
        return i === row && j === column ? Mask.Exploded : Mask.Visible;
      }
      return c === Mask.Flagged ? Mask.Wrong : c;
    }),
  ),
  endMs: Date.now(),
  gameState: GameState.Lost,
  isClicking: false,
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
      nextMask[i][j] === Mask.Visible ||
      nextMask[i][j] === Mask.Flagged
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
    startMs: state.startMs || Date.now(),
    ...(hasWon
      ? {
          mask: nextMask.map((r, i) =>
            r.map((c, j) => (state.board[i][j] !== -1 ? c : Mask.Flagged)),
          ),
          endMs: Date.now(),
          gameState: GameState.Won,
          mines: 0,
        }
      : { mask: nextMask }),
    isClicking: false,
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
}): State => {
  if (state.mask[row][column] === Mask.Flagged) {
    return state;
  }

  return state.board[row][column] !== -1
    ? onClickNumber({
        state,
        row,
        column,
      })
    : state.startMs
    ? onClickMine({
        state,
        row,
        column,
      })
    : onClick({
        state: init(state.level, state),
        row,
        column,
      });
};

const onStartChord = ({
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
    r.map((c, j) => {
      if (i >= row - 1 && i <= row + 1 && j >= column - 1 && j <= column + 1) {
        return c === Mask.Hidden
          ? Mask.Clicking
          : c === Mask.Marked
          ? Mask.MarkedClicking
          : c;
      }
      return c === Mask.Clicking ? Mask.Hidden : c;
    }),
  ),
  isClicking: true,
});

const onChord = ({
  state,
  row,
  column,
}: {
  state: State;
  row: number;
  column: number;
}): State => {
  // abort if cell not visible
  if (state.mask[row][column] !== Mask.Visible) {
    return onStopClick({ state });
  }

  const rows = state.board.length;
  const columns = state.board[0].length;

  let neighborFlags = 0;
  for (let i = Math.max(row - 1, 0); i <= Math.min(row + 1, rows - 1); i++) {
    for (
      let j = Math.max(column - 1, 0);
      j <= Math.min(column + 1, columns - 1);
      j++
    ) {
      if (state.mask[i][j] === Mask.Flagged) {
        neighborFlags++;
      }
    }
  }
  // abort if cell number does not match number of neighbors flagged
  if (neighborFlags !== state.board[row][column]) {
    return onStopClick({ state });
  }

  let newState = state;
  for (let i = Math.max(row - 1, 0); i <= Math.min(row + 1, rows - 1); i++) {
    for (
      let j = Math.max(column - 1, 0);
      j <= Math.min(column + 1, columns - 1);
      j++
    ) {
      newState = onClick({
        state: newState,
        row: i,
        column: j,
      });
    }
  }

  return newState;
};
const onFlag = ({
  state,
  row,
  column,
}: {
  state: State;
  row: number;
  column: number;
}): State => {
  // do nothing if not playing or if cell is visible
  if (
    state.gameState !== GameState.Playing ||
    state.mask[row][column] === Mask.Visible
  ) {
    return state;
  }

  return {
    ...state,
    mines:
      state.mask[row][column] === Mask.Flagged
        ? state.mines + 1
        : state.mask[row][column] === Mask.Hidden && state.hasMarks
        ? state.mines
        : state.mines - 1,
    mask: state.mask.map((r, i) =>
      r.map((c, j) =>
        i !== row || j !== column
          ? c
          : state.mask[row][column] === Mask.Flagged
          ? Mask.Hidden
          : state.mask[row][column] === Mask.Hidden && state.hasMarks
          ? Mask.Marked
          : Mask.Flagged,
      ),
    ),
  };
};

export enum ActionType {
  Init,
  StartClick,
  StopClick,
  Click,
  StartChord,
  Chord,
  Flag,
  ToggleMarks,
}

export type Action =
  | {
      type: ActionType.Init;
      level: Level;
      state: State;
    }
  | {
      type: ActionType.StartClick;
      row: number;
      column: number;
    }
  | {
      type: ActionType.StopClick;
    }
  | {
      type: ActionType.Click;
      row: number;
      column: number;
    }
  | {
      type: ActionType.StartChord;
      row: number;
      column: number;
    }
  | {
      type: ActionType.Chord;
      row: number;
      column: number;
    }
  | {
      type: ActionType.Flag;
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
    case ActionType.StartClick:
      return onStartClick({ state, row: action.row, column: action.column });
    case ActionType.StopClick:
      return onStopClick({ state });
    case ActionType.Click:
      return onClick({ state, row: action.row, column: action.column });
    case ActionType.StartChord:
      return onStartChord({ state, row: action.row, column: action.column });
    case ActionType.Chord:
      return onChord({ state, row: action.row, column: action.column });
    case ActionType.Flag:
      return onFlag({ state, row: action.row, column: action.column });
    case ActionType.ToggleMarks:
      return {
        ...state,
        hasMarks: !state.hasMarks,
      };
    default:
      // should not happen
      return state;
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
