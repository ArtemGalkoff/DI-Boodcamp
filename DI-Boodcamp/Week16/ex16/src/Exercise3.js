import React, { Component } from 'react';
import './App.css'; //
import './Exercise.css';
  
class Exercise extends Component {

     

  render() {

    const style_header = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial" };

    return (
      <div class= 'container'>

        <header style={style_header}>This is header</header>
        <h1 style={{ color: 'red', backgroundColor: 'lightblue' }}>
          Hello from Exercise Component!
        </h1>

        <p className="para">This is a simple paragraph inside the Exercise component.</p>

        <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
          Visit Example.com
        </a>

        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
          <button type="submit">Submit</button>
        </form>

        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" id='logo' />

        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    );
  }
}

export default Exercise;