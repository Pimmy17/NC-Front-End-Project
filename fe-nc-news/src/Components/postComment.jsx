import * as api from '../Api';
import { useState } from 'react'
import { useParams } from 'react-router-dom';


export default function PostComment ({comments, setComments}) {
    const [error, setError] = useState(null)
    const [body, setBody] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const author = 'grumpy19' //to be changed to logged in user
    const {article_id} = useParams()

    const handleSubmit = (event) => {
        event.preventDefault()
        const comment = {author, body}
        setSubmitting(true)
        
        api.postComment(article_id, comment)
        .then((newComment) => {
            setSubmitting(false)
            setBody('√ Post Successful!')
            setComments([newComment, ...comments])
        })
        .catch(({response: {data: {msg}, status}}) => {
            setError({status, msg})
        })
    }

    if (error) return (
        <h3>Uh oh! :( <br /> {error.status}: {error.msg}</h3>)
    return (
        <div key={author} className='add-comment'>
            <h2>Post Comment</h2>
            <form onSubmit={handleSubmit}>
                <textarea value={body} 
                onChange={(event) => {setBody(event.target.value)}}
                required></textarea>
                <br />
                {!submitting && <button>Submit</button>}
                {submitting && <button disabled>Posting...</button>}
            </form>
        </div>
    )
}