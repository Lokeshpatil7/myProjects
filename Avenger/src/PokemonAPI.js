import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import { getPokemon, getAllPokemon } from "./services/Pokemon";
import "./App.css";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    let response = await getAllPokemon(process.env.REACT_APP_Pokemon_App);
    setNextUrl(response.next);
    setPrevUrl(response.previous);
    loadPokemon(response.results);
    setLoading(false);
  }

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(false);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadPokemon = async (data) => {
    let pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon);
        return pokemonRecord;
      })
    );
    setPokemonData(pokemonData);
  };

  return (
    <>
    
      <div>
        {loading ? (
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        ) : (
          <>
            <div className="btn">
              <i className="angle double left icon"></i>
              <button onClick={prev}>Previous</button>
              <button onClick={next}>Next</button>
              <i className="angle double right icon"></i>
            </div>
            <div className="grid-container">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
