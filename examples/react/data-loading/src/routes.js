import { prepareRoutes } from "@curi/router";

import fakeAPI from "./fakeAPI";

import Home from "./components/Home";
import Album from "./components/Album";
import NotFound from "./components/NotFound";

export default prepareRoutes([
  {
    name: "Home",
    path: "",
    respond() {
      return {
        body: Home
      };
    }
  },
  {
    name: "Album",
    path: "a/:id",
    resolve({ params }) {
      // the fakeAPI caches results based on id
      return fakeAPI(params.id);
    },
    respond({ error, resolved }) {
      const resp = {
        body: Album
      };
      if (error) {
        resp.error = error;
      } else {
        resp.data = resolved;
      }
      return resp;
    }
  },
  {
    name: "Not Found",
    path: "(.*)",
    respond() {
      return {
        body: NotFound
      };
    }
  }
]);
