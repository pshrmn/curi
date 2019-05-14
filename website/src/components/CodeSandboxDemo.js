import React from "react";
import styled from "@emotion/styled";

import { screen } from "../constants/styles";

const StyledDemo = styled("div")`
  p {
    font-style: italic;
    text-align: center;
    margin: 0;
  }

  @media only screen and (min-width: ${screen.medium}) {
    max-width: 80vw;
    margin: 0 auto;
  }
`;

export default function CodeSandboxDemo({
  id,
  view = "split",
  help = true,
  name
}) {
  let helpText = null;
  if (help) {
    helpText = (
      <p>
        Use the three buttons at the top of the Sandbox to toggle view modes.
        Clicking the menu button in the top left corner opens a menu to switch
        between files.
      </p>
    );
  }
  return (
    <StyledDemo>
      <iframe
        title={name}
        src={`https://codesandbox.io/embed/${id}?view=${view}`}
        width="100%"
        height="600px"
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        tabIndex={-1}
      />
      {helpText}
    </StyledDemo>
  );
}
