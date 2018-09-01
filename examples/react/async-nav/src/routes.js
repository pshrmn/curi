import { movies, movie } from "./api";

export default [
  {
    name: "Home",
    path: "",
    resolve: {
      body: () =>
        import(/* webpackChunkName: "Home" */ "./pages/Home").then(
          module => module.default
        ),
      movies: () => movies()
    },
    response({ resolved }) {
      return {
        body: resolved.body,
        data: resolved.movies
      };
    }
  },
  {
    name: "Movie",
    path: "movie/:id",
    resolve: {
      body: () =>
        import(/* webpackChunkName: "Movie" */ "./pages/Movie").then(
          module => module.default
        ),
      movie: ({ params }) => movie(params.id)
    },
    response({ error, resolved }) {
      const modifiers = {
        body: resolved.body
      };
      if (error) {
        modifiers.error = error;
      } else {
        modifiers.data = resolved.movie;
      }
      return modifiers;
    }
  },
  {
    name: "Not Found",
    path: "(.*)",
    resolve: {
      body: () =>
        import(/* webpackChunkName: "NotFound" */ "./pages/NotFound").then(
          module => module.default
        )
    },
    response({ resolved }) {
      return {
        body: resolved.body
      };
    }
  }
];
