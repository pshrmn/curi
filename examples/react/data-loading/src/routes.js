import fakeAPI from "./fakeAPI";

import Home from "./components/Home";
import Album from "./components/Album";
import NotFound from "./components/NotFound";

export default [
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
    response({ error, resolved }) {
      const modifiers = {
        body: Album
      };
      if (error) {
        modifiers.error = error;
      } else {
        modifiers.data = resolved.every;
      }
      return modifiers;
    },
    on: {
      // the fakeAPI caches results based on id
      every: ({ params }) => fakeAPI(params.id)
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
];
