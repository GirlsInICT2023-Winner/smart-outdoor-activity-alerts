import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Weather = ({ city, currentPosition }) => {
  const [temperatures, setTemperatures] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [precipitation, setPrecipitation] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [pm2_5, setPm2_5] = useState(null);
  const [pm10, setPm10] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { latitude, longitude } = currentPosition.coords;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_KEY}`;
      const response = await axios.get(url);

      // temperatures
      const temp = response.data.main.temp - 273.15;
      setTemperatures(temp.toFixed(2));

      // wind
      const windSpeed = response.data.wind.speed;
      setWindSpeed(windSpeed);

      // precipitation
      const precipitation = response.data.rain
        ? response.data.rain["1h"]
        : null;
      setPrecipitation(precipitation ? precipitation : 0);

      // humidty
      const humidity = response.data.main.humidity;
      setHumidity(humidity);

      const pm_url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_KEY}`;
      const pm_response = await axios.get(pm_url);

      // pm10
      const pm10 = pm_response.data.list[0].components.pm10;
      setPm10(pm10);

      // pm2_5
      const pm2_5 = pm_response.data.list[0].components.pm2_5;
      setPm2_5(pm2_5);
    };

    fetchData();
  }, [currentPosition]);

  return (
    <Weathers>
      <CityInfo>Weather in {city} is</CityInfo>
      <WeatherItem>
        <Title>Temperatures</Title>
        <Item>{temperatures}</Item>
      </WeatherItem>
      <WeatherItem>
        <Title>Wind</Title>
        <Item>{windSpeed}</Item>
      </WeatherItem>
      <WeatherItem>
        <Title>Precipitation</Title>
        <Item>{precipitation}</Item>
      </WeatherItem>
      <WeatherItem>
        <Title>Humidity</Title>
        <Item>{humidity}</Item>
      </WeatherItem>
      <WeatherItem>
        <Title>Fine dust</Title>
        <Item>{pm10}</Item>
      </WeatherItem>
      <WeatherItem>
        <Title>Ultrafine dust</Title>
        <Item>{pm2_5}</Item>
      </WeatherItem>
    </Weathers>
  );
};

export default Weather;

const Weathers = styled.div`
  width: 400px;
  min-width: 280px !important;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 20px 10px;
  border-radius: 15px;
  border: 1px solid gray;
  font-size: 28px;
  color: black;
`;

const CityInfo = styled.div`
  padding: 5px;
  margin-bottom: 15px;
`;

const WeatherItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5px;
`;

const Title = styled.div`
  font-weight: 600;
  border-top: 1px solid lightgray;
  padding: 5px;
`;

const Item = styled.div`
  padding: 5px;
`;
