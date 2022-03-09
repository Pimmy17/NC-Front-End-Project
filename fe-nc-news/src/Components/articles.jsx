import {useState, useEffect} from "react";
import * as api from "../Api";
import {Link} from 'react-router-dom' 
// import { useParams } from "react-router-dom";


export default function Articles ({ topic, setTopic, articles, setArticles}) {
    const [loading, isLoading] = useState(true)
    const [error, setError] = useState(null)
    // const {slug} = useParams();

    // console.log(slug)

    useEffect(() =>{
        isLoading(true)
        if(!topic) {
            api.getArticles()
            .then((articles) => {
                setArticles(articles)
                isLoading(false)
            setError(null)
            })
            .catch(( {
                response: {data: {msg}, status}
            }) => {
                setError({status, msg})
                isLoading(false)
            })
        }
        else {
            api.getArticles(topic)
            .then((articles) => {
                setArticles(articles)
                isLoading(false)
            setError(null)
            }).catch(( {
                response: {data: {msg}, status}
            }) => {
                setError({status, msg})
                isLoading(false)
            })
        }
    }, [topic])


    if (loading) return <h3>Loading...</h3>
    if (error) return (
    <h3>Uh oh! :O <br /> {error.status}: {error.msg}</h3>)
     return (
         <section className='list'>
             {articles.map(({article_id, title, author, votes}) => {
            return (
                <div key={article_id} className='articles'>
                    <Link to={`/news/all/articles/${article_id}`} className='list-text'> 
                    {title} <br />
                    by {author} <br/>
                    Votes: {votes}
                </Link>
                </div>

            )
         })}</section>
     )
}