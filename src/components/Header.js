import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="mb-8">
      <NavLink
        exact
        to="/"
        className="pb-1 mr-4 transition duration-500 ease-in-out hover:text-gray-700"
        activeClassName="border-b-2 border-pink-600"
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className="pb-1 transition duration-500 ease-in-out hover:text-gray-700"
        activeClassName="border-b-2 border-pink-600"
      >
        About
      </NavLink>
    </header>
  );
}

export default Header;
