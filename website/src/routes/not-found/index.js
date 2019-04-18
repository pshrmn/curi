import NotFound from "./NotFound";

export default {
  name: "Not Found",
  path: "(.*)",
  respond: () => {
    return {
      body: NotFound,
      meta: {
        title: "404",
        description: "Requested content not found"
      }
    };
  }
};
