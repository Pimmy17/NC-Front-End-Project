import {useState, useEffect} from "react";
import * as api from "../Api";
import {Link, useParams} from 'react-router-dom' 



export default function Articles ({ articles, setArticles}) {
    const [loading, isLoading] = useState(true)
    const [error, setError] = useState(null)
    const {topic} = useParams();

    useEffect(() =>{
        isLoading(true)
        if(topic === 'all') {
            api.getArticles()
            .then((articles) => {
                setArticles(articles)
                isLoading(false)
                setError(null)
            })
            // .catch(( {
            //     response: {data: {msg}, status}
            // }) => {
            //     setError({status, msg})
            //     isLoading(false)
            // })
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
    if (error) return (<>
        <h3><strong>{error.status}: {error.msg} </strong></h3>
        <h5>
        <br />
        <em>♫ I'm addicted to you,
        <br />
        don't you know that's not a topic? ♫ </em>
        <br /> - Britney(sort of)
        </h5>
        </>)
     return (
         <section className='list'>
             {articles.map(({article_id, title, author, votes}) => {
            return (
                <div key={article_id} className='articles'>
                    <Link to={`/news/${topic}/articles/${article_id}`} className='list-text'> 
                    {title} <br />
                    by {author} <br/>
                    Votes: {votes}
                </Link>
                </div>

            )
         })}</section>
     )
}