import { useParams } from "react-router-dom";
import { getArticlesbyID } from "../Api";
import { useState, useEffect } from 'react';
import picture from './pngegg (8).png'
import Voting from "./Voting";
import * as api from '../Api';



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
        console.log(article_id, voting)
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
    if (error) return (
    <h3>Uh oh! :( <br /> {error.status}: {error.msg}</h3>)
    return (
        <section className='article-card'>
            <dl key={articleCard.article_id}>
            <dt><h2>{articleCard.title}</h2></dt>
            <dt>by {articleCard.author}</dt>
            <dt>Topic: {articleCard.topic}</dt>
            <dt>Created: {getHumanTime(articleCard.created_at)}</dt>
            
            <Voting 
            votes={articleCard.votes}
            article_id={articleCard.article_id}
            updatedVotes={updatedVotes}
            />
            
            <dt>Comments: {articleCard.comment_count}</dt>
            <img src={picture} alt={`Author, ${articleCard.author}`} className='articleCard-image' />
            <dt>{articleCard.body}</dt>
            </dl>
        </section>
    )
}