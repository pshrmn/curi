import React from "react";
import {
  PrismBlock,
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../components/PrismBlocks";
import { Link } from "@curi/react";
import Banner from "../components/Banner";

export default () => (
  <div>
    <Banner />
    <div className="features">
      <div className="feature">
        <h3>Frameworks</h3>

        <p>Curi provides packages to render with popular frameworks.</p>
        <ul>
          <li>
            <Link to="Package" params={{ package: "react" }}>
              React
            </Link>
          </li>
          <li>
            <Link to="Package" params={{ package: "vue" }}>
              Vue
            </Link>
          </li>
          <li>
            <Link to="Package" params={{ package: "svelte" }}>
              Svelte
            </Link>
          </li>
          <li>
            <Link to="Package" params={{ package: "react-native" }}>
              React Native
            </Link>
          </li>
        </ul>
      </div>

      <div className="feature">
        <h3>Sync or Async</h3>
        <p>
          Curi does synchronous route matching by default, but can easily{" "}
          <Link to="Guide" params={{ slug: "sync-or-async" }}>
            switch to asynchronous matching
          </Link>, which enables code-splitting and preloading data.
        </p>
      </div>

      <div className="feature">
        <h3>Responses</h3>
        <p>
          <Link
            to="Guide"
            params={{ slug: "responses" }}
            details={{ hash: "response-properties" }}
          >
            Response
          </Link>{" "}
          objects provide data about the route that matches a location and are
          used to render your application.
        </p>
      </div>

      <div className="feature">
        <h3>Route Matching</h3>
        <p>
          Curi uses{" "}
          <a href="https://github.com/pillarjs/path-to-regexp">
            path-to-regexp
          </a>{" "}
          to define route paths using simple but expressive strings.
        </p>
      </div>

      <div className="feature">
        <h3>Navigation</h3>
        <p>
          Curi uses the{" "}
          <a href="https://github.com/pshrmn/hickory">
            <IJS>hickory</IJS>
          </a>{" "}
          package to power navigation anywhere you can run JavaScript.
        </p>
      </div>

      <div className="feature">
        <h3>Server Side Rendering</h3>
        <p>
          Server side rendering with Curi is as easy as client side rendering.
          The main difference is that you will swap the browser history with an
          in-memory history.
        </p>
      </div>
    </div>
  </div>
);
