let planets = [
    { name: 'Mercury', color: 'gray', moons: [] },
    { name: 'Venus', color: 'yellow', moons: [] },
    { name: 'Earth', color: 'blue', moons: ['Moon'] },
    { name: 'Mars', color: 'red', moons: ['Phobos', 'Deimos'] },
    { name: 'Jupiter', color: 'orange', moons: ['Io', 'Europa', 'Ganymede', 'Callisto'] },
    { name: 'Saturn', color: 'gold', moons: ['Titan', 'Rhea', 'Iapetus'] },
    { name: 'Uranus', color: 'lightblue', moons: ['Miranda', 'Ariel', 'Umbriel'] },
    { name: 'Neptune', color: 'darkblue', moons: ['Triton', 'Nereid'] },
    { name: 'Pluto', color: 'brown', moons: ['Charon'] }
];

// Get the section element where we will append the planets
let section = document.querySelector('.listPlanets');

// Loop through the planets array
planets.forEach(planet => {
    // Create the planet div
    let planetDiv = document.createElement('div');
    planetDiv.classList.add('planet');
    planetDiv.style.backgroundColor = planet.color;
    planetDiv.textContent = planet.name;

    // Append the planet div to the section
    section.appendChild(planetDiv);

    // For each moon of the planet, create a moon div and append it to the planet
    planet.moons.forEach(moon => {
        let moonDiv = document.createElement('div');
        moonDiv.classList.add('moon');
        moonDiv.textContent = moon; // Optionally, set the moon's name as text
        planetDiv.appendChild(moonDiv);
    });
});