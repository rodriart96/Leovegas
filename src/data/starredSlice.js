import { createSlice } from '@reduxjs/toolkit';

const starredSlice = createSlice({
  name: 'starred',
  initialState: {
    starredMovies: []
  },
  reducers: {
    starMovie: (state, action) => {
      // Check if the movie is already starred
      const movieAlreadyStarred = state.starredMovies.some(movie => movie.id === action.payload.id);

      // If the movie is not already starred, add it
      if (!movieAlreadyStarred) {
        state.starredMovies = [action.payload, ...state.starredMovies];
      }
    },
    unstarMovie: (state, action) => {
      const indexOfId = state.starredMovies.findIndex(movie => movie.id === action.payload.id);
      state.starredMovies.splice(indexOfId, 1);
    },
    clearAllStarred: (state) => {
      state.starredMovies = [];
    },
  },
});

export default starredSlice;
