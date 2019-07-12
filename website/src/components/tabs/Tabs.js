import React from "react";
import styled from "@emotion/styled";
import { Tabs, TabPanels } from "@reach/tabs";

export const StyledTabs = styled(Tabs)`
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

export const PaddedPanels = styled(TabPanels)`
  padding: 0 15px;
`;
