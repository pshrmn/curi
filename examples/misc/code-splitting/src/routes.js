import NotFound from "./components/NotFound"; // not splitting this

export default [
  {
    name: "Home",
    path: "",
    on: {
      initial: () =>
        import("./components/Home.js").then(module => module.default)
    },
    response: ({ resolved }) => {
      return {
        body: resolved.initial
      };
    }
  },
  {
    name: "Contact",
    path: "contact",
    on: {
      initial: () =>
        import("./components/Contact.js").then(module => module.default)
    },
    response: ({ resolved }) => {
      return {
        body: resolved.initial
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
