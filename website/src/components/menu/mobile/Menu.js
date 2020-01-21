import React from "react";
import styled from "@emotion/styled";
import { useResponse } from "@curi/react-dom";
import { TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import MainContents from "./MainContents";
import PageMenu from "../../layout/PageMenu";
import { MenuButton } from "./buttons";
import { StyledTabs, PaddedPanels } from "../../tabs/Tabs";
import { color, screen } from "../../../constants/styles";

let StyledMenu = styled("menu")`
  position: fixed;
  overflow-y: scroll;
  width: 100vw;
  height: 100vh;
  background: ${color.lightGray};
  z-index: 999;
  padding: 0 0 45px 0;

  &.visible {
    display: block;
  }

  ul {
    margin: 3px 0;
    padding-left: 0px;
    list-style: none;
  }

  li {
    margin: 3px 0;
  }

  a {
    text-decoration: none;
    display: inline-block;
    color: ${color.purple};
  }

  h3 {
    border-bottom: 1px solid ${color.darkGray};
  }

  .active {
    font-weight: bold;
  }

  .children {
    display: none;
    background: ${color.lightGray};
    padding: 10px;

    &.visible {
      display: block;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-y: scroll;
    }
  }

  @media only screen and (min-width: ${screen.medium}) {
    display: none;

    &.visible {
      display: none;
    }
  }
`;

let StyledControls = styled("menu")`
  position: fixed;
  width: 100vw;
  height: 40px;
  left: 0;
  bottom: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  z-index: 9999;
`;

export default function MobileMenu(props) {
  let [visible, setVisible] = React.useState(false);
  let { response } = useResponse();

  React.useEffect(() => {
    // reset to hidden when switching pages
    setVisible(false);
  }, [response.location.pathname]);

  let toggleVisible = () => {
    setVisible(!visible);
  };

  let { contents } = props;
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
    <React.Fragment>
      <StyledControls>
        <MenuButton toggle={toggleVisible} active={visible} />
      </StyledControls>
      <StyledMenu
        hidden={!visible}
        className={visible ? "visible" : ""}
        onClick={e => {
          if (e.target.tagName === "A") {
            setVisible(false);
          }
        }}
      >
        <StyledTabs>
          <TabList>{tabs}</TabList>

          <PaddedPanels>{panels}</PaddedPanels>
        </StyledTabs>
      </StyledMenu>
    </React.Fragment>
  );
}
