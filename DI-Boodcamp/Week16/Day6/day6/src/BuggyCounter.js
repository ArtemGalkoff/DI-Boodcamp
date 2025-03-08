import React, { Component } from 'react';

class BuggyCounter extends Component {
  constructor(props) {
    super(props);
    // Инициализация состояния
    this.state = {
      counter: 0
    };
  }

  // Метод для обработки клика
  handleClick = () => {
    // Если счётчик равен 5, выбрасываем ошибку
    if (this.state.counter === 5) {
      throw new Error('I crashed!');
    }

    // Иначе увеличиваем счётчик на 1
    this.setState((prevState) => ({
      counter: prevState.counter + 1
    }));
  };

  render() {
    return (
      <div>
        <h1>{this.state.counter}</h1>
        <button onClick={this.handleClick}>Click me!</button>
      </div>
    );
  }
}

export default BuggyCounter;