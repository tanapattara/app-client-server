"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

interface PokemonList {
  name: string;
  url: string;
}
export default function Page() {
  const [pokemon, setPokemon] = useState<PokemonList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  //load from api
  useEffect(() => {
    setLoading(true);
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((res) => {
        setPokemon(res.results);
      })
      .catch((err) => {
        setError(err);
        throw new Error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1>Pokemon</h1>
      {loading && <p>Loading...</p>}
      <ul>
        {pokemon.map((p) => (
          <li key={p.name}>
            <Link href={"/pokemon/" + p.name}> {p.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
