const mainEl = document.querySelector("main");

const main = async () => {
  const characters = await fetchAllCharacters();
  const maxCells = 6;

  for (let i = 0; i < Math.min(characters.length, maxCells); i++) {
    const character = characters[i];
    const episode = await fetchJsonAsync(character.episode[0]);
    mainEl.insertAdjacentHTML('beforeend', renderCharacterHTML(character, episode));
  }
};

const renderCharacterHTML = (character, episode) => `
  <article class="character-card">
    <div class="image-container">
      <img src="${character.image}" alt="Character" height="100%" width="100%">
    </div>
    <div class="character-info">
      <div class="section">
        <h2>${character.name}</h2>
        <div class="status">
          <span class="status-dot ${getStatusColor(character.status)}"></span>
          <span class="status">${character.status} - ${character.species}</span>
        </div>
      </div>
      <div class="section">
        <span class="greytext">Last known location:</span>
        <span>${character.location.name}</span>
      </div>
      <div class="section">
        <span class="greytext">First seen in:</span>
        <span>${episode.name}</span>
      </div>
    </div>
  </article>
`;

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'unknown':
      return 'grey';
    case 'dead':
      return 'red';
    case 'alive':
      return 'green';
    default:
      return '';
  }
};

const fetchAllCharacters = async () => {
  const response = await fetchJsonAsync('https://rickandmortyapi.com/api/character');
  return response.results;
};

const fetchJsonAsync = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  } catch (err) {
    console.error('Error fetching JSON:', err);
  }
};

main();