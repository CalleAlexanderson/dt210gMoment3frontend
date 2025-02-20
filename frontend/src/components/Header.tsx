import { NavLink } from "react-router-dom"
import { useLogin } from "../context/LoginContext";
import './css/Header.css'
import { useEffect, useState } from "react";

const Header = () => {
  const { user } = useLogin();
  const [lockedRoute, setLockedRoute] = useState('locked');

  useEffect(() => {
    if (user) {
      setLockedRoute('');
    }
  }, [user])

  return (
    <header>
      <nav>
        <ul>
          <li><NavLink to="/">Startsida</NavLink></li>
          <li><NavLink to="/posts">Blogginlägg</NavLink></li>
          <li><NavLink className={lockedRoute} to="/admin">Admin</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header