import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Components/home";
import Articles from "./Components/articles";
import Header from "./Components/Header";
import ArticleCard from "./Components/article-card";
import Topics from "./Components/topics";
import Comments from "./Components/comments";
import Error from "./Components/errors";

function App() {
  const [topic, setTopic] = useState("");
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState([]);
  // const [order, setOrder] = useState("desc");
  // const [sort, setSort] = useState("created_at");

  return (
    <BrowserRouter>
      <div className="App">
        <Header topic={topic} setTopic={setTopic} />
        <Topics />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/news/:topic/articles/:article_id"
            element={<ArticleCard />}
          />
          <Route
            path="/news/:topic/articles"
            element={<Articles articles={articles} setArticles={setArticles} />}
          />
          <Route
            path="/news/:topic/articles/:article_id/comments"
            element={<Comments comments={comments} setComments={setComments} />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
