import { useParams } from "react-router-dom";
import { getArticlesbyID } from "../Api";
import { useState, useEffect } from 'react';


export default function ArticleCard() {
    const {article_id} = useParams();
    const [articleCard, setArticleCard] = useState({})
    const getHumanTime = (created_at) => {
        let date = String(new Date(created_at))
        const dateRegex = date.replace(/ GMT.*/, '')
        return dateRegex;
    }
    useEffect(() => {
        getArticlesbyID(article_id)
        .then((res) => {
            setArticleCard(res)
        })
    }, [])

    return (
        <section className='article-card'>
            <dl>
            <dt><h2>{articleCard.title}</h2></dt>
            <dt>by {articleCard.author}</dt>
            <dt>Topic: {articleCard.topic}</dt>
            <dt>Created: {getHumanTime(articleCard.created_at)}</dt>
            <dt>Votes: {articleCard.votes}</dt>
            <dt>Comments: {articleCard.comment_count}</dt>
            {/* <img src={users.avatar_url} alt={`Profile picture of the author, ${articleCard.author}`} /> */}
            <dt>{articleCard.body}</dt>
            </dl>
        </section>
    )
}