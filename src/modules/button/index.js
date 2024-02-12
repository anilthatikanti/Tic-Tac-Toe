import React from "react";

export const Square = ({ value, onSquareClick }) => {
  return (
    <>
      <button onClick={onSquareClick} className="square">
        {value}
      </button>
    </>
  );
};
