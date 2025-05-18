const btn = document.getElementById('load-character-btn');
const infoDiv = document.getElementById('character-info');

const TOTAL_CHARACTERS = 83; // Всего персонажей в API

// Получить данные персонажа по id
async function fetchCharacter(id) {
  const url = `https://www.swapi.tech/api/people/${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data.result;
}

// Получить название планеты по URL
async function fetchHomeworld(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data.result.properties.name;
}

// Показать данные персонажа на странице
async function showCharacter(character) {
  const { name, properties } = character;
  const { height, gender, birth_year, homeworld } = properties;

  try {
    const planetName = await fetchHomeworld(homeworld);
    infoDiv.innerHTML = `
      <h2>${name}</h2>
      <p><strong>Height:</strong> ${height} cm</p>
      <p><strong>Gender:</strong> ${gender}</p>
      <p><strong>Birth Year:</strong> ${birth_year}</p>
      <p><strong>Homeworld:</strong> ${planetName}</p>
    `;
  } catch (err) {
    infoDiv.innerHTML = `<p class="error">Error loading homeworld data.</p>`;
    console.error(err);
  }
}

// Показать индикатор загрузки
function showLoading() {
  infoDiv.innerHTML = `<i class="fas fa-spinner fa-spin loading"></i><p>Loading...</p>`;
}

// Показать сообщение об ошибке
function showError(message) {
  infoDiv.innerHTML = `<p class="error">${message}</p>`;
}

// Обработчик клика по кнопке
btn.addEventListener('click', async () => {
  showLoading();
  try {
    const randomId = Math.floor(Math.random() * TOTAL_CHARACTERS) + 1;
    const character = await fetchCharacter(randomId);
    await showCharacter(character);
  } catch (error) {
    showError('Failed to load character data. Please try again.');
    console.error(error);
  }
});