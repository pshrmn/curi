import React from "react";
import { Link } from "@curi/react-dom";
import styled from "@emotion/styled";

import { color, screen } from "../../constants/styles";
import { PlainSection } from "../../components/layout/Sections";
import { CodeBlock } from "../../components/layout/Groups";

const StyledH1 = styled("h1")`
  font-size: 1.75em;
  text-align: center;
  color: ${color.purple};
  margin: 0;
`;

const StyledH2 = styled("h2")`
  font-size: 1.2em;
  text-align: center;
  color: ${color.darkGray};
  margin: 0;
`;

const Tiles = styled("div")`
  margin: 25px auto 0;
  display: flex;
  flex-flow: row wrap;
`;

const Tile = styled("div")`
  margin: 0 25px 25px 0;

  h3 {
    font-size: 1.2em;
  }

  p {
    margin-bottom: 10px;

    &:last-child {
      margin: 0;
    }
  }

  justify-content: space-between;
  @media only screen and (min-width: ${screen.medium}) {
    max-width: 300px;
    min-width: 200px;
  }
`;

export default function HomePage() {
  return (
    <React.Fragment>
      <PlainSection className="centered">
        <StyledH1>Curi</StyledH1>
        <StyledH2>A JavaScript router for single-page applications</StyledH2>
      </PlainSection>

      <PlainSection className="centered">
        <CodeBlock>
          {`import { prepareRoutes, createRouter, announce } from "@curi/router";
import { browser } from "@hickory/browser";

const routes = prepareRoutes([
  { name: "Home", path: "" },
  { name: "About", path: "about" },
  { name: "Catch All", path: "(.*)" }
]);

const router = createRouter(browser, routes, {
  sideEffects: [
    announce(({ response }) => {
      return \`Navigated to \${response.location.pathname}\`;
    })
  ]
});`}
        </CodeBlock>
      </PlainSection>

      <PlainSection className="centered">
        <h2>What is Curi?</h2>
        <Tiles>
          <Tile>
            <h3>Accessible</h3>
            <p>
              Curi helps make your application more accessible with focus
              management and navigation announcements.
            </p>

            <p>
              <Link name="Guide" params={{ slug: "accessibility" }}>
                Learn more.
              </Link>
            </p>
          </Tile>

          <Tile>
            <h3>Asynchronous</h3>
            <p>
              Routes can have asynchronous actions, like code splitting and data
              fetching. When the route matches, the application will not
              re-render until the route's async actions complete.
            </p>
            <p>
              <Link name="Guide" params={{ slug: "sync-or-async" }}>
                Learn more.
              </Link>
            </p>
          </Tile>

          <Tile>
            <h3>Flexible</h3>
            <p>
              You choose how to render. Curi is a Javascript router, not a React
              router, a Vue router, etc.
            </p>

            <p>
              Curi provides official support for some UI renderers, but you can
              also interface it to work with your renderer of choice.
            </p>
          </Tile>

          <Tile>
            <h3>SSR Friendly</h3>
            <p>
              <Link name="Guide" params={{ slug: "ssr" }}>
                Server-side rendering
              </Link>{" "}
              with Curi is pain free. Thanks to Curi's async model, data loading
              with SSR doesn't require double renders.
            </p>

            <p>
              Curi also provides a{" "}
              <Link
                name="Package"
                params={{ package: "static", version: "v2" }}
              >
                static
              </Link>{" "}
              package for pre-rendering static HTML pages.
            </p>
          </Tile>
        </Tiles>
      </PlainSection>

      <PlainSection className="centered">
        <h2>Resources</h2>
        <Tiles>
          <Tile>
            <h3>Guides</h3>
            <p>
              Want to learn more? Check out the{" "}
              <Link name="Guide" params={{ slug: "getting-started" }}>
                getting started guide
              </Link>
              .
            </p>
          </Tile>

          <Tile>
            <h3>API Documentation</h3>
            <p>
              Each package's API is{" "}
              <Link name="Packages" params={{ version: "v2" }}>
                well documented
              </Link>{" "}
              so you can spend less time wondering and more time building.
            </p>
          </Tile>

          <Tile>
            <h3>Examples</h3>
            <p>
              Want to see some example applications? There are{" "}
              <Link name="Examples">many examples</Link> to choose from, using a
              few different UI renderers.
            </p>
          </Tile>

          <Tile>
            <h3>Tutorials</h3>
            <p>
              Do you learn by doing? Curi provides a few{" "}
              <Link name="Tutorials">tutorials</Link> to help you get started.
            </p>
          </Tile>
        </Tiles>
      </PlainSection>
    </React.Fragment>
  );
}
