import React from "react";
import styled from "@emotion/styled";

const ScrollableContainer = styled("div")`
  overflow-x: scroll;
`;

export default function ScrollableTable(props) {
  return (
    <ScrollableContainer>
      <table {...props} />
    </ScrollableContainer>
  );
}
