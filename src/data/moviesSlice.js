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
        builder
        .addCase(fetchMovies.fulfilled, (state, action) => {
            const { results, page, total_pages } = action.payload;
            const newMovies = results || [];

            const existingMovieIds = new Set(state.movies.map(movie => movie.id));
            const isDuplicate = newMovies.some(movie => existingMovieIds.has(movie.id));

            if (isDuplicate) {
                state.errorMessage = 'Some movies are duplicates. Please try a different search or page.';
            } else {
                state.errorMessage = null;
                if (page === 1) {
                    state.movies = newMovies;
                } else {
                    state.movies.push(...newMovies);
                }
            }
            state.currentPage = page;
            state.total_pages = total_pages;
            state.fetchStatus = 'success';
        })
        .addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
            state.errorMessage = null;
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
            state.errorMessage = 'Failed to fetch movies. Please try again later.';
        })
    }
})

export default moviesSlice
