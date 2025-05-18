const btn = document.getElementById('load-character-btn');
const infoDiv = document.getElementById('character-info');

const TOTAL_CHARACTERS = 83; 

async function fetchCharacter(id) {
  const url = `https://www.swapi.tech/api/people/${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data.result;
}


async function fetchHomeworld(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data.result.properties.name;
}


function showCharacter(character) {
  const { name, properties } = character;
  const { height, gender, birth_year, homeworld } = properties;

  fetchHomeworld(homeworld)
    .then((planetName) => {
      infoDiv.innerHTML = `
        <h2>${name}</h2>
        <p><strong>Height:</strong> ${height} cm</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Birth Year:</strong> ${birth_year}</p>
        <p><strong>Homeworld:</strong> ${planetName}</p>
      `;
    })
    .catch((err) => {
      infoDiv.innerHTML = `<p class="error">Error loading homeworld data.</p>`;
      console.error(err);
    });
}

function showLoading() {
  infoDiv.innerHTML = `<i class="fas fa-spinner fa-spin loading"></i><p>Loading...</p>`;
}


function showError(message) {
  infoDiv.innerHTML = `<p class="error">${message}</p>`;
}


btn.addEventListener('click', async () => {
  showLoading();
  try {
    const randomId = Math.floor(Math.random() * TOTAL_CHARACTERS) + 1;
    const character = await fetchCharacter(randomId);
    showCharacter(character);
  } catch (error) {
    showError('Failed to load character data. Please try again.');
    console.error(error);
  }
});