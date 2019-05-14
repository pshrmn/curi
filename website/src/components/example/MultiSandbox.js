import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import styled from "@emotion/styled";

import CodeSandboxDemo from "../CodeSandboxDemo";

const StyledTabs = styled(Tabs)`
  [data-reach-tab-panel] {
    outline: none;
  }

  [data-reach-tab-list] {
    display: flex;
    background: hsla(0, 0%, 0%, 0.05);
  }

  [data-reach-tab] {
    display: inline-block;
    border: none;
    padding: 0.25em 0.5em;
    margin: 0;
    background: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-bottom: solid 1px transparent;
  }

  [data-reach-tab]:active {
    background: hsla(0, 0%, 0%, 0.05);
  }

  [data-reach-tab]:disabled {
    opacity: 0.25;
    cursor: default;
  }

  [data-reach-tab][data-selected] {
    border-bottom-color: inherit;
  }
`;

export default function MultiSandbox({ sandboxes }) {
  return (
    <StyledTabs>
      <TabList>
        {sandboxes.map(sandbox => (
          <Tab key={sandbox.name}>{sandbox.name}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {sandboxes.map(sandbox => (
          <TabPanel key={sandbox.id}>
            <CodeSandboxDemo {...sandbox} />
          </TabPanel>
        ))}
      </TabPanels>
    </StyledTabs>
  );
}
