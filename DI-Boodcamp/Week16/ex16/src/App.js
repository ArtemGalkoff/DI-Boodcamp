/* function App() {
  const myelement = <h1>I Love JSX!</h1>;
  const sum = 5 + 5;
  return (
    <>
      {myelement}
      <h1>React is {sum} times better with JSX</h1>
      <p>Hello World</p>
    </>
  )
} */

  //import UserFavoriteAnimals from './UserFavoriteAnimals'; 
  
  //ex 2
  /* const user = {
    firstName: 'Bob',
    lastName: 'Dylan',
    favAnimals: ['Horse', 'Turtle', 'Elephant', 'Monkey']
  };
  
  function App() {
    return (
      <div>
        <h3>{user.firstName}</h3>
        <h3>{user.lastName}</h3>
        
        <UserFavoriteAnimals animals={user.favAnimals} />
      </div>
    );
  }
  
  export default App; */

  //ex3

  import React from 'react';
  import Exercise from './Exercise3';

function App() {
  return (
    <div>
      <Exercise />
    </div>
  );
}

export default App;