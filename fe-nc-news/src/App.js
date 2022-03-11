import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Components/home";
import Articles from "./Components/articles";
import Header from "./Components/Header";
import ArticleCard from "./Components/article-card";
import Topics from "./Components/topics";
import Comments from "./Components/comments";

function App() {
  const [topic, setTopic] = useState("");
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header topic={topic} setTopic={setTopic} />
        <Topics topic={topic} setTopic={setTopic} />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/news/all/articles/:article_id"
            element={<ArticleCard />}
          />
          <Route
            exact
            path="/news/:topic/articles"
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
            path="/news/:topic/articles/:article_id/comments"
            element={<Comments comments={comments} setComments={setComments} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
