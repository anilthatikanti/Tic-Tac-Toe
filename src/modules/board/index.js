import { React, useState } from "react";
import { Square } from "../button/index";
import {
  calculateWinner,
  getUserNextStepIndex,
} from "../../functions/funcitons";

export const Board = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = [...squares];
    if (xIsNext) {
      nextSquares[i] = "X";
      if (!calculateWinner(nextSquares)) {
        let index = getUserNextStepIndex(nextSquares, i);
        nextSquares[index] = "O";
      }
      // } else {
      //   nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    // setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status = winner
    ? "Winner: " + winner
    : "Next player: " + (xIsNext ? "X" : "O");

  return (
    <>
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
