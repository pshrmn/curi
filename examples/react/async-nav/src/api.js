import cache from "./cache";

let MOVIES = [
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

let latency = 1500;

export let delay = value => {
  if (value !== undefined) {
    latency = value;
  }
  return latency;
};

export let movies = () => Promise.resolve(MOVIES);

export let movie = id => {
  let cached = cache.get(id);
  if (cached) {
    return cached;
  }
  // cache the promise, not the data, so that
  // re-navigation doesn't trigger a new request
  // while an old request is running
  let loader = new Promise((resolve, reject) => {
    let movie = MOVIES.find(m => m.id === id);
    if (movie) {
      // artificial delay
      setTimeout(() => {
        resolve(movie);
      }, latency);
      return;
    }
    reject("Movie not found");
  });
  cache.set(id, loader);
  return loader;
};
