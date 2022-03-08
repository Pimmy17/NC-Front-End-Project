import axios from 'axios';

const ncNews = axios.create({
    baseURL: 'https://apimlott-nc-news.herokuapp.com/api'
})

export function getArticles(topic) {
    return ncNews.get("/articles", {params:{topic}}).then(({ data }) => {
      return data.articles;
    });
  }

  export function getArticlesbyID(article_id) {
    return ncNews.get(`/articles/${article_id}`).then(({ data }) => {
      return data.article;
    })
  }