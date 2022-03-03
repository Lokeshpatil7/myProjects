import React from "react";
import { useState } from "react";
import axios from "axios";
export default () => {
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemonID, setPokemonID] = useState("");
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });
  const searchPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      .then((response) => {
        setPokemon({
          ID: pokemonID,
          species: response.data.species.name,
          img: response.data.sprites.back_shiny,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
      });
  };
  return (
    <>
      <input
        type="text"
        onChange={(event) => {
          setPokemonID(event.target.value);
        }}
      />
      <button onClick={searchPokemon} className="btun">
        Search
      </button>
      <div>
        {!pokemonChosen ? (
          <p className="heading">Please Enter Id to choose Pokemon</p>
        ) : (
          
          <div className="pokemonList">
              <h1>{pokemon.ID}</h1>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img} />
            <h1>{pokemon.species}</h1>
            <h1>{pokemon.type}</h1>
          </div>
        )}
      </div>
    </>
  );
};
