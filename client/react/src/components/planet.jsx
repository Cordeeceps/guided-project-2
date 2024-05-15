import React, { useState, useEffect } from 'react';
import './App.css';

const Planet = () => {
  // State variables to hold planet data
  const [planet, setPlanet] = useState(null);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    // Function to fetch planet data when component mounts
    const getPlanetData = async () => {
      try {
        // Fetch planet data from API
        const planetId = new URLSearchParams(window.location.search).get('id');
        const planetData = await fetchPlanet(planetId);
        // Fetch films associated with the planet
        const planetFilms = await fetchFilms(planetData);
        // Update state with planet data and films
        setPlanet(planetData);
        setFilms(planetFilms);
      } catch (error) {
        console.error("Error fetching planet data:", error);
      }
    };
    getPlanetData();
  }, []);

  // Function to fetch planet data from the API
  const fetchPlanet = async (id) => {
    const response = await fetch(`https://swapi2.azurewebsites.net/api/planets/${id}`);
    const data = await response.json();
    return data;
  };

  // Function to fetch films associated with the planet
  const fetchFilms = async (planet) => {
    if (!planet) return [];
    const filmRequests = planet.films.map(filmUrl => fetch(filmUrl).then(res => res.json()));
    const filmData = await Promise.all(filmRequests);
    return filmData;
  };

  // JSX to render planet information
  return (
    <main>
      <h1>{planet?.name}</h1>
      <section id="generalInfo">
        <p>Climate: <span>{planet?.climate}</span></p>
        <p>Surface Water: <span>{planet?.surface_water}</span></p>
        <p>Diameter: <span>{planet?.diameter}</span></p>
        <p>Rotation Period: <span>{planet?.rotation_period}</span></p>
        <p>Terrain: <span>{planet?.terrain}</span></p>
        <p>Gravity: <span>{planet?.gravity}</span></p>
        <p>Orbital Period: <span>{planet?.orbital_period}</span></p>
        <p>Population: <span>{planet?.population}</span></p>
      </section>
      <section id="films">
        <h2>Films featuring this planet</h2>
        <ul>
          {films.map(film => (
            <li key={film.title}>{film.title}</li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Planet;
