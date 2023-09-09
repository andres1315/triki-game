import { useState } from 'react'

import './App.css'
import confetti from 'canvas-confetti'
const turns = ['X', 'O']
const combinationsWin = [
  [0, 1, 2], // Horizontal
  [3, 4, 5], // Horizontal
  [6, 7, 8], // Horizontal
  [0, 3, 6], // Vertical
  [1, 4, 7], // Vertical
  [2, 5, 8], // Vertical
  [0, 4, 8], // Diagonal
  [2, 4, 6] // Diagonal
]

const defaultBoard = Array(9).fill(null)
function App () {
  const [board, setBoard] = useState(defaultBoard)
  const [player, setPlayer] = useState(turns[0])
  const [winner, setWinner] = useState(null)

  const checkWinner = (newBoard) => {
    for (let i = 0; i < combinationsWin.length; i++) {
      const [a, b, c] = combinationsWin[i]
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(player)
        confetti()
      }
    }
  }

  const resetGame = () => {
    setBoard(defaultBoard)
    setPlayer(turns[0])
    setWinner(null)
  }

  const handleClickCell = (index) => {
    const newBoard = [...board]
    if (winner) return
    if (newBoard[index] !== null) return
    newBoard[index] = player
    checkWinner(newBoard)
    setBoard(newBoard)
    if (newBoard.every(cell => cell !== null)) return
    const newPlayer = player === turns[0] ? turns[1] : turns[0]
    setPlayer(newPlayer)
  }

  return (
    <>
      <main>
        <h1>TRIKI</h1>
        <p className='current-player'>Turno de {player}</p>
        <div className='board'>
          {board.map((cell, index) => (
            <div key={index} className='cell' onClick={() => handleClickCell(index)}>
              {cell}
            </div>
          ))}

        </div>
        {winner && (
            <div className='winner'>
              <p className='winner-text'>Ganador: {winner}</p>
              <button className='reset-button' onClick={resetGame }>Reiniciar</button>
            </div>
        )}
        {
          !winner && board.every(cell => cell !== null) && (
            <div className='winner'>
              <p className='winner-text'>Empate</p>
              <button className='reset-button' onClick={resetGame }>Reiniciar</button>
            </div>
          )
        }
      </main>
    </>
  )
}

export default App
