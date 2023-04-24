import {useEffect, useState} from "react";

export default function Api() {

  const [pokemones, setPokemones] = useState([]);

  const obtenerCantidadPokemones = async(limit=150, offeset=0) => {
      try {
        const endpoint = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offeset}`;
        const respuesta = await fetch(endpoint);
        const pokemones = await respuesta.json();
        return pokemones.results
      }catch(error) {
        console.log(error.message)
      }
  }

  const obtenerPokemon = async(url) => {
    try {
      const respuesta = await fetch(url);
      const dataPokemon = await respuesta.json();
      const { sprites, name, id, types } = dataPokemon;
      return { sprites, name, id, types}
    } 
    catch(error){
      console.log(error.message)
    }
  }

  useEffect(() => {
    const obtenerPokemones = async() => {
      try {
        const cantidadPokemones = await obtenerCantidadPokemones(500);
        const promesas = cantidadPokemones.map(async(pokemon) => {
          return await obtenerPokemon(pokemon.url)
        })
        const resultado = await Promise.all(promesas);
        setPokemones(resultado);
      }
      catch(error) {
        console.log(error.message)
      }
    }
    obtenerPokemones();
  }, [])
  return (
    <div className="App">
      { pokemones.length > 0 ?
        pokemones.map(pokemon => {
        return (
          <div key={pokemon.id} className="pokemon">
            <h5>{pokemon.name}</h5>
            <img 
            src={pokemon.sprites.front_default} 
            alt={`imagen del pokemon ${pokemon.name}`}
            style={pokemon.types[0].type.name === "fire" ? {filter: "drop-shadow(2px 3px 8px red)"} : { filter: "grayscale(100%)"}}
            />
            <br/>
            <small># {pokemon.id}</small><br/>
            <small>{pokemon.types[0].type.name}</small>
          </div>
        )
      }) 
      : <h3>Cargando ... </h3>
      }
    </div>
  );
}