import { useParams, Link } from "react-router-dom";
import { getArticlesbyID } from "../Api";
import { useState, useEffect } from 'react';
import Voting from "./Voting";
import * as api from '../Api';
import ArticleImage from "./articleImage";


export default function ArticleCard() {
    const {article_id} = useParams();
    const [articleCard, setArticleCard] = useState({})
    const [loading, isLoading] = useState(true)
    const [error, setError] = useState(null)

    const getHumanTime = (created_at) => {
        let date = String(new Date(created_at))
        const dateRegex = date.replace(/ GMT.*/, '')
        return dateRegex;
    }
   
    const updatedVotes = (article_id, voting) => {
        api.patchArticleVotes(article_id, voting)
        .catch(({response: {data: {msg}, status}}) => {
            setError({status, msg})
        })  
    }
    

    useEffect(() => {
        getArticlesbyID(article_id)
        .then((res) => {
            setArticleCard(res)
            isLoading(false)
            setError(null)
        })
        .catch(( {
            response: {data: {msg}, status}
        }) => {
            setError({status, msg})
            isLoading(false)
        })
    }, [article_id])


    if (loading) return <h3>Loading...</h3>
    if (error) return (<>
        <h3><strong>{error.status}: {error.msg} </strong></h3>
        <h5>
        <br />
        <em>♫ Don't go chasing Articles,
        <br />
        Please stick to the IDs and Links you're used to ♫ </em>
        <br /> - TLC(sort of)
        </h5>
        </>)
    return (
        <section className='article-card'>
            <dl key={articleCard.article_id}>
            <dt className='article-title'><strong>{articleCard.title}</strong></dt>
            <br />
            <ArticleImage topic={articleCard.topic} />
            <br />
            <div className='article-info'>
            <dt><strong>By {articleCard.author}</strong></dt>
            <dt className='topic'>Topic: {articleCard.topic}</dt>
            <dt>{getHumanTime(articleCard.created_at)}</dt>
            </div>
            <Voting 
            votes={articleCard.votes}
            article_id={articleCard.article_id}
            updatedVotes={updatedVotes}
            />
            <dt>Comments: {articleCard.comment_count}</dt>          
            <Link to={`/news/${articleCard.topic}/articles/${articleCard.article_id}/comments`} className='link-reverse'>
                View Comments
                </Link>
                <br />
                <br />
            <dt className='text-body'>{articleCard.body}</dt>
            </dl>
        </section>
    )
}