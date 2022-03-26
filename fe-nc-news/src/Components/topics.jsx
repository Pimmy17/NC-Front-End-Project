import * as api from '../Api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Topics() {
    const [topics, setTopics] = useState([])
    const [error, setError] = useState(null)
    const [loading, isLoading] = useState(true)
    
    useEffect(() => {
        isLoading(true)
        setTopics([])
        api.getTopics()
        .then((topics) => {
            setTopics(topics)
            isLoading(false)
            setError(null)
        })
        .catch(( {
            response: {data: {msg}, status}
        }) => {
            console.log('catch block')
            setError({status, msg})
        })
    }, [])

    if (loading) return <h3>Fetching Topics...</h3>
    if (error) return (
        <h3>Uh oh! :O <br /> {error.status}: {error.msg}</h3>)
    return (
        <section className='site-header-topics'> 
        <strong className='link'>Topics:</strong>
        <Link to={`/news/all/articles`} className='topic-button'>
                All 
        </Link>
            {topics.map(({slug}) => {
             return (
                <div key={slug} className="topic-list">
                 <Link to={`/news/${slug}/articles`} className='topic-button' >
                     {slug}
                 </Link>
                </div> )  
                })
            }
        </section>
    )
}