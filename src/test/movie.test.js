import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './utils';
import App from '../App';

it('movies starred and saved to watch later', async () => {
  renderWithProviders(<App />);

  // Search for the movie "Forrest Gump"
  await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump');

  // Verify the movie appears in the search results
  const movieTitle = await screen.findByText(/Through the Eyes of Forrest Gump/i);
  expect(movieTitle).toBeInTheDocument();

  // Star the movie
  const starMovieLink = screen.getAllByTestId('starred-link')[0];
  await userEvent.click(starMovieLink);

  // Verify the movie is starred
  expect(await screen.findByTestId('star-fill')).toBeInTheDocument();
  expect(screen.getByTestId('unstar-link')).toBeInTheDocument();

  // Add the movie to watch later
  const watchLaterLink = screen.getAllByTestId('watch-later')[0];
  await userEvent.click(watchLaterLink);

  // Verify the movie is added to watch later
  expect(await screen.findByTestId('remove-watch-later')).toBeInTheDocument();

  // Remove the movie from watch later
  const removeWatchLaterLink = screen.getAllByTestId('remove-watch-later')[0];
  await userEvent.click(removeWatchLaterLink);

});
