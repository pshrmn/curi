import cache from "./cache";

const MOVIES = [
  {
    id: "the_river",
    title: "The River",
    rating: 82
  },
  {
    id: "superhero_film",
    title: "Superhero Film",
    rating: 53
  },
  {
    id: "something_about_someone",
    title: "Something About Someone",
    rating: 38
  },
  {
    id: "indie_dramedy",
    title: "Indie Dramedy",
    rating: 87
  }
];

let latency = 500;

export const delay = value => {
  if (value !== undefined) {
    latency = value;
  }
  return latency;
};

export const movies = () => Promise.resolve(MOVIES);

export const movie = id => {
  let cached = cache.get(id);
  if (cached) {
    return cached;
  }
  // cache the promise, not the data, so that
  // re-navigation doesn't trigger a new request
  // while an old request is running
  const loader = new Promise((resolve, reject) => {
    const movie = MOVIES.find(m => m.id === id);
    if (movie) {
      // artificial delay
      setTimeout(() => {
        resolve(movie);
      }, latency);
      return;
    }
    reject("No movie found");
  });
  cache.set(id, loader);
  return loader;
};
