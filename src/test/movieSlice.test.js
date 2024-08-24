import moviesSlice, { fetchMovies } from '../data/moviesSlice';
import { moviesMock } from './movies.mocks';

describe('MovieSlice test', () => {

  it('should set loading true while action is pending', () => {
    const action = { type: fetchMovies.pending };
    const initialState = { movies: [], fetchStatus: ''};
    const resultState = moviesSlice.reducer(initialState, action);

    expect(resultState.fetchStatus).toEqual('loading');
    expect(resultState.movies).toEqual([]);
  });

  it('should return payload and set fetchStatus to success when action is fulfilled', () => {
    const action = {
      type: fetchMovies.fulfilled, 
      payload: moviesMock
    };
    const initialState = { movies: [], fetchStatus: '' };
    const resultState = moviesSlice.reducer(initialState, action);
        
    expect(resultState.fetchStatus).toEqual('success');
    expect(resultState.movies).toEqual(moviesMock);
  });

  it('should set error when action is rejected', () => {
    const action = { type: fetchMovies.rejected };
    const initialState = { movies: [], fetchStatus: '' };
    const resultState = moviesSlice.reducer(initialState, action);
        
    expect(resultState.fetchStatus).toEqual('error');
    expect(resultState.movies).toEqual([]);
  });

});