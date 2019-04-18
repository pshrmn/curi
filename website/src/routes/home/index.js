import Home from "./Home";

export default {
  name: "Home",
  path: "",
  respond: () => {
    return {
      body: Home,
      meta: {
        title: "Curi",
        description: "A JavaScript router for single-page applications"
      }
    };
  }
};
