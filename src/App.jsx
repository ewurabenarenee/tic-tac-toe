import { useState } from "react";

function Square({ value, color, onSquareClick, isWinningSquare }) {
  const style = {
    backgroundColor: color,
    fontWeight: isWinningSquare ? "bold" : "normal",
  };

  return (
    <button className="square" onClick={onSquareClick} style={style}>
      {value}
    </button>
  );
}

function Board({
  xIsNext,
  squares,
  playerColors,
  onPlay,
  winningSquares,
  playerNames,
}) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status =
      "Next player: " +
      (xIsNext
        ? playerNames.X
          ? playerNames.X
          : "X"
        : playerNames.O
        ? playerNames.O
        : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          color={playerColors[squares[0]]}
          onSquareClick={() => handleClick(0)}
          isWinningSquare={winningSquares && winningSquares.includes(0)}
        />
        <Square
          value={squares[1]}
          color={playerColors[squares[1]]}
          onSquareClick={() => handleClick(1)}
          isWinningSquare={winningSquares && winningSquares.includes(1)}
        />
        <Square
          value={squares[2]}
          color={playerColors[squares[2]]}
          onSquareClick={() => handleClick(2)}
          isWinningSquare={winningSquares && winningSquares.includes(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          color={playerColors[squares[3]]}
          onSquareClick={() => handleClick(3)}
          isWinningSquare={winningSquares && winningSquares.includes(3)}
        />
        <Square
          value={squares[4]}
          color={playerColors[squares[4]]}
          onSquareClick={() => handleClick(4)}
          isWinningSquare={winningSquares && winningSquares.includes(4)}
        />
        <Square
          value={squares[5]}
          color={playerColors[squares[5]]}
          onSquareClick={() => handleClick(5)}
          isWinningSquare={winningSquares && winningSquares.includes(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          color={playerColors[squares[6]]}
          onSquareClick={() => handleClick(6)}
          isWinningSquare={winningSquares && winningSquares.includes(6)}
        />
        <Square
          value={squares[7]}
          color={playerColors[squares[7]]}
          onSquareClick={() => handleClick(7)}
          isWinningSquare={winningSquares && winningSquares.includes(7)}
        />
        <Square
          value={squares[8]}
          color={playerColors[squares[8]]}
          onSquareClick={() => handleClick(8)}
          isWinningSquare={winningSquares && winningSquares.includes(8)}
        />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [playerColors, setPlayerColors] = useState({
    X: "blue",
    O: "red",
  });
  const [playerNames, setPlayerNames] = useState({
    X: "",
    O: "",
  });
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function handleColorChange(player, color) {
    setPlayerColors({
      ...playerColors,
      [player]: color,
    });
  }

  function handleNameChange(player, name) {
    setPlayerNames({
      ...playerNames,
      [player]: name,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  const winningSquares = calculateWinner(currentSquares);

  return (
    <div className="game">
      <form onSubmit={handleSubmit}>
        <label>
          Player X Name:
          <input
            type="text"
            value={playerNames.X}
            onChange={(e) => handleNameChange("X", e.target.value)}
          />
        </label>
        <br />
        <label>
          Player O Name:
          <input
            type="text"
            value={playerNames.O}
            onChange={(e) => handleNameChange("O", e.target.value)}
          />
        </label>
        <br />
      </form>

      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          playerColors={playerColors}
          onPlay={handlePlay}
          winningSquares={winningSquares}
          playerNames={playerNames}
        />
      </div>

      <div className="game-info">
        <ol>{moves}</ol>
        <div>
          <label>
            {playerNames.X ? playerNames.X : "X"} Color:
            <input
              type="color"
              value={playerColors.X}
              onChange={(e) => handleColorChange("X", e.target.value)}
            />
          </label>
          <br />
          <label>
            {playerNames.O ? playerNames.O : "O"} Color:
            <input
              type="color"
              value={playerColors.O}
              onChange={(e) => handleColorChange("O", e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}
