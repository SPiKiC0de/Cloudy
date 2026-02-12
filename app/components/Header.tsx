'use client'
import { use, useState } from "react";
import SearchBox from "./SearchBar";
import Modal from "./Modal";


function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weather, setWeather] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSearch = async (city: string) => {
  const trimmedCity = city.trim();

  setIsModalOpen(true);

  // 1) Валидация: празно търсене
  if (!trimmedCity) {
    setWeather(null);
    // ако още нямаш error state: добави го -> useState<string | null>(null)
    setError("Моля, въведи име на град.");
    return;
  }

  
  // 2) Подготвяме състоянията преди заявката
  setIsLoading(true);
  setError(null);
  setWeather(null);

  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmedCity)}&count=1&language=en&format=json`
    );

    if (!geoRes.ok) {
      throw new Error(`Geocoding error: ${geoRes.status}`);
    }

    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("Градът не е намерен.");
    }

    const { latitude, longitude, name } = geoData.results[0];

   const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    if (!weatherRes.ok) {
      throw new Error("Грешка при взимане на времето.");
    }

    const weatherData = await weatherRes.json();

    const uiWeather = {
      city: name,
      temperature: weatherData.current_weather?.temperature,
      weatherCode: weatherData.current_weather?.weathercode,
    };

  setWeather(uiWeather);


  } catch (err) {
    // 4) Превръщаме грешката в читав текст
    const message = err instanceof Error ? err.message : "Възникна неочаквана грешка.";
    setError(message);
  } finally {
    // 5) Винаги спираме loading-а
    setIsLoading(false);
  }
};


  return (
    <header className="min-h-screen w-full flex flex-col items-center justify-center text-center text-shadow-lg text-shadow-black">
      <h1 className="pb-10 text-7xl font-bold">Welcome to Cloudy</h1>
      <p className="pb-5">Weather forecast for Bulgaria</p>
      <SearchBox onSearch={handleSearch} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isLoading && (
          <div className="flex flex-col items-center gap-3">
            <img
              src="/cloudy.gif"
              alt="Loading"
              className="h-20 w-20"
            />
            <p className="text-black">Loading...</p>
          </div>
        )}
          {!isLoading && error && <p className="text-red-900">{error}</p>}

          {!isLoading && !error && weather && (
            <div className="text-black">
              <p className="font-bold text-lg">City: {weather.city}</p>
              <p>Temperature: {weather.temperature}°C</p>
            </div>
          )}
      </Modal>


    </header>
  );
}



export default Header;
