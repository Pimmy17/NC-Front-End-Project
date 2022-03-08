import {useEffect} from "react";
import * as api from "../Api";
import {Link} from 'react-router-dom' 


export default function Articles ({topic, setTopic, articles, setArticles}) {


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