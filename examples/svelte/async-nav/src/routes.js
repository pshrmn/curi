import { prepareRoutes } from "@curi/router";
import { preferDefault } from "@curi/helpers";

import { movies, movie } from "./api";

export default prepareRoutes([
  {
    name: "Home",
    path: "",
    resolve: {
      body: () =>
        import(/* webpackChunkName: "Home" */ "./pages/Home.html").then(
          preferDefault
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
        import(/* webpackChunkName: "Movie" */ "./pages/Movie.html").then(
          preferDefault
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
        import(/* webpackChunkName: "NotFound" */ "./pages/NotFound.html").then(
          preferDefault
        )
    },
    response({ resolved }) {
      return {
        body: resolved.body
      };
    }
  }
]);
