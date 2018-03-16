import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import { InlineJS as IJS, PrismBlock } from "../components/PrismBlocks";
import { Section } from "../components/Sections";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>
    <p>
      The cache option passed to <IJS>curi</IJS> allows you to save response
      objects. The actual caching mechanism is left up to you. It only has two
      requirements:
    </p>
    <ul>
      <li>
        It provides a <IJS>set</IJS> function which receives a response object
        as its argument.
      </li>
      <li>
        It provides a <IJS>get</IJS> function which receives a{" "}
        <IJS>location</IJS> object and an <IJS>action</IJS> string and returns a
        response object (or <IJS>null</IJS>).
      </li>
    </ul>
    <PrismBlock lang="javascript">
      {`const createSimpleCache = () => {
  const cache = {};

  return {
    get: (location, action) => {
      const { key } = location;
      return cache[key];
    },
    set: response => {
      const { key } = response.location;
      cache[key] = response;
    }
  };
}

const myCache = createSimpleCache();

const router = curi(history, routes, {
  cache: myCache
});`}
    </PrismBlock>

    <p>The above cache uses a location's key property to store values.</p>
    <p>
      Why would you want to use a cache? When the user uses the browser's
      forward/back buttons, Curi will generate a new response. This means that
      if the route has a <IJS>match.every</IJS> function, it will be re-called.
      You can mitigate this by adding a cache to that function, but you may also
      find it preferable to just re-use the existing response.
    </p>
    <p>
      This isn't built-in because it is possible that you don't actually want
      responses to be re-used. If you are caching responses, you will need to be
      aware of what to do when an authenticated user logs out. You will probably
      want to clear the cache so that they aren't still seeing content as if
      they were logged in.
    </p>
  </BaseGuide>
);
