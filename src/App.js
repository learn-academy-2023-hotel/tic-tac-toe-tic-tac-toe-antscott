import React, { useState } from 'react';
import Square from './components/Square';
import './App.css';

const App = () => {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xUpNext, setXUpNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const handleclick = (index) => {
    if (gameOver || winner || squares[index]) {
      
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[index] = xUpNext ? 'X' : 'O';

    setSquares(nextSquares);
    setXUpNext(!xUpNext);

    const winnerResult = calculateWinner(nextSquares);
    if (winnerResult) {
      setWinner(winnerResult);
      setGameOver(true);
      
      alert(`Player ${winnerResult} wins!`);
    } else if (nextSquares.every((square) => square !== null)) {
      
      setGameOver(true);
      
      alert("It's a draw!");
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], // Horizontal
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Vertical
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonal
      [2, 4, 6],
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
  
    return null;
   
  };

  const restartGame = () => {
    
    setSquares(initialSquares);
    setXUpNext(true);
    setWinner(null);
    setGameOver(false);
  };

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="boardflex">
        {squares.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleclick(index)} />
        ))}
      </div>
      <button className="reset" onClick={restartGame}>Restart Game</button>
    </>
  );
};

export default App;
