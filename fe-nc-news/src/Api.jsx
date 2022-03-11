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

  export function getTopics() {
    return ncNews.get(`/topics`).then(({ data }) => {
      return data.topics
    })
  }

  export function patchArticleVotes(article_id, votes) {
    return ncNews.patch(`/articles/${article_id}`, {inc_votes: votes}).then(({ data }) => {
      return data.article;
    })
  }

  export function getComments(article_id) {
    return ncNews.get(`/articles/${article_id}/comments`).then(({ data }) => {
      return data.comments;
    })
  }

  export function patchCommentVotes(comment_id,  votes) {
    return ncNews.patch(`/articles/comments/${comment_id}`, {inc_votes: votes}).then(({ data }) => {
      return data.comments;
    })
  }

  export function postComment(article_id, {author, body}) {
    return ncNews.post(`/articles/${article_id}/comments`, {username: author, body}).then(({ data }) => {
      return data.comment
    })
  }