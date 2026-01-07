export const getGuestFavourites = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("favourites")) || [];
};

export const toggleGuestFavourite = (movie) => {
  const favs = getGuestFavourites();

  const exists = favs.some((fav) => fav.id === movie.id);

  const updated = exists
    ? favs.filter((fav) => fav.id !== movie.id)
    : [...favs, movie];

  localStorage.setItem("favourites", JSON.stringify(updated));
  return updated;
};

// export const toggleGuestFavourite = (movieId) => {
//   const favs = getGuestFavourites();

//   const updated = favs.includes(movieId)
//     ? favs.filter((id) => id !== movieId)
//     : [...favs, movieId];

//   localStorage.setItem("favourites", JSON.stringify(updated));
//   return updated;
// };
