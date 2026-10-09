import { useMemo, useState } from 'react'
import heroImg from './assets/hero.png'
import './App.css'

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const emptyBoard = () => Array(9).fill(null)

function getWinner(board) {
  for (const line of winningLines) {
    const [first, second, third] = line
    if (
      board[first] &&
      board[first] === board[second] &&
      board[first] === board[third]
    ) {
      return { player: board[first], line }
    }
  }

  return null
}

function App() {
  const [board, setBoard] = useState(emptyBoard)
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [winner, setWinner] = useState(null)
  const [scores, setScores] = useState({ X: 0, O: 0 })
  const [round, setRound] = useState(1)

  const isDraw = useMemo(
    () => !winner && board.every(Boolean),
    [board, winner],
  )
  const gameOver = Boolean(winner || isDraw)
  const status = winner
    ? `Player ${winner.player} wins`
    : isDraw
      ? 'Round drawn'
      : `Player ${currentPlayer}'s turn`

  function handleMove(index) {
    if (board[index] || gameOver) return

    const nextBoard = [...board]
    nextBoard[index] = currentPlayer
    const nextWinner = getWinner(nextBoard)

    setBoard(nextBoard)

    if (nextWinner) {
      setWinner(nextWinner)
      setScores((currentScores) => ({
        ...currentScores,
        [nextWinner.player]: currentScores[nextWinner.player] + 1,
      }))
      return
    }

    setCurrentPlayer((player) => (player === 'X' ? 'O' : 'X'))
  }

  function startNextRound() {
    setBoard(emptyBoard())
    setWinner(null)
    setCurrentPlayer(round % 2 === 0 ? 'X' : 'O')
    setRound((currentRound) => currentRound + 1)
  }

  function resetMatch() {
    setBoard(emptyBoard())
    setWinner(null)
    setCurrentPlayer('X')
    setScores({ X: 0, O: 0 })
    setRound(1)
  }

  return (
    <main className="game-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Gridlock home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span>GRIDLOCK</span>
        </a>
        <span className="match-label">LOCAL MATCH <span aria-hidden="true">/</span> 2 PLAYERS</span>
      </header>

      <section className="game-layout" aria-labelledby="game-title">
        <div className="intro">
          <div className="eyebrow"><span className="live-dot" /> LIVE ON THIS DEVICE</div>
          <h1 id="game-title">Your move.<br /><em>Make it count.</em></h1>
          <p className="intro-copy">
            A classic duel for two. Take turns, claim the grid, and line up three before your opponent does.
          </p>
          <div className="rules">
            <span className="rule-number">01</span>
            <span>Choose a square</span>
            <span className="rule-line" />
            <span className="rule-number">02</span>
            <span>Get three in a row</span>
          </div>
          <img className="hero-art" src={heroImg} alt="" aria-hidden="true" />
        </div>

        <div className="play-area">
          <div className="scoreboard" aria-label="Current score">
            <div className={`player-card player-x ${currentPlayer === 'X' && !gameOver ? 'active' : ''}`}>
              <span className="player-symbol">X</span>
              <span className="player-name">PLAYER ONE</span>
              <strong>{scores.X}</strong>
            </div>
            <div className="versus">VS</div>
            <div className={`player-card player-o ${currentPlayer === 'O' && !gameOver ? 'active' : ''}`}>
              <span className="player-symbol">O</span>
              <span className="player-name">PLAYER TWO</span>
              <strong>{scores.O}</strong>
            </div>
          </div>

          <div className="status" role="status" aria-live="polite">
            <span className={`status-symbol ${winner ? 'winner' : ''}`}>
              {winner ? winner.player : isDraw ? '=' : currentPlayer}
            </span>
            <span>{status}</span>
          </div>

          <div className="board" role="grid" aria-label="Tic tac toe board">
            {board.map((cell, index) => {
              const isWinningCell = winner?.line.includes(index)
              return (
                <button
                  className={`cell ${cell ? `filled ${cell.toLowerCase()}` : ''} ${isWinningCell ? 'winning' : ''}`}
                  key={index}
                  type="button"
                  role="gridcell"
                  aria-label={cell ? `Square ${index + 1}: ${cell}` : `Square ${index + 1}: empty`}
                  aria-disabled={Boolean(cell) || gameOver}
                  onClick={() => handleMove(index)}
                >
                  {cell}
                </button>
              )
            })}
          </div>

          <div className="controls">
            <button className="primary-button" type="button" onClick={gameOver ? startNextRound : resetMatch}>
              {gameOver ? 'PLAY NEXT ROUND' : 'RESET MATCH'}
              <span aria-hidden="true">↗</span>
            </button>
            <span className="round-count">ROUND {String(round).padStart(2, '0')}</span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>ONE DEVICE. TWO PLAYERS. NO DISTRACTIONS.</span>
        <span className="footer-mark">GL / 2026</span>
      </footer>
    </main>
  )
}

export default App
