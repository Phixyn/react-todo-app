import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header style={headerStyle}>
        <h1>Todo List</h1>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </header>
    );
  }
}

let headerStyle = {
  background: "#000",
  borderBottom: "1px solid #dd0000",
  textAlign: "center",
  padding: "10px",
};

export default Header;
