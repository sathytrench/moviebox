import React, {useState} from 'react';
import axios from 'axios';
import '../../secrets'

export function Search() {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]); 

    async function handleSubmit(e) {
        e.preventDefault();
        const {data} = await axios.get(`https://www.omdbapi.com/?s=${term}&apikey=${process.env.OMDB_TOKEN}`);
        setResults(data.Search);
        e.target[0].value = '';
    }

    return (
      <div id="search-container">
        <p>SEARCH</p>
        <form onSubmit={handleSubmit}>
            <label name="title">Nominate your top 5 films:</label>
            <input type="text" id="title" name="title" placeholder="film title..." 
            value={term} onChange={(e)=>setTerm(e.target.value)}>
            </input>
            <input type="submit" value="Search"></input>
        </form> 
        <div id="results-container">
            {results && 
            results.map((result) => (
                <div>
                    <div>{result.Title}</div>
                    <div>{result.Year}</div>
                    <img src={result.Poster} alt="Film poster"/>
                </div>
            ))}
        </div>
      </div>
    );
  }