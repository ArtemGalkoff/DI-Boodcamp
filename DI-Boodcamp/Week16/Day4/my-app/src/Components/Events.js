import React, { useState } from 'react';

function Events(props) {
    const [isToggleOn, setIsToggleOn] = useState(true);

    const clickMe = () => {
        alert('I was clicked');
    };

    const toggleButton = () => {
        setIsToggleOn(prevState => !prevState);
    };

    return (
        <div>
            <h1>React Button Click Example</h1>
            <button onClick={clickMe}>Click Me</button>

            <button onClick={toggleButton}>
                {isToggleOn ? 'ON' : 'OFF'}
            </button>
        </div>
    );
}

export default Events;