import {useState, useEffect} from "react";
import * as api from "../Api";
import {Link} from 'react-router-dom' 


export default function Articles () {
    const [topic, setTopic] = useState('');
    const [articles, setArticles] = useState([])

    useEffect(() =>{
        if(!topic) {
            api.getArticles()
            .then((articles) => {
                setArticles(articles)
            })}
        else {
            api.getArticles(topic)
            .then((articles) => {
                setArticles(articles)
            })

        }
    }, [topic])
     return (
         <section className='list'>{articles.map(({article_id, title, author, votes}) => {
            return (
                <div key={article_id} className='articles'>
                    <Link to={`/articles/${article_id}`} className='list-text'> {title} <br />
                    Author: {author} <br/>
                    Votes: {votes}
                </Link>
                </div>

            )
         })}</section>
     )
}