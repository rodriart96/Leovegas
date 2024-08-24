# Movieland 

React + Redux + RTK + Bootstrap application that fetches movies from [https://www.themoviedb.org/](https://www.themoviedb.org/)

Created with [Create React App](https://github.com/facebook/create-react-app).

# API Key Setup
To fetch movies from The Movie Database (TMDb), you'll need an API key. Follow these steps to obtain and configure your API key:

# 1. Sign Up for TMDb
 * Go to the The Movie Database (TMDb) website.
 * Sign up for a free account if you don’t already have one, or log in if you do.

# 2. Generate API Key
 * After logging in, go to the API section of your account settings.
 * Follow the instructions to apply for an API key. You may be asked to provide some details about your application.

# 3. Add API Key to Your Application
 * Create a .env file in the root of your project directory if it doesn't already exist.
 * You can create this file by running touch .env in your terminal.
 * Open the .env file and add the following line: 'REACT_APP_API_KEY=your_api_key_here'
 * Replace your_api_key_here with the actual API key you obtained.

# 4. Keep Your API Key Secure
 * Ensure that the .env file is listed in your .gitignore file to prevent it from being committed to version control.



## Available Scripts

In the project directory, you can run:

### `npm install`

Install all dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.