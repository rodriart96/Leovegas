export const ENDPOINT = 'https://api.themoviedb.org/3';
export const ENDPOINT_DISCOVER = ENDPOINT+'/discover/movie?api_key='+process.env.REACT_APP_API_KEY+'&sort_by=vote_count.desc';
export const ENDPOINT_SEARCH = ENDPOINT+'/search/movie?api_key='+process.env.REACT_APP_API_KEY;
export const ENDPOINT_MOVIE = ENDPOINT+'/movie/507086?api_key='+process.env.REACT_APP_API_KEY+'&append_to_response=videos';