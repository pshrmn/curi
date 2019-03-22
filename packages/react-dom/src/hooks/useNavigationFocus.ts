import React from "react";
import { useCuri } from "@curi/react-universal";

export interface FocusHookProps {
  preventScroll?: boolean;
  preserve?: boolean;
}

export default function useNavigationFocus(
  ref: React.MutableRefObject<HTMLElement | null>,
  props: FocusHookProps = {}
) {
  // The response isn't actually used, but the app should only
  // re-focus when the response changes. The preserve and preventScroll
  // values are used, but not used in the comparison array because
  // changing these values would steal the app's focus even though
  // the location hasn't changed.
  const { response } = useCuri();
  const { preserve, preventScroll = false } = props;
  React.useEffect(() => {
    const ele = ref.current;
    if (ele === null) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "There is no element to focus. Did you forget to add the ref to an element?"
        );
      }
      return;
    }

    if (preserve && ele.contains(document.activeElement)) {
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      if (!ele.hasAttribute("tabIndex") && ele.tabIndex === -1) {
        console.warn(
          'The component that is passed the ref must have a "tabIndex" prop or be focusable by default in order to be focused. ' +
            "Otherwise, the document's <body> will be focused instead."
        );
      }
    }
    // @ts-ignore
    ele.focus({ preventScroll });
  }, [response]);
}
