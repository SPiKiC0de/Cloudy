'use client';

import { useState } from "react";
import Modal from "./Modal";
import Navbar from "./Navbar";
import {
  WiThermometer,
  WiDaySunny,
  WiHumidity,
  WiRain,
  WiStrongWind,
  WiCloud,
  WiBarometer
} from "react-icons/wi";



function getDayName(date:string){
  const dayName = new Date(date);
  return dayName.toLocaleDateString('en-US',{weekday:"long"})
}


function ForecastCard({
  title,
  max,
  min,
  iconFile
}: {
  title: string;
  max: number;
  min: number;
  iconFile:string;
}) {
  return (
    <div className=" bg-white/90 hover:bg-black hover:text-white text-black rounded-2xl p-4 w-40 text-center  transition ease-in duration-400">
      <div className="">
      <p className="font-bold  hover:text-gray-400">{getDayName(title)}</p>
      <img src={`/${iconFile}`} alt="Weather" className="rounded-4xl w-11 h-11 mb-1 mt-2 ml-10" />
      <p className="text-center hover:text-gray-400 justify-center items-center "><WiThermometer className="absolute text-2xl text-red-500" />Max: {max}°C</p>
      <p className="text-center hover:text-gray-400"><WiThermometer className="absolute text-2xl text-blue-500" />Min: {min}°C</p>
      </div>
    </div>
  );
}


function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weather, setWeather] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [iconFile, setIconFile] = useState<string>("cloudy.gif");

