import NotFound from "./NotFound";

export default {
  name: "Not Found",
  path: "(.*)",
  response: () => {
    return {
      body: NotFound
    };
  }
};
