import { prepareRoutes } from "@curi/router";
import { preferDefault } from "@curi/helpers";

import { movies as MOVIES, movie as MOVIE } from "./api";

export default prepareRoutes([
  {
    name: "Home",
    path: "",
    resolve() {
      const body = import(/* webpackChunkName: "Home" */ "./pages/Home.html")
        .then(preferDefault);
      const movies = MOVIES();
      return Promise.all([ body, movies ]);
    },
    response({ resolved }) {
      const [body, data] = resolved;
      return { body, data };
    }
  },
  {
    name: "Movie",
    path: "movie/:id",
    resolve({ params }) {
      const body = import(/* webpackChunkName: "Movie" */ "./pages/Movie.html")
        .then(module => module.default);
      const movie = MOVIE(params.id)
        .then(
          movie => ({ error: false, movie }),
          e => ({ error: true })
        );
      return Promise.all([ body, movie ]);
    },
    response({ resolved }) {
      const [body, data] = resolved;
      return {
        body,
        data
      };
    }
  },
  {
    name: "Not Found",
    path: "(.*)",
    resolve() {
      return import(/* webpackChunkName: "NotFound" */ "./pages/NotFound.html")
        .then(preferDefault);
    },
    response({ resolved }) {
      return {
        body: resolved
      };
    }
  }
]);
