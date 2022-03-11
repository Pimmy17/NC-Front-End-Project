import {useState, useEffect} from 'react';
import * as api from '../Api';
import { useParams } from 'react-router-dom'
import CommentVoting from './commentVoting';
import PostComment from './postComment';

export default function Comments ({comments, setComments}) {
    const [loading, isLoading] = useState(true)
    const [error, setError] = useState(null)
    
    const {article_id} = useParams()

    const getHumanTime = (created_at) => {
        let date = String(new Date(created_at))
        const dateRegex = date.replace(/ GMT.*/, '')
        return dateRegex;
    }

    const updatedVotes = (comment_id, voting) => {
        api.patchCommentVotes(comment_id, voting)
        .catch(({response: {data: {msg}, status}}) => {
            setError({status, msg})
        })
    }

    useEffect(() => {
        isLoading(true)
        api.getComments(article_id)
        .then((comments) => {
            setComments(comments)
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
            <section className='list'>
                <PostComment comments={comments} setComments={setComments}/>
                {comments.map(({comment_id, body, author, votes, created_at}) => {
                    return (
                        <div key={comment_id}
                        className='articles'>
                            By {author} <br />
                            Posted At: {getHumanTime(created_at)} <br />
                            <CommentVoting votes={votes} comment_id={comment_id}
                            updatedVotes={updatedVotes} />
                            {body}    
                        </div>
                    )
                })}    
            </section>
        )
}