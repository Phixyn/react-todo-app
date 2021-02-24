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
      <div className="mt-6 px-3">
        <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
          <input
            type="text"
            name="title"
            placeholder="Add task..."
            value={this.state.title}
            onChange={this.onChange}
            className="block w-full px-3 py-2 placeholder-gray-500 bg-white rounded shadow focus:outline-none"
          />
          <input
            type="submit"
            value="Submit"
            className="btn"
            style={{ flex: "1" }}
          />
        </form>
      </div>
    );
  }
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default AddTodo;
