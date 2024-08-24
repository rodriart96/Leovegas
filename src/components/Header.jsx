import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../styles/header.scss';

const Header = ({ searchMovies, searchParams }) => {
  const { starredMovies } = useSelector((state) => state.starred);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(searchParams.get('search') || '');
  }, [searchParams]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    searchMovies(value);
  };

  const handleClearSearch = () => {
    setInputValue('');
    searchMovies('');
  };

  return (
    <header>
      <Link to="/" data-testid="home" onClick={handleClearSearch}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          type="search"
          data-testid="search-movies"
          value={inputValue}
          onChange={handleInputChange}
          className="form-control rounded"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
        />
      </div>
    </header>
  );
};

export default Header;
