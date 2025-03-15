import React, { Component } from 'react';
import countries from '../Data/countries'; 

class AutoCompletedText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [], 
      text: '',         
    };
  }

  handleChange = (event) => {
    const userInput = event.target.value;
    this.setState({
      text: userInput,
      suggestions: userInput
        ? countries.filter(country => country.toLowerCase().includes(userInput.toLowerCase()))
        : [], 
    });
  };

  handleSelectCountry = (country) => {
    this.setState({
      text: country, 
      suggestions: [], 
    });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.text}
          onChange={this.handleChange}
          placeholder="Enter countrie..."
        />
        
 
        {this.state.suggestions.length > 0 && (
          <ul>
            {this.state.suggestions.map((country, index) => (
              <li key={index} onClick={() => this.handleSelectCountry(country)}>
                {country}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default AutoCompletedText;