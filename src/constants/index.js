export const themes = [
  { name: "Light", value: "light" },
  { name: "Dark", value: "dark" },
];

export const themeVariants = [
  { name: "Red", value: "cinema" },
  { name: "Purple", value: "purple" },
  { name: "Blue", value: "ocean" },
];

export const sortingOptions = [
  { value: "popularity.desc", label: "Popularity desc" },
  { value: "popularity.asc", label: "Popularity asc" },
  { value: "release_date.desc", label: "Release date desc" },
  { value: "release_date.asc", label: "Release date asc" },
  { value: "vote_average.desc", label: "Rating desc" },
  { value: "vote_average.asc", label: "Rating asc" },
];

export const yearsOptions = Array.from({ length: 126 }, (_, i) => {
  const year = 2025 - i;
  return { value: String(year), label: String(year) };
});
