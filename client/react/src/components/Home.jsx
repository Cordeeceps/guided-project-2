import React from 'react';

const Home = (props) => {
    return (
        <div>
            <h1>Star Wars Universe Lookup</h1>
            <label for="searchString">Who you looking for? <span class="small">(Regular expressions are cool
                here)</span></label>
            <input id="searchString" oninput="filterCharacters()" autocomplete="off" />
        </div>
    );
}

export default Home;