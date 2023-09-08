import { useState } from 'react'

import './App.css'
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

function App () {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [player, setPlayer] = useState(turns[0])
  const [winner, setWinner] = useState(null)

  const checkWinner = () => {
    for (let i = 0; i < combinationsWin.length; i++) {
      const [a, b, c] = combinationsWin[i]
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(player)
      }
    }
  }

  const handleClickCell = (index) => {
    const newBoard = [...board]
    if (newBoard[index] !== null) return
    checkWinner()
    if (winner) return
    if (newBoard.every(cell => cell !== null)) return
    newBoard[index] = player
    setBoard(newBoard)
    const newPlayer = player === turns[0] ? turns[1] : turns[0]
    setPlayer(newPlayer)
  }

  return (
    <>
      <main>
        <h1>TRIKI</h1>
        <div className='board'>
          {board.map((cell, index) => (
            <div key={index} className='cell' onClick={() => handleClickCell(index)}>
              {cell}
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default App
