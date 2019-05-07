import { prepareRoutes } from "@curi/router";
import { preferDefault } from "@curi/helpers";

import { movies as MOVIES, movie as MOVIE } from "./api";

export default prepareRoutes([
  {
    name: "Home",
    path: "",
    resolve() {
      const body = import(/* webpackChunkName: "Home" */ "./pages/Home").then(
        preferDefault
      );
      const movies = MOVIES();
      return Promise.all([body, movies]);
    },
    respond({ resolved, error }) {
      console.log({ resolved, error });
      const [body, data] = resolved;
      return { body, data };
    }
  },
  {
    name: "Movie",
    path: "movie/:id",
    resolve({ params }) {
      const body = import(/* webpackChunkName: "Movie" */ "./pages/Movie").then(
        module => module.default
      );
      const movie = MOVIE(params.id).then(
        movie => ({ error: false, movie }),
        e => ({ error: true })
      );
      return Promise.all([body, movie]);
    },
    respond({ resolved }) {
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
      return import(/* webpackChunkName: "NotFound" */ "./pages/NotFound").then(
        preferDefault
      );
    },
    respond({ resolved }) {
      return {
        body: resolved
      };
    }
  }
]);
