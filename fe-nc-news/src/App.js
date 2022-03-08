import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Components/home";
import Articles from "./Components/articles";
import Header from "./Components/Header";
import ArticleCard from "./Components/article-card";

function App() {
  const [topic, setTopic] = useState("");
  const [articles, setArticles] = useState([]);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/news/all/articles"
            element={
              <Articles
                topic={topic}
                setTopic={setTopic}
                articles={articles}
                setArticles={setArticles}
              />
            }
          />
          <Route
            path="/news/all/articles/:article_id"
            element={<ArticleCard />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
