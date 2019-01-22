import React from "react";
import { Section } from "../layout/Sections";

export default function AboutBlock({ children }) {
  return (
    <Section title="About" id="about">
      {children}
    </Section>
  );
}
