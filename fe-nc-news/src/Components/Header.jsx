import { Link } from 'react-router-dom'


export default function Header({topic, setTopic}) {

    return (
    <header className="site-header">
          <h1>NC NEWS</h1>

          <>
            <Link to="/" className="link">
              <strong>Home</strong>
            </Link>
            {/* <Link to="/news/all/articles" className="link"> 
              
               <strong>Articles</strong>
            </Link> */}
            <Link to={`/news/all/articles`} className='link'>
            <button className='link' value='' 
                onClick={(event) => {
                setTopic(event.target.value)
            }}>
                <strong>Articles</strong>
                </button>
        </Link>
            
          </>
         
        </header>
    )
}