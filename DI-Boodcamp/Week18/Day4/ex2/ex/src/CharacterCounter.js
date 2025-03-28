import React, { useState, useRef } from 'react';

const Counter = () => {
  const [inputValue, setInputValue] = useState('');
  
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const counter = inputRef.current ? inputRef.current.value.length : 0;

  return (
    <div>
      <h1>Character count: {counter}</h1>
      <input
        ref={inputRef}  
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter something"
      />
    </div>
  );
}

export default Counter;