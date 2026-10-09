# Gridlock

A two-player Tic Tac Toe game for playing on the same device. Players take turns choosing squares, with Player One using `X` and Player Two using `O`.

## Features

- Local two-player gameplay
- Turn indicator for the active player
- Win detection across rows, columns, and diagonals
- Draw detection when the board is full
- Winning-cell highlight
- Score tracking across rounds
- Alternating starting player between rounds
- Reset match control
- Responsive layout for desktop and mobile screens
- Keyboard-accessible board controls

## Getting started

### Requirements

- Node.js
- pnpm

### Install dependencies

```bash
pnpm install
```

### Start the development server

```bash
pnpm run dev
```

Vite will print a local URL in the terminal. Open that URL in a browser and pass the device to the other player between turns.

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm run dev` | Starts the Vite development server |
| `pnpm run build` | Creates a production build in `dist` |
| `pnpm run preview` | Serves the production build locally |
| `pnpm run lint` | Runs ESLint |

## How to play

1. Player One starts with `X`.
2. Select an empty square on the board.
3. Player Two takes the next turn with `O`.
4. The first player to place three symbols in a row wins.
5. If all nine squares are filled without a winner, the round is a draw.
6. Select **Play next round** to continue the match. The starting player alternates after each round.
7. Select **Reset match** during an active round to clear the board and scores.

## Project structure

```text
src/
├── assets/
│   └── hero.png       # Layered visual used in the game introduction
├── App.jsx            # Game state, board logic, and page layout
├── App.css            # Game-specific layout and component styles
├── index.css          # Global theme tokens and base styles
└── main.jsx           # React application entry point
```

## Tech stack

- React
- Vite
- CSS
- pnpm
