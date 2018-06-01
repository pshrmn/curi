import React from "react";
import { Curious } from "./Context";

import { ReactNode } from "react";
import { Response } from "@curi/core";

export interface FocusProps {
  children: ReactNode;
}

interface FocusPropsWithResponse extends FocusProps {
  response: Response;
}

class FocusWithResponse extends React.Component<FocusPropsWithResponse> {
  divToFocus: HTMLElement | null;

  constructor(props: FocusPropsWithResponse) {
    super(props);
    this.divToFocus = null;
  }

  setRef = (element: any) => {
    this.divToFocus = element;
  };

  render() {
    // https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex#managing_focus_at_the_page_level
    return (
      <div tabIndex={-1} ref={this.setRef}>
        {this.props.children}
      </div>
    );
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
    if (this.divToFocus !== null) {
      this.divToFocus.focus();
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
