import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './utils'
import App from '../App'

it('Watch Later movies page', async () => {
    renderWithProviders(<App />)

    await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')

    // Assuming there's a movie with a title containing "Forrest Gump"
    const movieTitle = await screen.findByText(/Forrest Gump/i)
    expect(movieTitle).toBeInTheDocument()

    // Add movie to Watch Later
    const watchLaterLink = screen.getAllByTestId('watch-later')[0]
    expect(watchLaterLink).toBeInTheDocument()
    await userEvent.click(watchLaterLink)

    // Optionally, navigate to the Watch Later page and check if the movie is there
    const watchLaterNavLink = screen.getByTestId('watch-later-nav')
    await userEvent.click(watchLaterNavLink)

    const addedMovie = await screen.findByText(/Forrest Gump/i)
    expect(addedMovie).toBeInTheDocument()
})
