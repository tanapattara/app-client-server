async function getData(id: string) {
  //get data from api
  const res = await fetch("https://swapi.dev/api/people/" + id);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const res = await getData(params.id);
  return <h1>{res.name}</h1>;
}
