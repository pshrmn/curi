import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Note
} from "../../../../../components/package/common";

export const meta = {
  title: "once",
  hash: "once"
};

export function OnceAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        <IJS>once</IJS> takes a function as its argument and returns a new
        function. The first time the returned function is called, it will call
        the function passed to it and return its result. Every call after that
        will re-use the result from the first call.
      </p>

      <p>
        The <IJS>once</IJS> function is useful for any async functions that only
        need to be called once.
      </p>

      <Note>
        <p>
          This will not work for functions whose result depends on variables
          that will change for a route (i.e. loading data based on route
          params).
        </p>
      </Note>

      <CodeBlock>
        {`import { once } from "@curi/helpers";

const cachedGetItems = once(() => api.getItems);

const routes = prepareRoutes([
  {
  name: "Menu",
  path: "menu",
  resolve() {
    // this function will be called every time the user
    // navigates to the "Menu" route
    const nonCached = api.getItems();

    // this function is only called the first time the
    // user navigates to the "Menu" route
    const cached = cachedGetItems();
    return Promise.all([nonCached, cached]);
  }
]);`}
      </CodeBlock>
    </HashSection>
  );
}
