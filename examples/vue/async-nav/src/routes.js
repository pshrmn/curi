import { movies, movie } from "./api";

export default [
  {
    name: "Home",
    path: "",
    match: {
      body: () =>
        import("./pages/Home").then(
          module => (module.default ? module.default : module)
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
    match: {
      body: () =>
        import("./pages/Movie").then(
          module => (module.default ? module.default : module)
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
    match: {
      body: () =>
        import("./pages/NotFound").then(
          module => (module.default ? module.default : module)
        )
    },
    response({ resolved }) {
      return {
        body: resolved.body
      };
    }
  }
];
