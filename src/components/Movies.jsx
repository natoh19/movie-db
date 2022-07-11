import React from 'react'
import MovieContainer from './MovieContainer';
import '../App.css';

const Movies = ({movies, loading}) => {
    if (loading) {
        return <h2>Loading..</h2>
    }

    return (
        <div className="movie-grid">
            {
            movies.length ? movies.map((movie) => <MovieContainer key={
                    movie.id
                }
                {...movie}/>) : "No Results Found"
        } </div>
    )
}

export default Movies;
