import React from "react";
import ReactDOM from "react-dom";
import Browser from "@hickory/browser";
import curi from "@curi/router";
import { CuriProvider } from "@curi/react";
import ancestors from "@curi/route-ancestors";

import routes from "./routes";

/*
 * A simple router interaction that will enable adding a dynamic title
 * to routes, which can be useful for creating links. This
 * relies on the user adding a "title" property to their routes,
 * which is a function that receives parameters and returns
 * a string. This is most likely route params, but you can pass
 * an object containing any values that you want.
 */
function titleText() {
  let routes = {};
  return {
    name: "title",
    register: route => {
      let { name, extra } = route;
      routes[name] = extra && extra.title;
    },
    get: (name, params) => {
      const titleFn = routes[name];
      return titleFn ? titleFn(params) : name;
    },
    reset: () => {
      routes = {};
    }
  };
}

const history = Browser();
const router = curi(history, routes, {
  route: [ancestors(), titleText()]
});
const root = document.getElementById("root");

ReactDOM.render(
  <CuriProvider router={router}>
    {({ response, router }) => {
      const { body: Body, data } = response;
      return <Body response={response} router={router} />;
    }}
  </CuriProvider>,
  document.getElementById("root")
);
