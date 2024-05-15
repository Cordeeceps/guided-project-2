import React , { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import './App.css'
import Home from "./components/Home";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <main role="main">
        <Routes>
          <Route exact path="/" element={<Home />}/>
        </Routes>
      </main>
    </Router>
  )
}

export default App
