import React from "react";
import { Link } from "@curi/react-dom";
import styled from "@emotion/styled";

import { CodeBlock } from "../../components/layout/Groups";
import { color } from "../../constants/styles";
import CodeSandboxDemo from "../../components/CodeSandboxDemo";

const StyledH1 = styled("h1")`
  font-size: 1.75em;
  text-align: center;
  color: ${color.purple};
`;

const StyledH2 = styled("h2")`
  font-size: 1.2em;
  text-align: center;
  color: ${color.darkGray};
`;

export default function HomePage() {
  return (
    <React.Fragment>
      <StyledH1>Curi</StyledH1>
      <StyledH2>A JavaScript router for single-page applications</StyledH2>

      <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/basic" />

      <p>
        Curi is a router for however you render. Curi provides packages to work
        with{" "}
        <Link name="Package" params={{ package: "react-dom", version: "v1" }}>
          React DOM
        </Link>
        ,{" "}
        <Link
          name="Package"
          params={{ package: "react-native", version: "v1" }}
        >
          React Native
        </Link>
        ,{" "}
        <Link name="Package" params={{ package: "vue", version: "v1" }}>
          Vue
        </Link>{" "}
        (in beta), and{" "}
        <Link name="Package" params={{ package: "svelte", version: "v1" }}>
          Svelte
        </Link>{" "}
        (in beta)*.
      </p>

      <h2>Ready to learn?</h2>
      <p>
        The{" "}
        <Link name="Guide" params={{ slug: "getting-started" }}>
          getting started
        </Link>{" "}
        guide will put you on the right path. If you prefer to learn through
        tutorials, there are{" "}
        <Link name="Tutorial" params={{ slug: "react-basics" }}>
          React DOM
        </Link>{" "}
        and{" "}
        <Link name="Tutorial" params={{ slug: "vue-basics" }}>
          Vue
        </Link>{" "}
        tutorials to help guide you.
      </p>

      <h2>Examples</h2>
      <p>
        Want to see Curi in action? The <Link name="Examples">examples</Link>{" "}
        section has a variety of demos showing off what you can do with Curi.
      </p>

      <p>
        <em>
          * Curi "officially" supports React DOM, React Native, Vue, and Svelte,
          but can work with almost any renderer through custom interfaces. Want
          to add "official" support for another renderer? Please{" "}
          <a href="https://github.com/pshrmn/curi/issues">open an issue</a>!
        </em>
      </p>
    </React.Fragment>
  );
}
