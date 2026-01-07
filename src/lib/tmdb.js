export async function tmdbFetch(path, params = {}) {
  const cleanBase = process.env.TMDB_API_URL?.replace(/\/$/, "");
  const cleanPath = path.replace(/^\//, "");
  const baseUrl = `${cleanBase}/${cleanPath}`;

  const url = new URL(baseUrl);
  url.searchParams.set("api_key", process.env.TMDB_API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ TMDB API error:", {
        status: res.status,
        statusText: res.statusText,
        body: errorText,
        url: url.toString(),
      });
      throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ TMDB fetch failed:", {
      path,
      params,
      url: url.toString(),
      error: error.message,
      stack: error.stack,
    });

    if (path.includes("/search/") || path.includes("/discover/")) {
      return { results: [], total_pages: 1 };
    }
    if (path.includes("/genre/")) {
      return { genres: [] };
    }

    throw error;
  }
}
