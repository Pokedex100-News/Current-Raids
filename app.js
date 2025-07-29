const set = new Set();
let mapsCounter = 0;
const MAX_MAPS = 3;

const getRaids = async (place = "nyc") => {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/Pokedex100/Current-Raids/refs/heads/main/Data/${place}.json`);
    if (!res) return;
    const data = await res.json();
    extractPokemonID(data, place);
  } catch (e) {
    console.error(e + " Map Down: " + place);
  }
};

const getPokedexData = async () => {
  const res = await fetch("https://raw.githubusercontent.com/Pokedex100/Current-Raids/refs/heads/main/Data/pokedexdata.json");
  return await res.json();
};

getRaids("nyc");
getRaids("sgp");
getRaids("sydney");

const extractPokemonID = async (data, place) => {
  for (const raid of data.raids) {
    if (raid.pokemon_id) set.add(raid.pokemon_id);
  }
  mapsCounter++;
  if (mapsCounter === MAX_MAPS) {
    const pokemonIDs = [...set].sort((a, b) => a - b);
    await getPokemonNames(pokemonIDs);
  }
};

const getPokemonNames = async (pokemonIDs) => {
  const pokedex = await getPokedexData();
  const pokemonNames = [];
  for (const id of pokemonIDs) {
    const formattedID = id.toString().padStart(4, "0");
    pokemonNames.push(pokedex[formattedID]);
  }
  generateUI(pokemonNames);
};

const generateUI = (names) => {
  const container = document.createElement("div");
  container.classList.add("container");
  for (const name of names) {
    const image = document.createElement("img");
    image.src = `https://img.pokemondb.net/sprites/home/normal/${name}.png`;
    image.alt = name;
    const text = document.createElement("p");
    const ripple = document.createElement("md-ripple");
    text.textContent = name;
    const card = document.createElement("div");
    card.classList.add("card");
    card.appendChild(image);
    card.appendChild(text);
    card.appendChild(ripple);
    container.appendChild(card);
  }
  document.body.appendChild(container);
};
