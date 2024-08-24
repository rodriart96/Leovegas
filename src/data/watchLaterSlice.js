import { createSlice } from "@reduxjs/toolkit"

const watchLaterSlice = createSlice({
    name: 'watch-later',
    initialState: {
        watchLaterMovies: []
    },
    reducers: {
        addToWatchLater: (state, action) => {
            // Check if the movie is already on the watchLater list
            const movieAlreadyWatchLater = state.watchLaterMovies.some(movie => movie.id === action.payload.id);

            // If the movie is not already on the watchLater list, add it
            if (!movieAlreadyWatchLater){
                state.watchLaterMovies = [action.payload, ...state.watchLaterMovies];
            }
        },
        removeFromWatchLater: (state, action) => {
            const indexOfId = state.watchLaterMovies.findIndex(movie => movie.id === action.payload.id)
            state.watchLaterMovies.splice(indexOfId, 1)
        },
        removeAllWatchLater: (state) => {
            state.watchLaterMovies = []
        },
    },
})

export default watchLaterSlice
