# OJ Movies – Movie Discovery Web App

A Progressive Web App for discovering movies, TV shows, managing watchlists, and exploring award-winning titles — powered by The Movie Database (TMDB).


## The app allows users to:

Search for movies

View full movie details (rating, cast, genres, trailer)

Browse popular, top-rated, and now-playing films

Explore TV shows

Maintain a personal watchlist

View a curated awards page powered by TMDB

Enjoy fast performance with PWA support

The primary goal was to demonstrate understanding of APIs, UI design, state management, React routing, and building real-world web applications.

## Tech Stack
- Frontend Framework: React (TypeScript)
- Build Tool: Vite
- UI Styling: Tailwind CSS
- Icons: Lucide Icons
- Global State: React Context API
- API Provider: TMDB (The Movie Database)
- Hosting: Vercel
- PWA Features: Service worker ready

## Features

Project Features
- 1. Movie & TV Show Discovery

Browse:

Popular Movies

Top Rated Movies

Now Playing

Trending

Browse curated TV shows

- 2. Search Functionality

Search any movie title

Smart search with suggestions (optional)

- 3. Detailed Movie Pages

Includes:

Movie poster + banner

Trailer (YouTube)

Overview

Genres

Rating

Cast (actors)

Similar Movies

- 4. Watchlist System

Add/remove movies

Stored locally

Protected actions (requires "login")

Fully managed with WatchlistContext

- 5. Simple Authentication

Basic mock Login/Sign Up

User stored in localStorage

Required for saving to watchlist

- 6. Awards Page (Powered by TMDB)

A curated collection of award-winning films with:

Real TMDB posters

Year filtering

Featured slider

Modal popups

- 7. PWA Support

App loads fast

Responsive

Mobile-friendly

Installable (Add to Home Screen)



## What I Learned

- Working on this project helped me understand:

- How to fetch data from APIs

- How to manage state in React

- How to use React Router

- How to handle watchlists with localStorage

- How to deploy a React app online

- How to structure a real project

- How to build responsive layouts


## Deployment

The project is deployed using Vercel.

Important Deployment Notes:

vercel.json includes SPA rewrite rules to prevent 404 errors when refreshing pages.

Environment variables must be added in the Vercel dashboard.

## Live Demo

https://alx-project-nexus-git-main-kawona-ojes-projects.vercel.app/

## Acknowledgements

Thanks to ALX Africa for the project framework.

Movie data and images provided by The Movie Database (TMDB).
This product uses the TMDB API but is not endorsed or certified by TMDB.


## Conclusion

This project was a great learning experience for me.
It brought together everything I have been studying and helped me build confidence.
I hope you enjoy exploring movies using OJ Movies.