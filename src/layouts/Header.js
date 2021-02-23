import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header className="pb-8">
        <h1>Todo List</h1>
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
}

let headerStyle = {
  background: "rgb(10,10,10)",
  borderBottom: "1px solid #dd0000",
  textAlign: "center",
  padding: "10px",
};

export default Header;
