import React from "react";

class Header extends React.Component {
  render() {
    return (
      <header style={headerStyle}>
        <h1>Todo List</h1>
        {/* TODO router */}
        <a href="/">Home</a> | <a href="/about">About</a>
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
