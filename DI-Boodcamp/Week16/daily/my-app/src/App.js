import React from 'react';
import './App.css';   // Кастомные стили для вашего приложения
import CarouselComponent from './components/CarouselComponent'; // Импорт компонента с каруселью

function App() {
  return (
    <div className="App">
      <h1>React Carousel Example</h1>
      <CarouselComponent />
    </div>
  );
}

export default App;