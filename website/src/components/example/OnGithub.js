import React from "react";

import { Section } from "../layout/Sections";
import { Explanation } from "../layout/Groups";

export default function OnGithub({ path }) {
  return (
    <Section title="On GitHub" id="source">
      <Explanation>
        <p>
          If you want to run this code locally, the source code is available on
          GitHub{" "}
          <a
            href={`https://github.com/pshrmn/curi/tree/master/examples/${path}`}
          >
            here
          </a>.
        </p>
      </Explanation>
    </Section>
  );
}
