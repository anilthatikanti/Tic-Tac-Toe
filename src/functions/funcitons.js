export function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}

export function getUserNextStepIndex(squares) {
  // Winning lines
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

  // Defensive strategy: Block user's potential winning lines
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === "X" && squares[b] === "X" && squares[c] === null) {
      return c; // Block user's win on this line
    }
  }
  // Offensive strategy: Check for immediate win or fork opportunities
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    // Check for immediate win
    if (squares[a] === "o" && squares[b] === "o" && squares[c] === null) {
      return c; // Win on this line
    }

    // Check for fork (creating two potential winning lines)
    if (squares[a] === "o" && squares[b] === null && squares[c] === null) {
      if (squares[3] === null || squares[3] === "o") {
        return b; // Create fork on lines [a,b,c] and [a,b,3]
      } else if (squares[4] === null || squares[4] === "o") {
        return c; // Create fork on lines [a,b,c] and [a,4,c]
      }
    } else if (
      squares[a] === null &&
      squares[b] === "o" &&
      squares[c] === null
    ) {
      if (squares[4] === null || squares[4] === "o") {
        return a; // Create fork on lines [a,b,c] and [a,4,c]
      } else if (squares[5] === null || squares[5] === "O") {
        return c; // Create fork on lines [a,b,c] and [a,5,c]
      }
    } else if (
      squares[a] === null &&
      squares[b] === null &&
      squares[c] === "O"
    ) {
      if (squares[2] === null || squares[2] === "O") {
        return a; // Create fork on lines [a,b,c] and [a,2,c]
      } else if (squares[1] === null || squares[1] === "O") {
        return b; // Create fork on lines [a,b,c] and [a,1,b]
      }
    }
  }

  // Center or corner strategy: Play in the center or a corner if available
  if (squares[4] === null) {
    return 4; // Center
  } else if (squares[0] === null) {
    return 0; // Top left corner
  } else if (squares[2] === null) {
    return 2; // Top right corner
  } else if (squares[6] === null) {
    return 6; // Bottom left corner
  } else if (squares[8] === null) {
    return 8; // Bottom right corner
  }

  // Random fallback: Choose any available empty slot
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      return i;
    }
  }

  // No moves possible (board is full)
  return null;
}
