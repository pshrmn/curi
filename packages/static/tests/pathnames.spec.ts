import "jest";

// resolved by jest
import { pathnames } from "@curi/static";

// types
import { Emitted } from "@curi/router";

describe("pathnames()", () => {
  it("returns an array of pathname strings from the given routes/page descriptors", () => {
    const routes = [
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
    ];
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

  it("calls routerOptions function to get options for a router", () => {
    const routes = [
      {
        name: "Home",
        path: "",
        response() {
          return { body: "Home" };
        }
      }
    ];
    const pages = [{ name: "Home" }];
    const routerOptions = jest.fn();
    pathnames({
      routes,
      pages,
      routerOptions
    });
    expect(routerOptions.mock.calls.length).toBe(1);
  });
});
