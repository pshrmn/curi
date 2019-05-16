import React from "react";
import styled from "@emotion/styled";
import { useResponse } from "@curi/react-dom";

import MainContents from "./MainContents";
import PageMenu from "../../layout/PageMenu";
import { MainMenuButton, PageMenuButton } from "./buttons";
import { color, screen } from "../../../constants/styles";

const StyledMenu = styled("div")`
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
  width: 100vw;
  height: 50px;
  left: 0;
  bottom: 0;
  display: flex;
  flex: row nowrap;
  justify-content: space-between;
  z-index: 9999;
`;

function MenuControls(props) {
  return (
    <StyledControls>
      <MainMenuButton {...props} />
      {props.hasPage && <PageMenuButton {...props} />}
    </StyledControls>
  );
}

export default function MobileMenu(props) {
  const [which, setWhich] = React.useState(undefined);
  const { response } = useResponse();

  React.useEffect(() => {
    // reset to hidden when switching pages
    setWhich(undefined);
  }, [response.location.pathname]);

  const toggleMenuType = type => {
    if (type === which) {
      setWhich(undefined);
    } else {
      setWhich(type);
    }
  };

  const hideMenu = () => {
    setWhich(undefined);
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
        toggleMenuType={toggleMenuType}
        activeMenu={which}
        hasPage={contents !== undefined}
      />
      <StyledMenu
        hidden={which === undefined}
        className={which !== undefined ? "visible" : ""}
        onClick={e => {
          if (e.target.tagName === "A") {
            hideMenu();
          }
        }}
      >
        <nav>{menu}</nav>
      </StyledMenu>
    </React.Fragment>
  );
}
