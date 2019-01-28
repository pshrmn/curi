import React from "react";
import { HashSection } from "../layout/Sections";

export default function AboutBlock({ children }) {
  return (
    <HashSection title="About" id="about">
      {children}
    </HashSection>
  );
}
