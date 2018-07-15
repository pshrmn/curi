import NotFound from "./components/NotFound"; // not splitting this

export default [
  {
    name: "Home",
    path: "",
    match: {
      body: () => import("./components/Home.js").then(module => module.default)
    },
    response: ({ resolved }) => {
      return {
        body: resolved.body
      };
    }
  },
  {
    name: "Contact",
    path: "contact",
    match: {
      body: () =>
        import("./components/Contact.js").then(module => module.default)
    },
    response: ({ resolved }) => {
      return {
        body: resolved.body
      };
    }
  },
  {
    name: "Not Found",
    path: "(.*)",
    response: () => {
      return {
        body: NotFound
      };
    }
  }
];
