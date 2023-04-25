export const obtenerCantidadPokemones = async (limit = 150, offeset = 0) => {
  try {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offeset}`;
    const respuesta = await fetch(endpoint);
    const pokemones = await respuesta.json();
    return pokemones.results;
  } catch (error) {
    console.log(error.message);
  }
};

export const obtenerPokemon = async (url) => {
  try {
    const respuesta = await fetch(url);
    const dataPokemon = await respuesta.json();
    const { sprites, name, id, types } = dataPokemon;
    return { sprites, name, id, types };
  } catch (error) {
    console.log(error.message);
  }
};
