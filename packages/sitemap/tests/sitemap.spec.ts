import "jest";
import sitemap from "../src/sitemap";

describe("sitemap", () => {
  it("returns a sitemap string", () => {
    const routes = [
      { name: "Home", path: "" },
      { name: "About", path: "about" }
    ];
    const output = sitemap(routes, "https://www.example.com", [
      "Home",
      "About"
    ]);
    expect(output).toContain("https://www.example.com/");
    expect(output).toContain("https://www.example.com/about");
  });

  it("uses route params", () => {
    const routes = [
      { name: "Home", path: "" },
      { name: "Product", path: "p/:id" }
    ];
    const output = sitemap(routes, "https://www.example.com", [
      "Home",
      {
        name: "Product",
        params: [{ id: 1 }, { id: 2 }, { id: 3 }]
      }
    ]);
    expect(output).toContain("https://www.example.com/");
    expect(output).toContain("https://www.example.com/p/1");
    expect(output).toContain("https://www.example.com/p/2");
    expect(output).toContain("https://www.example.com/p/3");
  });

  it("works with nested routes", () => {
    const routes = [
      { name: "Home", path: "" },
      {
        name: "Products",
        path: "p",
        children: [{ name: "Product", path: ":id" }]
      }
    ];
    const output = sitemap(routes, "https://www.example.com", [
      "Home",
      "Products",
      {
        name: "Product",
        params: [{ id: 1 }, { id: 2 }, { id: 3 }]
      }
    ]);
    expect(output).toContain("https://www.example.com/");
    expect(output).toContain("https://www.example.com/p");
    expect(output).toContain("https://www.example.com/p/1");
    expect(output).toContain("https://www.example.com/p/2");
    expect(output).toContain("https://www.example.com/p/3");
  });
});
