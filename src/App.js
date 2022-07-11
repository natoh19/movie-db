import React, {useEffect, useState} from 'react';
import './App.css';

import SearchBar from './components/SearchBar';
import useDebounce from './components/useDebounce';
import Pagination from './components/Pagination';
import Movies from './components/Movies';

const API_SEARCH_EXAMPLE = `https://api.themoviedb.org/3/movie/popular?api_key=d4b11212772b1939cf5b0072fae2d28a&language=en-US&page=1&adult=false`

function App() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [moviesPerPage] = useState(8)

    const paginAte = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const fetchMovies = async (value) => {
      try {
          const uri = value ? `https://api.themoviedb.org/3/search/movie?api_key=a99cc60fc2b34dbb18cb806b8a88ed14&language=en&adult=false&query=${value}` : API_SEARCH_EXAMPLE;
          const result = await fetch(uri)
          if (!result.ok) {
              console.log("Error could not be found")
          } else {
              const response = await result.json()
              setMovies(response.results)
              setLoading(false)
          }
      } catch (err) {
          console.log(err)
      }
  }

    useEffect(() => {
      if (debouncedSearchTerm) {
        setLoading(true)
        fetchMovies(debouncedSearchTerm)
      } else {
        fetchMovies()
      }
    }, [searchTerm, debouncedSearchTerm])

    const handleUserInput = (value) => {
      setSearchTerm(value)
    }

    const indexOfLastMovie = (currentPage * moviesPerPage);
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie)

    return (
        <div className="container">
            <SearchBar handleSearch={handleUserInput}/>
            <Movies movies={currentMovies}
                loading={loading}/>
            <Pagination moviesPerPage={moviesPerPage}
                totalMovies={
                    movies.length
                }
                paginAte={paginAte}/>
        </div>
    );
}

export default App;
