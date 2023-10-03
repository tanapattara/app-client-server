export async function GET(request: Request) {
  const apikey = process.env.WEATHER_API_KEY;
  const lat = request.headers.get("lat");
  const lon = request.headers.get("lon");

  if (!lat && !lon) {
    return new Response("Missing lat and lon", { status: 400 });
  }
  console.log(lat, lon, apikey);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (res.status !== 200) {
    return new Response("Error fetching weather", { status: 500 });
  } else {
    return new Response(JSON.stringify(await res.json()));
  }
}
