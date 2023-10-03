"use client";
import React from "react";
import { WeatherModel } from "./models/weathermodel";

export default function WeatherComponent(props: { data: WeatherModel }) {
  const { data } = props;
  console.log(data);
  return (
    <>
      <h1>Weather of {data.name}</h1>
    </>
  );
}
