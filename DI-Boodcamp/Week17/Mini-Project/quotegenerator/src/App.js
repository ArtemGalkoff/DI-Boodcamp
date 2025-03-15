import React, { useState } from 'react';
import './App.css';
import quotes from './Data/QuotesDatabase';  

function App() {
  const [currentQuote, setCurrentQuote] = useState(getRandomQuote());
  const [backgroundColor, setBackgroundColor] = useState(getRandomColor());
  const [quoteColor, setQuoteColor] = useState(getRandomColor());
  const [buttonColor, setButtonColor] = useState(getRandomColor());

  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function changeQuote() {
    let newQuote;
    let newColor;
    let newQuoteColor;
    let newButtonColor;

    do {
      newQuote = getRandomQuote();
    } while (newQuote.quote === currentQuote.quote); 

    newColor = getRandomColor();
    newQuoteColor = getRandomColor();
    newButtonColor = getRandomColor();

    setCurrentQuote(newQuote);
    setBackgroundColor(newColor);
    setQuoteColor(newQuoteColor);
    setButtonColor(newButtonColor);
  }

  return (
    <div className="App" style={{ backgroundColor: backgroundColor }}>
      <h1 style={{ color: quoteColor }}>{currentQuote.quote}</h1>
      <p style={{ color: quoteColor }}>- {currentQuote.author}</p>
      <button
        onClick={changeQuote}
        style={{ backgroundColor: buttonColor, color: '#fff' }}
      >
        New Quote
      </button>
    </div>
  );
}

export default App;