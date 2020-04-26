import React from "react";
import { TabList, Tab, Tabs, TabPanels, TabPanel } from "@reach/tabs";

import CodeSandboxDemo from "../CodeSandboxDemo";

export default function MultiSandbox({ sandboxes }) {
  return (
    <Tabs>
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
    </Tabs>
  );
}
