import { buildRoutes } from "@curi/router";

import fakeAPI from "./fakeAPI";

import Home from "./components/Home";
import Album from "./components/Album";
import NotFound from "./components/NotFound";

export default buildRoutes([
  {
    name: "Home",
    path: "",
    response() {
      return {
        body: Home
      };
    }
  },
  {
    name: "Album",
    path: "a/:id",
    resolve: {
      // the fakeAPI caches results based on id
      data: ({ params }) => fakeAPI(params.id)
    },
    response({ error, resolved }) {
      const modifiers = {
        body: Album
      };
      if (error) {
        modifiers.error = error;
      } else {
        modifiers.data = resolved.data;
      }
      return modifiers;
    }
  },
  {
    name: "Not Found",
    path: "(.*)",
    response() {
      return {
        body: NotFound
      };
    }
  }
]);
