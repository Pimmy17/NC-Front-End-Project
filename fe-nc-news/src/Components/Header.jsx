import { Link } from 'react-router-dom'


export default function Header() {

    return (
    <header className="site-header">
          <h1>NC NEWS</h1>
          <>
            <Link to="/" className="link">
              <strong>Home</strong>
            </Link>
            <Link to="/news/all/articles" className="link"> 
               <strong>Articles</strong>
            </Link>            
          </>
        </header>
    )
}