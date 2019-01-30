import React from "react";
import { Link } from "@curi/react-dom";
import styled from "@emotion/styled";

import { color } from "../../constants/styles";
import CodeSandboxDemo from "../../components/CodeSandboxDemo";
import { PlainSection } from "../../components/layout/Sections";
import { FancyLink } from "../../components/links/fancy";

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
      <PlainSection className="centered">
        <StyledH1>Curi</StyledH1>
        <StyledH2>A JavaScript router for single-page applications</StyledH2>
      </PlainSection>

      <CodeSandboxDemo
        id="github/pshrmn/curi/tree/master/examples/react/basic"
        help={false}
      />

      <PlainSection className="centered">
        <p>
          Curi is a router for however you render. Curi officially supports{" "}
          <Link name="Package" params={{ package: "react-dom", version: "v1" }}>
            React DOM
          </Link>
          {" and "}
          <Link
            name="Package"
            params={{ package: "react-native", version: "v1" }}
          >
            React Native
          </Link>
          , with support for{" "}
          <Link name="Package" params={{ package: "vue", version: "v1" }}>
            Vue
          </Link>{" "}
          and{" "}
          <Link name="Package" params={{ package: "svelte", version: "v1" }}>
            Svelte
          </Link>{" "}
          in beta.
        </p>
      </PlainSection>

      <PlainSection className="centered">
        <div>
          <FancyLink name="Guide" params={{ slug: "getting-started" }}>
            Get Started
          </FancyLink>{" "}
          <FancyLink
            name="Example"
            params={{ category: "react", slug: "breadcrumbs" }}
          >
            See More Examples
          </FancyLink>
        </div>
      </PlainSection>
    </React.Fragment>
  );
}