const imgWC = (weatherCode:number)=>{
    if (weatherCode == 0) {
        return "sun.gif";
      } else if (
        weatherCode == 1 ||
        weatherCode == 2 ||
        weatherCode == 3
      ) {
        return"cloudy.gif";
      } else if (weatherCode == 45 || weatherCode == 48) {
        return "foggy.gif";
      } else if (
        weatherCode == 51 ||
        weatherCode == 53 ||
        weatherCode == 61 ||
        weatherCode == 55 ||
        weatherCode == 63 ||
        weatherCode == 65 ||
        weatherCode == 80 ||
        weatherCode == 81 ||
        weatherCode == 82 ||
        weatherCode == 95 ||
        weatherCode == 96 ||
        weatherCode == 99
      ) {
        return "rain.gif";
      } else if (
        weatherCode == 71 ||
        weatherCode == 73 ||
        weatherCode == 75 ||
        weatherCode == 77 ||
        weatherCode == 85 ||
        weatherCode == 86
      ) {
        return "snow.gif";
      }
      return "cloudy.gif";
}


  const handleSearch = async (city: string) => {
    const trimmedCity = city.trim();

    setIsModalOpen(true);

    // 1) Валидация: празно търсене
    if (!trimmedCity) {
      setWeather(null);
      setIsModalOpen(false);
      return alert("No City Entered!")
    }

    // 2) Подготвяме състоянията преди "заявката"
    setIsLoading(true);
    setError(null);
    setWeather(null);

    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`)

      if(!geoRes.ok){
        throw new Error(`Geocoding error: ${geoRes.status}`)
      }

      const geoData = await geoRes.json();

      if(!geoData.results){
        throw new Error(`City Not Found! Please Check!`)
      }

      const { latitude, longitude, name } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,pressure_msl` +
        `&timezone=auto`
      );

      const weatherData = await weatherRes.json();

      const forecastRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        `&daily=temperature_2m_max,temperature_2m_min,weather_code` +
        `&forecast_days=7` +
        `&timezone=auto`
      );

      const forecastData = await forecastRes.json();



      //7 day forecast
      //
      const day2 = forecastData.daily.time[1]
      const day2Max = forecastData.daily.temperature_2m_max[1];
      const day2Min = forecastData.daily.temperature_2m_min[1];
      const day2WC = forecastData.daily.weather_code[1];
      //
      const day3 = forecastData.daily.time[2]
      const day3Max = forecastData.daily.temperature_2m_max[2];
      const day3Min = forecastData.daily.temperature_2m_min[2];
      const day3WC = forecastData.daily.weather_code[2];
      //
      const day4 = forecastData.daily.time[3]
      const day4Max = forecastData.daily.temperature_2m_max[3];
      const day4Min = forecastData.daily.temperature_2m_min[3];
      const day4WC = forecastData.daily.weather_code[3];
      //
      const day5 = forecastData.daily.time[4]
      const day5Max = forecastData.daily.temperature_2m_max[4];
      const day5Min = forecastData.daily.temperature_2m_min[4];
      const day5WC = forecastData.daily.weather_code[4];
      //
      const day6 = forecastData.daily.time[5]
      const day6Max = forecastData.daily.temperature_2m_max[5];
      const day6Min = forecastData.daily.temperature_2m_min[5];
      const day6WC = forecastData.daily.weather_code[5];


      //vkarvane v promenlivi
      const temperature = weatherData.current.temperature_2m;
      const weatherCode = weatherData.current.weather_code;
      const feelsLike = weatherData.current.apparent_temperature;
      const humidity = weatherData.current.relative_humidity_2m;
      const precipitation = weatherData.current.precipitation;
      const windDirection = weatherData.current.wind_direction_10m;
      const windSpeed = weatherData.current.wind_speed_10m;
      const cloudCover = weatherData.current.cloud_cover;
      const pressure = weatherData.current.pressure_msl;

      if (temperature === undefined || weatherCode === undefined) {
        throw new Error("Няма налични данни за текущото време.");
      }

      const uiWeather = {
        city: name,
        temperature: temperature,
        feelsLike:feelsLike,
        humidity:humidity,
        precipitation:precipitation,
        windDirection:windDirection,
        windSpeed:windSpeed,
        cloudCover:cloudCover,
        pressure:pressure,

        //7day
        //
        day2:day2,
        day2Max:day2Max,
        day2Min:day2Min,
        day2WC:day2WC,

        //
        day3:day3,
        day3Max:day3Max,
        day3Min:day3Min,
        day3WC:day3WC,

        //
        day4:day4,
        day4Max:day4Max,
        day4Min:day4Min,
        day4WC:day4WC,

        //
        day5:day5,
        day5Max:day5Max,
        day5Min:day5Min,
        day5WC:day5WC,

        //
        day6:day6,
        day6Max:day6Max,
        day6Min:day6Min,
        day6WC:day6WC

      };

      setWeather(uiWeather);

      if (weatherCode == 0) {
        setIconFile("sun.gif");
      } else if (
        weatherCode == 1 ||
        weatherCode == 2 ||
        weatherCode == 3
      ) {
        setIconFile("cloudy.gif"); 
      } else if (weatherCode == 45 || weatherCode == 48) {
        setIconFile("foggy.gif");
      } else if (
        weatherCode == 51 ||
        weatherCode == 53 ||
        weatherCode == 61 ||
        weatherCode == 55 ||
        weatherCode == 63 ||
        weatherCode == 65 ||
        weatherCode == 80 ||
        weatherCode == 81 ||
        weatherCode == 82 ||
        weatherCode == 95 ||
        weatherCode == 96 ||
        weatherCode == 99
      ) {
        setIconFile("rain.gif");
      } else if (
        weatherCode == 71 ||
        weatherCode == 73 ||
        weatherCode == 75 ||
        weatherCode == 77 ||
        weatherCode == 85 ||
        weatherCode == 86
      ) {
        setIconFile("snow.gif");
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Възникна неочаквана грешка.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
    <Navbar onSearch={handleSearch}></Navbar>
    <div className="fixed inset-0 flex items-center justify-center brightness-105">
      <header className="min-h-screen w-full flex flex-col items-center justify-center text-center text-shadow-lg text-shadow-black">
          {!isModalOpen && <h1 className="pb-10 lg:text-7xl font-bold sm:text-3xl">Welcome to Cloudy</h1>}

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {isLoading && (
            <div className="flex flex-col items-center justify-center">
              <img src="/day-and-night.gif" alt="Loading" className="h-110 w-110" />
              <p className="text-black">Loading...</p>
            </div>
          )}

          {!isLoading && error && <p className="text-red-900 text-6xl lg:mt-55">{error}</p>}

          {!isLoading && !error && weather && (
            <div className="grid grid-cols-2 text-gray-950 items-start w-full max-w-5xl">
              <div className="">
              {/* LEFT */}
              <div>
                <img src={`/${iconFile}`} alt="Weather" className="w-80 h-80 ml-67 rounded-4xl opacity-100" />

                <div className="grid grid-cols-5 gap-3 w-205 mt-6">
                  <ForecastCard
                    iconFile={imgWC(weather.day2WC)}
                    title={weather.day2}
                    max={weather.day2Max}
                    min={weather.day2Min}
                  ></ForecastCard>
                  <ForecastCard
                  iconFile={imgWC(weather.day3WC)}
                    title={weather.day3}
                    max={weather.day3Max}
                    min={weather.day3Min}
                  ></ForecastCard>
                  <ForecastCard
                  iconFile={imgWC(weather.day4WC)}
                    title={weather.day4}
                    max={weather.day4Max}
                    min={weather.day4Min}
                  ></ForecastCard>
                  <ForecastCard
                  iconFile={imgWC(weather.day5WC)}
                    title={weather.day5}
                    max={weather.day5Max}
                    min={weather.day5Min}
                  ></ForecastCard>
                  <ForecastCard
                  iconFile={imgWC(weather.day6WC)}
                    title={weather.day6}
                    max={weather.day6Max}
                    min={weather.day6Min}
                  ></ForecastCard>

                </div>
              </div>
</div>
<div className="ml-2 w-2xl">
              {/* RIGHT */}
              <div className="absolute right-11 top-8 text-black bg-white p-3 rounded-4xl  hover:bg-black hover:text-white  transition ease-in duration-400">
                <h1 className="font-bold text-6xl  hover:text-gray-400">Today</h1>
                <br /><br />
                <p className="font-bold text-2xl  hover:text-gray-400">City: {weather.city}</p>
                <br />
                <div className="space-y-2.5 text-lg">
                  <p className="flex items-center gap-3  hover:text-gray-400">
                    <WiThermometer className="text-3xl text-red-500" />
                    Temperature: {weather.temperature}°C
                  </p>

                  <p className="flex items-center gap-3 hover:text-gray-400">
                    <WiDaySunny className="text-3xl text-yellow-500 " />
                    Feels Like: {weather.feelsLike}°C
                  </p>

                  <p className="flex items-center gap-3 hover:text-gray-400">
                    <WiHumidity className="text-3xl text-blue-500" />
                    Humidity: {weather.humidity}%
                  </p>

                  <p className="flex items-center gap-3 hover:text-gray-400">
                    <WiRain className="text-3xl text-blue-400" />
                    Precipitation: {weather.precipitation} mm
                  </p>

                  <p className="flex items-center gap-3 hover:text-gray-400">
                    <WiStrongWind
                      className="text-3xl text-gray-600"
                      style={{ transform: `rotate(${weather.windDirection}deg)` }}
                    />
                    Wind Direction: {weather.windDirection}°
                  </p>

                  <p className="flex items-center gap-3  hover:text-gray-400">
                    <WiStrongWind className="text-3xl text-gray-700" />
                    Wind Speed: {weather.windSpeed} km/h
                  </p>

                    <p className="flex items-center gap-3  hover:text-gray-400">
                      <WiCloud className="text-3xl text-gray-500" />
                      Cloud Cover: {weather.cloudCover}%
                    </p>

                    <p className="flex items-center gap-3 hover:text-gray-400">
                      <WiBarometer className="text-3xl text-purple-500" />
                      Pressure: {weather.pressure} hPa
                    </p>
                  </div>
                </div>
            </div>
</div>
          )}
        </Modal>
      </header>
    </div>
    </div>
  );
}

export default Header;
