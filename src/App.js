import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Board } from "./modules/board";

function App() {
  return (
    <>
      <h1>anil</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/app" element={<Board />} />
          {/* <Route exact path="/app" element={<Board />} /> */}
          <Route path="*" element={<p>Page not found!</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
