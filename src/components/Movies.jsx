import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Movie from './Movie'
import '../styles/movies.scss'

const Movies = ({ movies, viewTrailer, closeCard, getMovies, hasMoreMovies }) => {
    return (
        <InfiniteScroll
            dataLength={movies.movies.length} // This is the length of the movies array
            next={getMovies} // Function to fetch more movies
            hasMore={hasMoreMovies} // Boolean indicating if more movies are available
            loader={<div className="loading">Loading more movies...</div>} // What to show while loading
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div className='movies-flex-container' data-testid="movies">
                {movies.movies.results?.map((movie) => (
                    <Movie 
                        movie={movie} 
                        key={movie.id}
                        viewTrailer={viewTrailer}
                        closeCard={closeCard}
                    />
                ))}
            </div>
        </InfiniteScroll>
    )
}

export default Movies
