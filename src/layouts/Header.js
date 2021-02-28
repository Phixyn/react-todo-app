import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="pb-8">
      <NavLink
        exact
        to="/"
        className="pb-1 mr-4"
        activeClassName="border-b-2 border-gray-700"
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className="pb-1"
        activeClassName="border-b-2 border-gray-700"
      >
        About
      </NavLink>
    </header>
  );
}

export default Header;
