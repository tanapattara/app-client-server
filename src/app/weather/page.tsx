"use client";
import { useSearchParams } from "next/navigation";
import { WeatherModel } from "./models/weathermodel";
import WeatherComponent from "./weather-component";
import { useEffect, useState } from "react";
import { METHODS } from "http";

export default function Page() {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  const [weather, setWeather] = useState<WeatherModel | null>(null);
  useEffect(() => {
    if (!lat || !lon) return;
    fetch("http://localhost:3000/api/weather", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        lat: lat,
        lon: lon,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setWeather(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Weather</h1>
      <form method="GET">
        <input type="number" placeholder="Latitude" name="lat" />
        <input type="number" placeholder="Longitude" name="lon" />
        <input type="submit" value="Submit" />
      </form>
      {weather && <WeatherComponent data={weather} />}
    </>
  );
}
