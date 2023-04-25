import { useEffect, useState } from "react";
import { obtenerCantidadPokemones, obtenerPokemon } from "../api/peticionesApi";

export default function Api() {
  const [pokemones, setPokemones] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const colorParaTipoPokemon = (tipo, pokemonId) => {
    // poison, grass, fire, water, electric
    let color = "#000";

    const style = {};
    switch (tipo) {
      case "poison":
        color = "blueviolet";
        break;
      case "psychic":
        color = "blueviolet";
        break;
      case "grass":
        color = "green";
        break;
      case "fire":
        color = "red";
        break;
      case "electric":
        color = "yellow";
        break;
      case "water":
        color = "blue";
        break;
      case "ground":
        color = "peru";
        break;
      case "flying":
        color = "cyan";
        break;
      default:
        color = "#999";
    }

    if (pokemonId) {
      const pokemon = document.getElementById(pokemonId);
      return (pokemon.style.filter = `drop-shadow(3px 5px 10px ${color})`);
    }
    style.filter = `drop-shadow(3px 5px 10px ${color})`;

    return style;
  };
  useEffect(() => {
    const obtenerPokemones = async () => {
      try {
        const cantidadPokemones = await obtenerCantidadPokemones(150);
        const promesas = cantidadPokemones.map(async (pokemon) => {
          return await obtenerPokemon(pokemon.url);
        });
        const resultado = await Promise.all(promesas);
        setPokemones(resultado);
      } catch (error) {
        console.log(error.message);
      }
    };
    obtenerPokemones();
    console.log(busqueda);
  }, [pokemones]);
  return (
    <div className="App">
      <input
        placeholder="Buscar pokemón"
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <br />
      <br />
      Cantidad de pokemones : {pokemones.length}
      <br />
      {pokemones.length > 0 ? (
        pokemones
          .filter((pokemon) => {
            return pokemon.name.includes(busqueda.toLocaleLowerCase());
          })
          .reverse()
          .map((pokemon) => {
            return (
              <div key={pokemon.id} className="pokemon">
                <h5>{pokemon.name}</h5>
                <img
                  src={pokemon.sprites.front_default}
                  id={pokemon.name}
                  alt={`imagen del pokemon ${pokemon.name}`}
                  style={colorParaTipoPokemon(pokemon.types[0].type.name)}
                  onClick={() => {
                    console.log(pokemon.types[1] === undefined ? "hola" : "a");
                    console.log(pokemon.types[1]);
                  }}
                />
                <br />
                <small># {pokemon.id}</small>
                <br />
                <div>
                  <button
                    onClick={(e) => {
                      colorParaTipoPokemon(e.target.textContent, pokemon.name);
                    }}
                  >
                    {pokemon.types[0].type.name}
                  </button>
                  {pokemon.types[1] === undefined ? (
                    ""
                  ) : (
                    <button
                      onClick={(e) => {
                        colorParaTipoPokemon(
                          e.target.textContent,
                          pokemon.name
                        );
                      }}
                    >
                      {pokemon.types[1].type.name}
                    </button>
                  )}
                </div>
              </div>
            );
          })
      ) : (
        <h3>Cargando ... </h3>
      )}
    </div>
  );
}
