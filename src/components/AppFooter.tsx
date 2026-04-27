import { useLocation, NavLink } from "react-router-dom";

export default function AppFooter() {
  const location = useLocation();

  return (
    <footer className="pb-6 mt-6 text-center">
      {location.pathname === "/" ? (
        <NavLink
          to="/about"
          className="transition duration-500 ease-in-out text-gray-800 dark:text-zinc-300 border-b border-gray-800 dark:border-zinc-500 hover:text-gray-500 dark:hover:text-zinc-400 hover:border-gray-500 dark:hover:border-zinc-400"
          data-testid="footer-about-link"
        >
          About
        </NavLink>
      ) : (
        <p>
          Made by{" "}
          <a
            className="transition duration-500 ease-in-out font-medium text-pink-600 hover:text-pink-500"
            href="https://phixyn.com/"
            target="_blank"
          >
            Phixyn
          </a>
        </p>
      )}
    </footer>
  );
}
