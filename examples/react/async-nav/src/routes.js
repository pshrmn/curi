import { prepareRoutes } from "@curi/router";

import { movies as MOVIES, movie as MOVIE } from "./api";

export default prepareRoutes([
  {
    name: "Home",
    path: "",
    resolve() {
      let body = import(/* webpackChunkName: "Home" */ "./pages/Home").then(
        module => module.default
      );
      let movies = MOVIES();
      return Promise.all([body, movies]);
    },
    respond({ resolved }) {
      let [body, data] = resolved;
      return {
        body,
        data
      };
    }
  },
  {
    name: "Movie",
    path: "movie/:id",
    resolve({ params }) {
      let body = import(/* webpackChunkName: "Movie" */ "./pages/Movie").then(
        module => module.default
      );
      let movie = MOVIE(params.id).then(
        movie => ({ error: false, movie }),
        e => ({ error: true })
      );
      return Promise.all([body, movie]);
    },
    respond({ resolved }) {
      let [body, data] = resolved;
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
      return import(/* webpackChunkName: "NotFound" */ "./pages/NotFound").then(
        module => module.default
      );
    },
    respond({ resolved }) {
      return {
        body: resolved
      };
    }
  }
]);
