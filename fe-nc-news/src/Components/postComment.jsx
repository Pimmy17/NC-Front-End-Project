import * as api from '../Api';
import { useState } from 'react'
import { useParams } from 'react-router-dom';


export default function PostComment () {
    const [error, setError] = useState(null)
    const [body, setBody] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const username = 'grumpy19' //to be changed to logged in user
    const {article_id} = useParams()

    const handleSubmit = (event) => {
        event.preventDefault()
        const comment = {username, body}
        setSubmitting(true)
        api.postComment(article_id, comment)
        .then(() => {
            setSubmitting(false)
            setBody('√ Post Successful!')
        })
        .catch(({response: {data: {msg}, status}}) => {
            setError({status, msg})
        })
    }


    if (error) return (
        <h3>Uh oh! :( <br /> {error.status}: {error.msg}</h3>)
    return (
        <div className='add-comment'>
            <h2>Post Comment</h2>
            <form onSubmit={handleSubmit}>
                <label>Comment: </label>
                <textarea value={body} 
                onChange={(event) => {setBody(event.target.value)}}
                required></textarea>
                {!submitting && <button>Submit</button>}
                {submitting && <button disabled>Posting...</button>}
            </form>
        </div>
    )



}