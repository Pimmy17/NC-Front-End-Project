import { useState } from 'react';

export default function Voting({votes, article_id, updatedVotes}) {
    const [castVote, setCastVote] = useState(0);

    const handleClick = (voting) => {
        setCastVote((castVote) => castVote + voting)
        updatedVotes(article_id, voting)
    };
    return (
        <section>
            <h4>Votes: {votes + castVote}</h4>
            <button disabled={castVote === 1} onClick={(() => handleClick(1))}>+</button>
            <button disabled={castVote === -1} onClick={(() => handleClick(-1))}>-</button>
        </section>
    )
}