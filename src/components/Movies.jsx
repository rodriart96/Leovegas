import React, { useEffect } from 'react';
import Movie from './Movie';
import '../styles/movies.scss';

const Movies = ({ movies, viewTrailer, closeCard, getMovies }) => {
    const hasMoreMovies = movies.total_pages > movies.currentPage;

    useEffect(() => {
        getMovies(1);
    }, [getMovies]);
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const bottomPosition = document.body.offsetHeight - 200;
            
            if (scrollPosition >= bottomPosition && hasMoreMovies) {
                getMovies(movies.currentPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasMoreMovies, getMovies, movies]);

    return (
        <>
            <div className='movies-flex-container' data-testid="movies">
                {movies.movies?.map((movie) => (
                    <Movie 
                        movie={movie} 
                        key={movie.id}
                        viewTrailer={viewTrailer}
                        closeCard={closeCard}
                    />
                ))}
            </div>
            {movies.fetchStatus === 'loading' && (
                <p className='text-center'>Loading...</p>
            )}
            {!hasMoreMovies && (
                <p className='text-center'>
                    <b>Yay! You have seen it all</b>
                </p>
            )}
        </>
    );
};

export default Movies;
