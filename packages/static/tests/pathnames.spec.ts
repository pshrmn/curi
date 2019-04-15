import "jest";
import { prepareRoutes } from "@curi/router";

import { pathnames } from "@curi/static";

describe("pathnames()", () => {
  it("returns an array of pathname strings from the given routes/page descriptors", () => {
    const routes = prepareRoutes({
      routes: [
        {
          name: "Home",
          path: ""
        },
        {
          name: "About",
          path: "about"
        },
        {
          name: "Album",
          path: "album/:albumID",
          children: [
            {
              name: "Song",
              path: ":songID"
            }
          ]
        }
      ]
    });
    const pages = [
      { name: "Home" },
      { name: "About" },
      { name: "Album", params: { albumID: 0 } },
      { name: "Album", params: { albumID: 1 } },
      { name: "Album", params: { albumID: 2 } },
      { name: "Album", params: { albumID: 3 } },
      { name: "Album", params: { albumID: 4 } },
      { name: "Song", params: { albumID: 0, songID: 5 } },
      { name: "Song", params: { albumID: 1, songID: 6 } },
      { name: "Song", params: { albumID: 2, songID: 7 } }
    ];
    const urls = pathnames({ routes, pages });
    expect(urls).toEqual(
      expect.arrayContaining([
        "/",
        "/about",
        "/album/0",
        "/album/1",
        "/album/2",
        "/album/3",
        "/album/4",
        "/album/0/5",
        "/album/1/6",
        "/album/2/7"
      ])
    );
  });
});
