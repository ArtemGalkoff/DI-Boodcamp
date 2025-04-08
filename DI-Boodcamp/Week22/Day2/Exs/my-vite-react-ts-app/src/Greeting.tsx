import React from 'react';

interface GreetingProps {
  name: string;
  messageCount: string;
}

const Greeting: React.FC<GreetingProps> = ({ name, messageCount }) => (
  <h1>Hello, {name}, {messageCount}</h1>
);

export default Greeting;