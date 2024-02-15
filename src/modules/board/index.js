import { React, useState } from "react";
import { Square } from "../button/index";
import {
  calculateWinner,
  getUserNextStepIndex,
} from "../../functions/funcitons";

export const Board = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playWithBot, setMatchWithBot] = useState(false);
  const [botLoading, setBotLoading] = useState(false);

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i] || botLoading) {
      return;
    }
    const nextSquares = [...squares];
    if (xIsNext) {
      nextSquares[i] = "X";
      if (
        playWithBot &&
        !calculateWinner(nextSquares) &&
        nextSquares.some((x) => x === null)
      ) {
        setBotLoading(!botLoading);
        // Delay before bot's move
        setTimeout(() => {
          let index = getUserNextStepIndex(nextSquares);
          nextSquares[index] = "O";
          // setSquares([...nextSquares]); // Update state with new squares array
          setBotLoading(false); // End bot loading state
          setSquares(nextSquares);
        }, 1000);
      }
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    if (!playWithBot) {
      setXIsNext(!xIsNext);
    }
  }

  function playwithBotFunction() {
    setMatchWithBot(!playWithBot);
  }
  // } else {
  //   nextSquares[i] = "O";

  const winner = calculateWinner(squares);
  let status = winner
    ? "Winner: " + winner
    : squares.every((x) => x !== null)
    ? "Game Tie"
    : "Next player: " + (botLoading || !xIsNext ? "O" : "X");

  return (
    <>
      <p>{botLoading && "Thinking..."}</p>
      {!playWithBot && squares.every((x) => x === null) && (
        <button onClick={playwithBotFunction}>Play with bot</button>
      )}

      <h1>{status}</h1>
      <div style={{ display: "flex", flexWrap: "wrap", width: "150px" }}>
        {squares.map((_, i) => {
          return (
            <Square value={squares[i]} onSquareClick={() => handleClick(i)} />
          );
        })}
      </div>
    </>
  );
};
