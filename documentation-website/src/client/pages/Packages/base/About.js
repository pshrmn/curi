import React from "react";
import { Section } from "../../../components/Sections";
import { SideBySide, Explanation } from "../../../components/SideBySide";

export default ({ about }) => (
  <Section title="About" id="about">
    <SideBySide>
      <Explanation>{about}</Explanation>
    </SideBySide>
  </Section>
);
