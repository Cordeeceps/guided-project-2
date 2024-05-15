import React, { useState, useEffect } from 'react';
import '..components/App.css';

const Index = () => {
  const [characters, setCharacters] = useState([]);
  const [matchingCharacters, setMatchingCharacters] = useState([]);

  useEffect(() => {
    getCharacters();
  }, []);

  const getCharacters = async () => {
    const url = 'https://swapi2.azurewebsites.net/api/characters'; //change to http://localhost:3000/swapi/characters for MongoDB 
    try {
      const fetchedCharacters = await fetch(url).then(res => res.json());
      setCharacters(fetchedCharacters);
    } catch (ex) {
      console.error("Error reading characters.", ex.message);
    }
  }

  const filterCharacters = (event) => {
    const searchString = event.target.value;
    const re = new RegExp(searchString, "i");
    const filteredCharacters = characters.filter(character => re.test(character.name));
    setMatchingCharacters(filteredCharacters);
  }

  const goToCharacterPage = (id) => {
    window.location = `/character.html?id=${id}`;
  }

  return (
    <div>
      <h1>Star Wars Universe Lookup</h1>
      <label htmlFor="searchString"><h2>Who are you looking for?</h2></label>
      <input id="searchString" onInput={filterCharacters} autoComplete="off" />
      <section id="charactersList">
        {matchingCharacters.map(character => (
          <div key={character.id} onClick={() => goToCharacterPage(character.id)}>
            {character.name}
          </div>
        ))}
      </section>
    </div>
  );
}

export default Index;
