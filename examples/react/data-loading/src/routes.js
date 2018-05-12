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
    response({ resolved }) {
      const modifiers = {
        body: Album
      };
      if (resolved.error) {
        modifiers.error = resolved.error;
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
