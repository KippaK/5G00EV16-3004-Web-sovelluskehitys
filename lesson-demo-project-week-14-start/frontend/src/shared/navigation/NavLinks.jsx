import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../context/auth-context';

import './NavLinks.css';

const NavLinks = () => {

  const { isLoggedIn, logout } = useAuthContext();

  return (
    <ul className="nav-links">
      <li>
          <NavLink to="/" exact>ALL CITIES</NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to="/cities/new" exact>ADD CITY</NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <button onClick={logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  )
};

export default NavLinks;