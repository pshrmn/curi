import React from "react";
import { TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import { StyledTabs } from "../tabs/Tabs";
import CodeSandboxDemo from "../CodeSandboxDemo";

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
