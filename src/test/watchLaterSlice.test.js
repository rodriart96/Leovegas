import watchLaterSlice from '../data/watchLaterSlice'
import { moviesMock } from './movies.mocks'

describe('watchLaterSlice test', () => {

    const state = { watchLaterMovies: [] }

    it('should set initial state', () => {
        const initialState = state
        const action = { type: '' }
        const result = watchLaterSlice.reducer(initialState, action)
        expect(result).toEqual({ watchLaterMovies: []})
    })    

    it('should add movie to watch later', () => {
        const initialState = state
        const action = watchLaterSlice.actions.addToWatchLater(moviesMock[0])
        const result = watchLaterSlice.reducer(initialState, action)
        expect(result.watchLaterMovies[0]).toBe(moviesMock[0])
    })

    it('should remove movie from watch later', () => {
        const initialState = { watchLaterMovies: moviesMock }
        const action = watchLaterSlice.actions.removeFromWatchLater(moviesMock[0])
        const result = watchLaterSlice.reducer(initialState, action)
        expect(result.watchLaterMovies).not.toContain(moviesMock[0])
    })

    it('should remove all movies', () => {
        const initialState = { watchLaterMovies: moviesMock }
        const action = watchLaterSlice.actions.removeAllWatchLater()
        const result = watchLaterSlice.reducer(initialState, action)
        expect(result.watchLaterMovies).toHaveLength(0)
    })
})