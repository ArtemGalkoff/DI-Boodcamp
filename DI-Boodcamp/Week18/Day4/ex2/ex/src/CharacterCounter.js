import React, { useState, useRef } from 'react';

const Counter = () => {
  // Состояние для хранения значения инпута
  const [inputValue, setInputValue] = useState('');
  
  // Используем useRef для получения ссылки на инпут
  const inputRef = useRef(null);

  // Обработчик изменения инпута
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Подсчитываем количество символов в инпуте
  const counter = inputRef.current ? inputRef.current.value.length : 0;

  return (
    <div>
      <h1>Character count: {counter}</h1>
      <input
        ref={inputRef}  // Привязываем ref к инпуту
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter something"
      />
    </div>
  );
}

export default Counter;