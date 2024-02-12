import "./App.css";
import { Board } from "../src/modules/board/index";

function App() {
  return (
    <div className="main-container ">
      <h1 className="text-center ">Tic Tac Toe</h1>
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    </div>
  );
}

export default App;
