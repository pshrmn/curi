import { prepareRoutes } from "@curi/router";

import { movies as MOVIES, movie as MOVIE } from "./api";

export default prepareRoutes({
  routes: [
    {
      name: "Home",
      path: "",
      resolve() {
        const body = import(/* webpackChunkName: "Home" */ "./pages/Home").then(
          module => module.default
        );
        const movies = MOVIES();
        return Promise.all([body, movies]);
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
      name: "Movie",
      path: "movie/:id",
      resolve({ params }) {
        const body = import(
          /* webpackChunkName: "Movie" */ "./pages/Movie"
        ).then(module => module.default);
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
        return import(
          /* webpackChunkName: "NotFound" */ "./pages/NotFound"
        ).then(module => module.default);
      },
      respond({ resolved }) {
        return {
          body: resolved
        };
      }
    }
  ]
});
