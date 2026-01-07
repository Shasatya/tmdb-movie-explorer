# TMDB Movie Explorer

A full-stack movie browsing app built with Next.js 16, MongoDB, and Redux. Browse movies, manage favorites, and explore the TMDB catalog with a clean, modern interface.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.11-764ABC?style=flat-square&logo=redux)

---

## Features

- **JWT Authentication** - Secure login/signup with HTTP-only cookies
- **Favorites System** - Save and manage your favorite movies
- **TMDB Integration** - Browse thousands of movies from The Movie Database
- **Theme Support** - Light and dark mode with persistence
- **Responsive Design** - Works on all devices
- **Redux State Management** - Clean, predictable state updates

---

## Tech Stack

**Frontend:** Next.js 16, React 19, Redux Toolkit, Tailwind CSS  
**Backend:** Next.js API Routes, MongoDB, Mongoose  
**Auth:** JWT with HTTP-only cookies  
**API:** TMDB API v3

---

## Project Structure

```
src/
├── app/
│   ├── api/             # API endpoints
│   │   ├── auth/           # Login, signup, logout
│   │   ├── user/           # User profile
│   │   ├── favourites/     # Favorites CRUD
│   │   └── genres/         # Genre data
│   ├── profile/            # User profile page
│   ├── admin/              # Admin dashboard
│   └── layout.jsx          # Root layout
├── components/          # React components
├── lib/                 # Utilities
│   ├── db.js               # MongoDB connection
│   ├── auth.js             # Auth helpers
│   └── tmdbFetch.js        # TMDB API wrapper
├── models/              # Mongoose models
├── store/               # Redux store
└── middleware.js        # Route protection
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB (local or Atlas)
- TMDB API key from [themoviedb.org](https://www.themoviedb.org/settings/api)

### Installation

1. Clone the repo

   ```bash
   git clone https://github.com/Shasatya/tmdb-movie-explorer.git
   cd tmdb-movie-explorer
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables - create `.env.local`:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   TMDB_API_KEY=your_tmdb_api_key
   TMDB_API_URL=https://api.themoviedb.org/3
   NEXT_PUBLIC_TMDB_IMAGE_BASE=https://image.tmdb.org/t/p
   NODE_ENV=development
   ```

4. Run the dev server

   ```bash
   npm run dev
   ```

5. Open [http://localhost:4000](http://localhost:4000)

---

## Environment Variables

| Variable                      | Description                          | Required |
| ----------------------------- | ------------------------------------ | -------- |
| `MONGODB_URI`                 | MongoDB connection string            | Yes      |
| `JWT_SECRET`                  | Secret for JWT signing               | Yes      |
| `TMDB_API_KEY`                | Your TMDB API key                    | Yes      |
| `TMDB_API_URL`                | TMDB API base URL                    | Yes      |
| `NEXT_PUBLIC_TMDB_IMAGE_BASE` | TMDB image CDN URL                   | Yes      |
| `NODE_ENV`                    | Environment (development/production) | Yes      |

---

## API Endpoints

### Auth

- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Sign in
- `POST /api/auth/logout` - Sign out

### User

- `GET /api/user/profile` - Get profile
- `PUT /api/user/profile` - Update profile

### Favorites

- `GET /api/favourites` - Get favorites list
- `POST /api/favourites` - Add movie to favorites
- `DELETE /api/favourites/:id` - Remove from favorites

### Movies

- `GET /api/genres` - Get all genres

---

## Roadmap

- [ ] Infinite scroll for movie lists
- [ ] Movie reviews and ratings
- [ ] Watchlist feature
- [ ] Email verification
- [ ] Social login (Google, GitHub)

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

1. Fork the repo
2. Create your branch (`git checkout -b feature/cool-feature`)
3. Commit your changes (`git commit -m 'Add cool feature'`)
4. Push to the branch (`git push origin feature/cool-feature`)
5. Open a Pull Request

---

## License

MIT License - see [LICENSE](LICENSE) file

---

## Author

**Satyam Sharma**

[![GitHub](https://img.shields.io/badge/GitHub-Shasatya-100000?style=flat-square&logo=github)](https://github.com/Shasatya)

---

## Acknowledgments

Thanks to [TMDB](https://www.themoviedb.org/) for the free movie API

---

**Star this repo if you found it helpful!**
