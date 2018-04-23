import dataCache from "./dataCache";
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
      every: ({ params }) => {
        const { id } = params;
        // don't re-fetch data
        const existing = dataCache.get(id);
        return existing
          ? Promise.resolve(existing)
          : fakeAPI(id).then(data => {
              dataCache.set(id, data);
              return data;
            });
      }
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
