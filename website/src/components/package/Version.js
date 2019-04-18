import React from "react";
import { useRouter } from "@curi/react-dom";
import styled from "@emotion/styled";

import { font } from "../../constants/styles";

const StyledSelect = styled("select")`
  font-size: 20px;
  font-family: ${font.serif};
  margin: 5px 0;
`;

export default function Version({ versions, major, params }) {
  const router = useRouter();

  // only render dropdown for packages with multiple versions
  if (Object.keys(versions).length > 1) {
    return (
      <label>
        Version:{" "}
        <StyledSelect
          value={major}
          onChange={e => {
            router.navigate({
              name: "Package",
              params: { ...params, version: e.target.value }
            });
          }}
        >
          {Object.keys(versions).map(m => {
            return (
              <option key={m} value={m}>
                {versions[m]}
              </option>
            );
          })}
        </StyledSelect>
      </label>
    );
  }

  return <div>v{versions[major]}</div>;
}
