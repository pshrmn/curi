import React from "react";
import { useResponse } from "@curi/react-dom";
import { TabList, Tab, Tabs, TabPanels, TabPanel } from "@reach/tabs";

import MainContents from "./MainContents";
import PageMenu from "../../layout/PageMenu";

const MobileMenu = ({ contents }) => {
  let [visible, setVisible] = React.useState(false);
  let { response } = useResponse();

  React.useEffect(() => {
    // reset to hidden when switching pages
    setVisible(false);
  }, [response.location.pathname]);

  let hasPage = contents !== undefined;

  let tabs = [<Tab key="main">Main</Tab>];
  let panels = [
    <TabPanel key="main">
      <MainContents />
    </TabPanel>
  ];
  if (hasPage) {
    tabs.push(<Tab key="page">Page</Tab>);
    panels.push(
      <TabPanel key="page">
        <PageMenu contents={contents} />
      </TabPanel>
    );
  }

  return (
    <>
      <menu className="fixed w-screen h-8 left-0 bottom-0 flex flex-row flex-no-wrap justify-between z-50">
        <button
          onClick={() => {
            setVisible(!visible);
          }}
          className={`h-8 flex-grow text-xl border-0 ${
            visible ? "bg-button-red" : "bg-button-green"
          } md:hidden`}
        >
          {visible ? "Hide" : "Menu"}
        </button>
      </menu>
      <menu
        hidden={!visible}
        onClick={e => {
          if (e.target.tagName === "A") {
            setVisible(false);
          }
        }}
        className={`${
          visible ? "block" : ""
        } fixed overflow-y-scroll w-screen h-screen bg-gray-100 z-40 p-0 pb-10 md:hidden`}
      >
        <Tabs>
          <TabList>{tabs}</TabList>
          <TabPanels className="py-0 px-3">{panels}</TabPanels>
        </Tabs>
      </menu>
    </>
  );
};

export default MobileMenu;
