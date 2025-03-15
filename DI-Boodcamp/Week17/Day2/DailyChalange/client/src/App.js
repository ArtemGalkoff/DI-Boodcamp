import React, { Component } from 'react';

class App extends Component {
  state = {
    message: '',
    inputValue: '',
    responseMessage: '',
  };

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:5000/api/hello');
      const data = await response.json();
      this.setState({ message: data.message });
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/world', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: this.state.inputValue }),
      });

      const data = await response.json();
      this.setState({ responseMessage: data.message });
    } catch (error) {
      console.error('Error posting data: ', error);
    }
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.message}</h1>
        
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChange}
            placeholder="Input smth"
          />
          <button type="submit">Send</button>
        </form>

        {this.state.responseMessage && (
          <h2>{this.state.responseMessage}</h2>
        )}
      </div>
    );
  }
}

export default App;