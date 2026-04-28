import { useLocation, NavLink } from "react-router-dom";

export default function AppFooter() {
  const location = useLocation();

  return (
    <footer className="mt-6 pb-6 text-center sm:mt-7 md:mt-8">
      {location.pathname === "/" ? (
        <NavLink
          to="/about"
          className="ui-footer-link inline-flex text-sm font-medium tracking-[0.16em] uppercase"
          data-testid="footer-about-link"
        >
          About
        </NavLink>
      ) : (
        <p className="ui-text-muted text-sm sm:text-base">
          Made by{" "}
          <a
            className="ui-link-accent border-b border-current font-medium"
            href="https://phixyn.com/"
            target="_blank"
            rel="noreferrer"
          >
            Phixyn
          </a>
        </p>
      )}
    </footer>
  );
}
