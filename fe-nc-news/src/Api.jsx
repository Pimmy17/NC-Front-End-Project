import React from 'react';
import axios from 'axios';

const ncNews = axios.create({
    baseURL: 'https://apimlott-nc-news.herokuapp.com/api'
})

export function getArticles(topic) {
    return ncNews.get("/articles", {params:{topic}}).then(({ data }) => {
      return data.articles;
    });
  }