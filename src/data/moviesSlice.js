import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchMovies = createAsyncThunk('fetchMovies', async ({apiUrl, page}) => {
    try {
        const response = await fetch(apiUrl)
        return response.json()
    } catch (error) {
        console.error(error);
    }
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: { 
        movies: [],
        fetchStatus: '',
        currentPage: 1
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload
            state.fetchStatus = 'success'
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export default moviesSlice
