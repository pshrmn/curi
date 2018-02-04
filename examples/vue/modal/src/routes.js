import Home from "./components/Home";
import Product from "./components/Product";
import Detail from "./components/Detail";

export default [
  {
    name: "Home",
    path: "",
    match: {
      response: ({ set }) => {
        set.body(Home);
      }
    }
  },
  {
    name: "Product",
    path: "paint/:color",
    match: {
      response: ({ set }) => {
        set.body(Product);
      }
    },
    children: [
      {
        name: "Product Detail",
        path: "detail",
        match: {
          response: ({ set }) => {
            set.body(Detail);
          }
        }
      }
    ]
  }
];
