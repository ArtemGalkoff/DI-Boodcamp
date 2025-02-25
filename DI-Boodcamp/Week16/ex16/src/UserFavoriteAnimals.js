import React, { Component } from 'react';

class UserFavoriteAnimals extends Component {
  render() {
    // Доступ к массиву животных через props
    const { animals } = this.props;

    return (
      <div>
        <h4>Favorite Animals:</h4>
        <ul>
          {animals.map((animal, index) => (
            <li key={index}>{animal}</li> // Используем index как key для уникальности
          ))}
        </ul>
      </div>
    );
  }
}

export default UserFavoriteAnimals;