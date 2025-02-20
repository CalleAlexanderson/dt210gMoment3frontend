import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <header>
        <nav>
            <ul>
                <li><NavLink to="/">Startsida</NavLink></li>
                <li><NavLink to="/posts">Blogginlägg</NavLink></li>
                <li><NavLink to="/admin">Admin</NavLink></li>
                <li><NavLink to="/login">Logga in</NavLink></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header