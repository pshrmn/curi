import NotFound from "./NotFound";

export default {
  name: "Not Found",
  path: "(.*)",
  respond: () => {
    return {
      body: NotFound
    };
  }
};
