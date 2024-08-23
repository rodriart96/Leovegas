import { useCallback, useEffect, useState } from 'react'
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

  const state = useSelector((state) => state)
  const { movies } = state
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const [videoKey, setVideoKey] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation();

  const closeModal = () => setOpen(false)

  const getSearchResults = (query) => {
    if (query !== '') {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + query))
      setSearchParams(createSearchParams({ search: query }))
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER))
      setSearchParams()
    }
  }

  const searchMovies = (query) => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    getSearchResults(query)
  }

  const getMovies = useCallback(() => {
    if (!searchQuery) {
      dispatch(fetchMovies(ENDPOINT_DISCOVER))
    } else {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + searchQuery))
    }
  }, [searchQuery, dispatch])

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

  useEffect(() => {
    getMovies()
  }, [getMovies])

  return (
    <div className="App">
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />

      <div className="container">
        {isOpen &&
          <TrailerModal isOpen={isOpen} closeModal={closeModal} videoKey={videoKey}/>
        }

        <Routes>
          <Route path="/" element={<Movies movies={movies} viewTrailer={viewTrailer} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
