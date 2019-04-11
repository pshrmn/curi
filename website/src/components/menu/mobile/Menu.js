import React from "react";
import styled from "@emotion/styled";
import { useResponse } from "@curi/react-dom";

import MainContents from "./MainContents";
import PageMenu from "../../layout/PageMenu";
import { MenuToggleButton, MainMenuButton, PageMenuButton } from "./buttons";
import { color, screen } from "../../../constants/styles";

const StyledMenu = styled("div")`
  display: none;
  position: fixed;
  overflow-y: scroll;
  width: 100vw;
  height: 100vh;
  background: ${color.lightGray};
  z-index: 999;
  padding: 15px;

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

const StyledControls = styled("div")`
  position: fixed;
  right: 15px;
  bottom: 15px;
  display: flex;
  flex-flow: column-reverse;
  z-index: 9999;
`;

function MenuControls(props) {
  return (
    <StyledControls>
      <MenuToggleButton {...props} />
      <MainMenuButton {...props} />
      {props.hasPage && <PageMenuButton {...props} />}
    </StyledControls>
  );
}

export default function MobileMenu(props) {
  const [visible, setVisible] = React.useState(false);
  const [which, setWhich] = React.useState("main");
  const { response } = useResponse();

  React.useEffect(() => {
    // reset to main when switching pages
    // this is primarily a safeguard in case
    // the new page doesn't have
    setWhich("main");
  }, [response.location.pathname]);

  const toggleMenuVisibility = () => {
    setVisible(prev => !prev);
  };

  const toggleMenuType = which => {
    setWhich(which);
  };

  const hideMenu = () => {
    if (visible) {
      setVisible(false);
    }
  };

  const { contents } = props;
  let menu = null;
  if (which === "main") {
    menu = <MainContents />;
  } else if (which === "page") {
    menu = contents ? <PageMenu contents={contents} /> : null;
  }

  return (
    <React.Fragment>
      <MenuControls
        toggleMenuVisibility={toggleMenuVisibility}
        toggleMenuType={toggleMenuType}
        visible={visible}
        activeMenu={which}
        hasPage={contents !== undefined}
      />
      <StyledMenu
        hidden={!visible}
        className={visible ? "visible" : ""}
        onClick={e => {
          if (e.target.tagName === "A") {
            hideMenu();
          }
        }}
      >
        <nav>{visible && menu}</nav>
      </StyledMenu>
    </React.Fragment>
  );
}
