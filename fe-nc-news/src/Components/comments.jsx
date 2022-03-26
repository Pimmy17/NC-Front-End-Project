import {useState, useEffect} from 'react';
import * as api from '../Api';
import { useParams } from 'react-router-dom'
import CommentVoting from './commentVoting';
import PostComment from './postComment';


export default function Comments ({comments, setComments}) {
    const [loading, isLoading] = useState(true)
    const [error, setError] = useState(null)
    const [deleting, setDeleting] = useState(false)
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

    const handleClick = (comment_id, event) => {
        event.preventDefault()
        setDeleting(true)
        api.deleteComment(comment_id)
        .then(() => {
            setDeleting(false)  
            setError(null)
            setComments(comments.filter(comment => 
                comment.comment_id !== comment_id)
            )
        })
        .catch(( {
            response: {data: {msg}, status}
        }) => {
            setError({status, msg})
            setDeleting(false)
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
    }, [article_id, setComments])


    if (loading) return <h3>Loading...</h3>
    if (error) return (
        <h3>Uh oh! :( <br /> {error.status}: {error.msg}</h3>)
    if (deleting) return <h4>Deleting...</h4>
    
        return (
            <section>
                <PostComment comments={comments} setComments={setComments}/>
                <div className='comments-list'>
                {comments.map(({comment_id, body, author, votes, created_at}) => {
                    return (
                        <div key={comment_id}
                        className='comments'>
                            <button className='deleteButton' onClick={(event) => handleClick(comment_id, event)}>X</button>
                            <br />
                            <br />
                            {body}
                            <br />
                            <br />
                            By {author} <br />
                            {getHumanTime(created_at)} <br />
                            <CommentVoting votes={votes} comment_id={comment_id}
                            updatedVotes={updatedVotes} />
                        </div>
                    )
                })}
                </div>
            </section>
        )
}