import React from "react";
import { Link } from "@curi/react-dom";

import { PlainSection, Paragraph } from "../../components/layout/Sections";
import { CodeBlock } from "../../components/layout/Groups";

let Tiles = ({ children }) => {
  return (
    <div
      className="mt-5 grid"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
    >
      {children}
    </div>
  );
};

let Tile = ({ children }) => {
  return (
    <section className="justify-between mt-0 mr-5 mb-5 ml-0 md:max-w-lg">
      {children}
    </section>
  );
};

let TileTitle = ({ children }) => {
  return <h3 className="text-2xl">{children}</h3>;
};

export default function HomePage() {
  return (
    <React.Fragment>
      <PlainSection className="md:my-0 md:mx-auto md:max-w-3xl">
        <h1
          tabIndex={-1}
          className="text-3xl text-center color-purple m-0 outline-none"
        >
          Curi
        </h1>
        <h2 className="text-xl text-center color-gray-400 m-0">
          A JavaScript router for single-page applications
        </h2>
      </PlainSection>

      <PlainSection className="md:my-0 md:mx-auto md:max-w-3xl">
        <CodeBlock>
          {`import { prepareRoutes, createRouter, announce } from "@curi/router";
import { browser } from "@hickory/browser";

let routes = prepareRoutes([
  { name: "Home", path: "" },
  { name: "About", path: "about" },
  { name: "Catch All", path: "(.*)" }
]);

let router = createRouter(browser, routes, {
  sideEffects: [
    announce(({ response }) => {
      return \`Navigated to \${response.location.pathname}\`;
    })
  ]
});`}
        </CodeBlock>
      </PlainSection>

      <PlainSection className="md:my-0 md:mx-auto md:max-w-3xl">
        <h2>What is Curi?</h2>
        <Tiles>
          <Tile>
            <TileTitle>Accessible</TileTitle>
            <Paragraph className="mb-2">
              Curi helps make your application more accessible with focus
              management and navigation announcements.
            </Paragraph>

            <Paragraph>
              <Link name="Guide" params={{ slug: "accessibility" }}>
                Learn more.
              </Link>
            </Paragraph>
          </Tile>

          <Tile>
            <TileTitle>Asynchronous</TileTitle>
            <Paragraph className="mb-2">
              Routes can have asynchronous actions, like code splitting and data
              fetching. When the route matches, the application will not
              re-render until the route's async actions complete.
            </Paragraph>
            <Paragraph>
              <Link name="Guide" params={{ slug: "sync-or-async" }}>
                Learn more.
              </Link>
            </Paragraph>
          </Tile>

          <Tile>
            <TileTitle>Flexible</TileTitle>
            <Paragraph className="mb-2">
              You choose how to render. Curi is a Javascript router, not a React
              router, a Vue router, etc.
            </Paragraph>

            <Paragraph>
              Curi provides official support for some UI renderers, but you can
              also interface it to work with your renderer of choice.
            </Paragraph>
          </Tile>

          <Tile>
            <TileTitle>SSR Friendly</TileTitle>
            <Paragraph className="mb-2">
              <Link name="Guide" params={{ slug: "ssr" }}>
                Server-side rendering
              </Link>{" "}
              with Curi is pain free. Thanks to Curi's async model, data loading
              with SSR doesn't require double renders.
            </Paragraph>

            <Paragraph>
              Curi also provides a{" "}
              <Link
                name="Package"
                params={{ package: "static", version: "v2" }}
              >
                static
              </Link>{" "}
              package for pre-rendering static HTML pages.
            </Paragraph>
          </Tile>
        </Tiles>
      </PlainSection>

      <PlainSection className="md:my-0 md:mx-auto md:max-w-3xl">
        <h2>Resources</h2>
        <Tiles>
          <Tile>
            <TileTitle>Guides</TileTitle>
            <Paragraph className="mb-2">
              Want to learn more? Check out the{" "}
              <Link name="Guide" params={{ slug: "getting-started" }}>
                getting started guide
              </Link>
              .
            </Paragraph>
          </Tile>

          <Tile>
            <TileTitle>API Documentation</TileTitle>
            <Paragraph className="mb-2">
              Each package's API is{" "}
              <Link name="Packages" params={{ version: "v2" }}>
                well documented
              </Link>{" "}
              so you can spend less time wondering and more time building.
            </Paragraph>
          </Tile>

          <Tile>
            <TileTitle>Examples</TileTitle>
            <Paragraph className="mb-2">
              Want to see some example applications? There are{" "}
              <Link name="Examples">many examples</Link> to choose from, using a
              few different UI renderers.
            </Paragraph>
          </Tile>

          <Tile>
            <TileTitle>Tutorials</TileTitle>
            <Paragraph className="mb-2">
              Do you learn by doing? Curi provides a few{" "}
              <Link name="Tutorials">tutorials</Link> to help you get started.
            </Paragraph>
          </Tile>
        </Tiles>
      </PlainSection>
    </React.Fragment>
  );
}
