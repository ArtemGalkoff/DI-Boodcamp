import React from 'react';
interface SmthProps {
    name?: string;
    age?: number;
    role?: string;
}

const Smth: React.FC<SmthProps> = ({ name = 'Unknown', age = 18, role = 'Guest' }) => {
    return (
      <div>
        <h2>User Card</h2>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Role: {role}</p>
      </div>
    );
  };

  export default Smth;