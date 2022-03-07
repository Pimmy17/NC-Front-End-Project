import "./App.css";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Home from "./Components/home";
import Articles from "./Components/articles";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="site-header">
          <h1>NC NEWS</h1>

          <p>
            <Link to="/home" className="link">
              Home
            </Link>
            <Link to="/home/all/articles" className="link">
              Articles
            </Link>
          </p>
          <p>Topic Search Bar</p>
        </header>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/home/all/articles" element={<Articles />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
