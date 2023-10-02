"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { PokemonModel } from "./pokemonmodel";

export default function Page() {
  //get pokemon name from url
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<PokemonModel>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  //load from api
  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((res) => {
        setPokemon(res);
      })
      .catch((err) => {
        console.log(err);
        //throw new Error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading && <p>Loading...</p>}
      {pokemon && <p>{pokemon.name}</p>}
    </>
  );
}
