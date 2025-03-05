import React, { useState, useEffect } from 'react';

function Color() {
    const [favoriteColor, setFavoriteColor] = useState("yellow"); 

 
    useEffect(() => {
        alert("useEffect reached"); 
    }, []); 
    const changeColor = () => {
        setFavoriteColor("blue"); 
    };

    return (
        <div>
            <header>My favorite color is {favoriteColor}</header>
            <button onClick={changeColor}>Change Color to Blue</button>
        </div>
    );
}

export default Color;