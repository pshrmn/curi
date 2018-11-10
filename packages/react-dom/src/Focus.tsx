import React from "react";
import { Curious } from "@curi/react-universal";

import { ReactNode, Ref } from "react";
import { Response } from "@curi/router";

export interface FocusProps {
  children(ref: Ref<any>): ReactNode;
  preventScroll?: boolean;
  preserve?: boolean;
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

  static defaultProps = {
    preventScroll: false
  };

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
      if (process.env.NODE_ENV !== "production") {
        if (
          !this.eleToFocus.hasAttribute("tabIndex") &&
          this.eleToFocus.tabIndex === -1
        ) {
          console.warn(
            'The component that is passed the ref must have a "tabIndex" prop or be focusable by default in order to be focused. ' +
              "Otherwise, the document's <body> will be focused instead."
          );
        }
      }
      if (
        this.props.preserve &&
        this.eleToFocus.contains(document.activeElement)
      ) {
        return;
      }
      setTimeout(() => {
        // @ts-ignore
        this.eleToFocus.focus({ preventScroll: this.props.preventScroll });
      });
    } else {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "There is no element to focus. Did you forget to add the ref to an element?"
        );
      }
    }
  }
}

export default function Focus(props: FocusProps): React.ReactElement<any> {
  return (
    <Curious>
      {({ response }) => (
        <FocusWithResponse response={response} {...props}>
          {props.children}
        </FocusWithResponse>
      )}
    </Curious>
  );
}
