import InfiniteArticleScroll from "./components/InfiniteArticleScroll";

import generator from "./generator";

export default [
  {
    name: "Home",
    path: "",
    response() {
      return {
        redirectTo: {
          name: "Article",
          params: {
            id: generator().id
          }
        }
      };
    }
  },
  {
    name: "Article",
    path: "article/:id",
    response() {
      return {
        body: InfiniteArticleScroll
      };
    }
  }
];
