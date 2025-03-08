import React from 'react';
import BuggyCounter from './BuggyCounter';
import ErrorBoundary from './ErrorBoundary';
import ColorChanger from './Color';
import { Child } from './Color'; 

function App() {
  return (
    <div>
      <h1>Пример с ErrorBoundary</h1>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>

      <ColorChanger/>
      <Child />
    </div>
  );
}


export default App;