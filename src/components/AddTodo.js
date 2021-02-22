import React from "react";
import PropTypes from "prop-types";

class AddTodo extends React.Component {
  state = {
    title: "",
  };

  onSubmit = (evt) => {
    // Stop form being submmited to same file and reloading the page
    evt.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: "" });
  };

  // Note evt.target.name will work as long as the property names in
  // state match the name properties in the HTML (e.g. name="title"
  // matches title property in state).
  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
        <input
          type="text"
          name="title"
          placeholder="Add task..."
          style={formInputStyle}
          value={this.state.title}
          onChange={this.onChange}
        />
        <input
          type="submit"
          value="Submit"
          className="btn"
          style={{ flex: "1" }}
        />
      </form>
    );
  }
}

const formInputStyle = {
  border: "1px solid #222",
  background: "#444",
  color: "#d9d9d9",
  flex: "10",
  padding: "5px",
};

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default AddTodo;
