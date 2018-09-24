import React from "react";
import { Section } from "../layout/Sections";

import "../../scss/api.scss";

export default function APIBlock({ children }) {
  return (
    <Section title="API" id="API">
      {children}
    </Section>
  );
}
