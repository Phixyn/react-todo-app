import { NavLink } from "react-router-dom";

function AppHeader() {
  return (
    <header className="mb-8">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-pink-600" : "pb-1 mr-4 transition duration-500 ease-in-out hover:text-gray-700"
        }
        data-testid="header-home-link"
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-pink-600" : "pb-1 transition duration-500 ease-in-out hover:text-gray-700"
        }
        data-testid="header-about-link"
      >
        About
      </NavLink>
    </header>
  );
}

export default AppHeader;
