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

export function getUserNextStepIndex(squares,index) {
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
  const relevantLines = lines.filter(line => line.includes(index));
let lineIndex = null
  // Iterate through relevant lines to find the appropriate move
  for (let i = 0; i < relevantLines.length; i++) {
    const [a, b, c] = relevantLines[i];
    if(squares[a]&&squares[b]&&squares[a]===squares[b]){
      console.log('1c',c)
      return c
    }else if(squares[a]&&squares[c]&&squares[a]===squares[c]){
      console.log('2c',c)
      return b
    }else if(squares[c]&&squares[b]&&squares[b]===squares[c]){
      console.log('3c',c)
      return a
    }
    else{
      console.log('4c',c)
      let indexCheck;
      while(indexCheck){
        let index = Math.round(Math.random()*9)
        if(!squares[index]){
          lineIndex=index
          indexCheck=false
        }
      }
      console.log('lineIndex',lineIndex)
      return lineIndex
    }
  }

}
