import Link from "next/link";

async function getData() {
  const res = await fetch("https://swapi.dev/api/people");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  var raw_data = await res.json();
  raw_data.results.map((p: character) => {
    p.id = parseInt(p.url.split("/")[5]);
  });
  return raw_data;
}
interface character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: any[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
  id: number;
}

export default async function Page() {
  const data = await getData();
  return (
    <>
      <h1>Starwar</h1>
      {data.results.map((p: character) => (
        <li key={p.name}>
          <Link href={"/starwar/" + p.id}>{p.name}</Link>
        </li>
      ))}
    </>
  );
}
