import Home from "./Home";

export default {
  name: "Home",
  path: "",
  response: () => {
    return {
      body: Home,
      title: "Curi"
    };
  }
};
