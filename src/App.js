import { useCallback, useState } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { fetchMovies } from './data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import './app.scss'
import TrailerModal from './components/TrailerModal'

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [videoKey, setVideoKey] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const searchQuery = searchParams.get('search')
  const { movies } = useSelector((state) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();

  const closeModal = () => setOpen(false)

  const getSearchResults = (query) => {
    const apiUrl = query !== '' 
      ? `${ENDPOINT_SEARCH}&query=${query}` 
      : ENDPOINT_DISCOVER;
    dispatch(fetchMovies({ apiUrl, page: 1 }));
    setSearchParams(createSearchParams({ search: query }));
  }
  
  const searchMovies = (query) => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    getSearchResults(query)
  }

  const getMovies = useCallback(async (page) => {
    const apiUrl = !searchQuery 
      ? `${ENDPOINT_DISCOVER}&page=${page}` 
      : `${ENDPOINT_SEARCH}&query=${searchQuery}&page=${page}`;
      
    try {
     await dispatch(fetchMovies({ apiUrl, page })).unwrap();
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  }, [searchQuery, dispatch]);

  const viewTrailer = (movie) => {
    getMovie(movie.id)
    setOpen(true)
  }

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`
    try {
      setVideoKey(null)
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Network response failer');
      }

      const videoData = await response.json();
      if (videoData.videos && videoData.videos.results.length) {
        const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
        setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
      }
    } catch (error) {
      console.error('Failed to fetch movie data:', error);
    }
  }
  
  return (
    <div className="App">
        <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />

        <div className="container">
            {isOpen && <TrailerModal isOpen={isOpen} closeModal={closeModal} videoKey={videoKey}/>}

            <Routes>
                <Route 
                    path="/" 
                    element={
                      <Movies 
                            movies={movies} 
                            viewTrailer={viewTrailer} 
                            closeCard={closeModal}
                            getMovies={getMovies}
                        />                   
                    } 
                />
                <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
                <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
                <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
            </Routes>
        </div>
    </div>
)
}

export default App
