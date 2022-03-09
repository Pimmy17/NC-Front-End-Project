import * as api from '../Api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Topics({topic, setTopic}) {
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
            console.log('error block')
            setError({status, msg})
        })
    }, [])

    if (loading) return <h3>Fetching Topics...</h3>
    if (error) return (
        <h3>Uh oh! :O <br /> {error.status}: {error.msg}</h3>)
    return (
        <section className='topic-list'> Topics: 
        <Link to={`/news/all/articles`} className='topic-button'>
            <button className='topic-button' value='' 
                onClick={(event) => {
                setTopic(event.target.value)
            }}>
                All
                </button>
        </Link>
            {topics.map(({slug}) => {
             return (
                <div key={slug} className="topic">
             
                 <Link to={`/news/${slug}/articles`} className='topic-button' >
                     <button className='topic-button' value={slug}
                    onClick={(event) => {
                    setTopic(event.target.value)
                    }}>{slug}</button>
                 </Link>
            
             
             </div> )  
        })}
        </section>
    )
}