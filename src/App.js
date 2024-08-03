import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'

import Home from "./pages/Home";
import Game from "./pages/Game";
import Finished from "./pages/Finished";
import Analytics from "./pages/Analytics/Analytics";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/finished" element={<Finished />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
