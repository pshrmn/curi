import { movies, movie } from "./api";

export default [
  {
    name: "Home",
    path: "",
    on: {
      initial: () =>
        Promise.all([
          import("./pages/Home").then(module => module.default),
          movies() /* the movies don't change */
        ])
    },
    response({ resolved }) {
      const [body, data] = resolved.initial;
      return {
        body,
        data
      };
    }
  },
  {
    name: "Movie",
    path: "movie/:id",
    on: {
      initial: () => import("./pages/Movie").then(module => module.default),
      every: ({ params }) => movie(params.id)
    },
    response({ resolved }) {
      const modifiers = {
        body: resolved.initial
      };
      if (resolved.error) {
        modifiers.error = resolved.error;
      } else {
        modifiers.data = resolved.every;
      }
      return modifiers;
    }
  },
  {
    name: "Not Found",
    path: "(.*)",
    on: {
      initial: () => import("./pages/NotFound").then(module => module.default)
    },
    response({ resolved }) {
      return {
        body: resolved.initial
      };
    }
  }
];
