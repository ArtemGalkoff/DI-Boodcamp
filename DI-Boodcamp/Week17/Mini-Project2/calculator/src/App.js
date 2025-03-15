import React, { useState } from 'react';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    let result = null;
    
   
    if (isNaN(number1) || isNaN(number2)) {
      setResult('Input regular numbers');
      return;
    }

   
    switch (operation) {
      case 'add':
        result = number1 + number2;
        break;
      case 'subtract':
        result = number1 - number2;
        break;
      case 'multiply':
        result = number1 * number2;
        break;
      case 'divide':
        if (number2 === 0) {
          result = 'ZeroError';
        } else {
          result = number1 / number2;
        }
        break;
      default:
        result = 'Unvald operation';
    }

    setResult(result);
  };

  return (
    <div className="App">
      <h1>Calculator</h1>
      
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        placeholder="Enter first number"
      />
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        placeholder="Enter second number"
      />
      
      <select value={operation} onChange={(e) => setOperation(e.target.value)}>
        <option value="add">Addition</option>
        <option value="subtract">Substraction</option>
        <option value="multiply">Multiplycation</option>
        <option value="divide">Division</option>
      </select>
      
      <button onClick={calculate}>Do</button>
      
      {result !== null && <h2>Result: {result}</h2>}
    </div>
  );
}

export default App;