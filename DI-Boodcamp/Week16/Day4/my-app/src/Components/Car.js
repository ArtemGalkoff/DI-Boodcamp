import React, { useState } from 'react';
import Garage from './Garage';

function Car(props) {
  const [color] = useState("Red"); 

  return (
    <div>
      <h2>This car is {color} {props.model}</h2>
      <Garage size="small" />
    </div>
  );
}

export default Car;