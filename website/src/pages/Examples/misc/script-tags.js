import React from "react";

import {
  Section,
  Explanation,
  Cmp,
  OnGithub
} from "../../../components/example/common";

const meta = {
  title: "Script Tags"
};

export default function ScriptTagExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Explanation" id="explanation">
        <Explanation>
          <p>
            This example uses unbundled JavaScript and script tags to serve its
            content. If you want to use <Cmp>script</Cmp> tags in your
            application, Curi does provide builds for that. You can easily use{" "}
            <a href="https://unpkg.com">unpkg</a> to load the scripts, or
            download and serve them yourself.
          </p>
        </Explanation>
      </Section>

      <OnGithub path="misc/script-tags" />
    </React.Fragment>
  );
}
