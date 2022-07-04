import React, { useEffect, useState } from 'react';
import './App.css';
import MovieContainer from './components/MovieContainer';
import SearchBar from './components/SearchBar';
const API_SEARCH_EXAMPLE = `https://api.themoviedb.org/3/movie/popular?api_key=a99cc60fc2b34dbb18cb806b8a88ed14&language=en-US&page=1&adult=false`

function App() {
  const [movies, setMovies] = useState([])

  const handleSearch = async (value) => {
    if (value) {
      fetchMovies(value)
    } else {
      fetchMovies()
      //if we do not pass a search query we call fetchMovies() without query param and get default popular movies
    }
  }

  const fetchMovies = async (value) => {
    try {
      const uri = value
        ? `https://api.themoviedb.org/3/search/movie?api_key=a99cc60fc2b34dbb18cb806b8a88ed14&language=en&adult=false&query=${value}`
        : API_SEARCH_EXAMPLE;
      const result = await fetch(uri)
      if (!result.ok) {
        console.log("Error could not be found")
      } else {
        const response = await result.json()
        setMovies(response.results)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <div className="container">
      <SearchBar handleSearch={handleSearch} />
      <div className="movie-grid">
        {movies.length ? movies.map((movie) => <MovieContainer key={movie.id} {...movie} />) : "No Results Found"}
      </div>
    </div>
  );
}

export default App;
