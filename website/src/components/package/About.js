import React from "react";
import { HashSection } from "../layout/Sections";

export default function AboutBlock({ children }) {
  return (
    <HashSection meta={{ title: "About", hash: "about" }}>
      {children}
    </HashSection>
  );
}
