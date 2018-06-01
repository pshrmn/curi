import React from "react";
import warning from "warning";
import { Curious } from "./Context";

import { ReactNode, ReactType, Ref } from "react";
import { Response } from "@curi/core";

export interface FocusProps {
  children(ref: Ref<any>): ReactNode;
}

interface FocusPropsWithResponse extends FocusProps {
  response: Response;
}

class FocusWithResponse extends React.Component<FocusPropsWithResponse> {
  eleToFocus: HTMLElement | null;

  constructor(props: FocusPropsWithResponse) {
    super(props);
    this.eleToFocus = null;
  }

  setRef = (element: any) => {
    this.eleToFocus = element;
  };

  render() {
    const { children } = this.props;
    return children(this.setRef);
  }

  componentDidMount() {
    this.focus();
  }

  componentDidUpdate(prevProps: FocusPropsWithResponse) {
    // only re-focus when the response changes
    if (prevProps.response !== this.props.response) {
      this.focus();
    }
  }

  focus() {
    // https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex#managing_focus_at_the_page_level
    if (this.eleToFocus !== null) {
      warning(
        this.eleToFocus.hasAttribute("tabIndex") ||
          this.eleToFocus.tabIndex !== -1,
        'The component that is passed the ref must have a "tabIndex" prop or be focusable by default in order to be focused. ' +
          "Otherwise, the document's <body> will be focused instead."
      );
      this.eleToFocus.focus();
    }
  }
}

const Focus = (props: FocusProps) => (
  <Curious>
    {({ response }) => (
      <FocusWithResponse response={response} {...props}>
        {props.children}
      </FocusWithResponse>
    )}
  </Curious>
);

export default Focus;
