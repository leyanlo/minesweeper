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

export enum PlayingState {
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

type GameState = {
  level: Level;
  hasMarks: boolean;
  mines: number;
  board: number[][];
  mask: Mask[][];
  startMs: number | null;
  endMs: number | null;
  playingState: PlayingState;
  isClicking: boolean;
};

const init = (level: Level, state?: GameState): GameState => ({
  level,
  hasMarks: state?.hasMarks || false,
  mines: BOARD_INFO[level].mines,
  board: createBoard(level),
  mask: createMask(level),
  startMs: null,
  endMs: null,
  playingState: PlayingState.Playing,
  isClicking: false,
});

const onStartClick = ({
  state,
  row,
  column,
}: {
  state: GameState;
  row: number;
  column: number;
}): GameState => ({
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

const onStopClick = ({ state }: { state: GameState }): GameState => ({
  ...state,
  mask: state.mask.map(r =>
    r.map(c =>
      c === Mask.Clicking
        ? Mask.Hidden
        : c === Mask.MarkedClicking
        ? Mask.Marked
        : c,
    ),
  ),
  isClicking: false,
});

const onClickMine = ({
  state,
  row,
  column,
}: {
  state: GameState;
  row: number;
  column: number;
}): GameState => ({
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
  playingState: PlayingState.Lost,
  isClicking: false,
});

const onClickNumber = ({
  state,
  row,
  column,
}: {
  state: GameState;
  row: number;
  column: number;
}): GameState => {
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
          gameState: PlayingState.Won,
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
  state: GameState;
  row: number;
  column: number;
}): GameState => {
  if (
    state.mask[row][column] === Mask.Flagged ||
    state.mask[row][column] === Mask.Wrong
  ) {
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
  state: GameState;
  row: number;
  column: number;
}): GameState => ({
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
  state: GameState;
  row: number;
  column: number;
}): GameState => {
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
  state: GameState;
  row: number;
  column: number;
}): GameState => {
  // do nothing if not playing or if cell is visible
  if (
    state.playingState !== PlayingState.Playing ||
    state.mask[row][column] === Mask.Visible
  ) {
    return state;
  }

  let nextMines = state.mines;
  const nextMask = [...state.mask];
  switch (state.mask[row][column]) {
    case Mask.Hidden:
    case Mask.Clicking:
      nextMines--;
      nextMask[row][column] = Mask.Flagged;
      break;
    case Mask.Flagged:
      nextMines++;
      nextMask[row][column] = state.hasMarks ? Mask.Marked : Mask.Hidden;
      break;
    case Mask.Marked:
    case Mask.MarkedClicking:
      nextMask[row][column] = Mask.Hidden;
      break;
    default:
      break;
  }

  return {
    ...state,
    mines: nextMines,
    mask: nextMask,
    isClicking: false,
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

export type GameAction =
  | {
      type: ActionType.Init;
      level: Level;
      state: GameState;
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

const reducer = (state: GameState, action: GameAction): GameState => {
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

const GameContext = React.createContext<
  [GameState, React.Dispatch<GameAction>]
>([init(Level.Beginner), (action: GameAction) => {}]);

export default GameContext;

export const GameContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const providerValue = React.useReducer(reducer, Level.Beginner, init);
  return (
    <GameContext.Provider value={providerValue}>
      {children}
    </GameContext.Provider>
  );
};
