import React from 'react'

function About() {
  return (
    // "Ghost element", doesn't show up in the DOM.
    // Useful because all React components need to return
    // an 'element' of some sort. If you don't want to
    // polute your DOM, this is very handy.
    <React.Fragment>
      <h1>About</h1>
      <p>This is a simple To-Do list app to demonstrate my React knowledge.</p>
    </React.Fragment>
  )
}

export default About
