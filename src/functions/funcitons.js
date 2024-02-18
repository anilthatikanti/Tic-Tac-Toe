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

export function getUserNextStepIndex(squares, userSelectedIndex) {
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

  let defensiveMode = false;

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    const line = [squares[a], squares[b], squares[c]];
    // Offensive move: Check for immediate win
    if (line.filter((x) => x === "O").length === 2 && line.includes(null)) {
      const emptyIndex = line.indexOf(null);
      return lines[i][emptyIndex]; // Return the index in the original array
    }
  }

  // Check for defensive moves or immediate wins
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    const line = [squares[a], squares[b], squares[c]];

    // // Offensive move: Check for immediate win
    // if (line.filter((x) => x === "O").length === 2 && line.includes(null)) {
    //   const emptyIndex = line.indexOf(null);
    //   return lines[i][emptyIndex]; // Return the index in the original array
    // }
    // Defensive move: Block user's potential winning lines
    if (line.filter((x) => x === "X").length === 2 && line.includes(null)) {
      const emptyIndex = line.indexOf(null);
      return lines[i][emptyIndex]; // Return the index in the original array
    }
    // Switch to defensive mode if opponent has two 'O's in any row
    if (line.filter((x) => x === "O").length === 2 && line.includes(null)) {
      defensiveMode = true;
    }
  }

  // If in defensive mode, return index of remaining 'O' for a win
  if (defensiveMode) {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      const line = [squares[a], squares[b], squares[c]];
      if (line.filter((x) => x === "O").length === 2 && line.includes(null)) {
        const emptyIndex = line.indexOf(null);
        return lines[i][emptyIndex]; // Return the index in the original array
      }
    }
  }

  // Center or corner strategy: Play in the center or a corner if available
  // if (squares[4] === null) {
  //   return 4; // Center
  // } else if (squares[0] === null) {
  //   return 0; // Top left corner
  // } else if (squares[2] === null) {
  //   return 2; // Top right corner
  // } else if (squares[6] === null) {
  //   return 6; // Bottom left corner
  // } else if (squares[8] === null) {
  //   return 8; // Bottom right corner
  // }

  /** Center  strategy: Play in the center  if available but this is only for first step
   * first we need to check the center whether it is empty or not 
   * second the user selected corner in first step or not because who have more probability to win
   * third select center if there is no corner value && squares.filter((x) => x === "X").length === 1
  */

  let userSelectedMatchingItems = lines.filter((x) => x.includes(userSelectedIndex));
  if (userSelectedMatchingItems.length) {
    for (let i = 0; i < userSelectedMatchingItems.length; i++) {
      const [a, b, c] = userSelectedMatchingItems[i]; // Access elements from filtered array
      console.log('[a, b, c]', [a, b, c]);
      const line = [squares[a], squares[b], squares[c]];
      if (line.filter((x) => x === "O").length === 2 && line.includes(null)) {
        const emptyIndex = line.indexOf(null);
        return lines[i][emptyIndex]; // Return the index in the original array
      }
      else if (squares[b] === 'X' && squares.filter((x) => x === "X").length <= 2) {
        console.log('randomIndex', )
        const randomIndex = Math.random() < 0.5 ? 0 : 1; // Randomly choose 0 or 1
        return randomIndex === 0 ? a : c; // Return a or c based on the random index
      }
    }

  } else {
    for (let i = 0; i < userSelectexMatchingItems.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[4] === 'O') {
        if (squares[1] === null) {
          return 1; // Top left corner
        } else if (squares[3] === null) {
          return 3; // Top right corner
        } else if (squares[5] === null) {
          return 5; // Bottom left corner
        } else if (squares[7] === null) {
          return 7; // Bottom right corner
        }
      }
      // corner strategy: Play in the  corner if available
      if (squares[0] === null) {
        return 0; // Top left corner
      } else if (squares[2] === null) {
        return 2; // Top right corner
      } else if (squares[6] === null) {
        return 6; // Bottom left corner
      } else if (squares[8] === null) {
        return 8; // Bottom right corner
      }
    }
  }
  if (squares[4] === null) {
    // let cornerConfiremIndex = squares.findIndex(x=>x==='X')
    // if([0,2,6,8].includes(cornerConfiremIndex)){
    //   return 8 - cornerConfiremIndex
    // }
    //Center  strategy: Play in the center  if available
    return 4; // Center
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
