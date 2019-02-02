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
  const { response } = useCuri();
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

    if (props.preserve && ele.contains(document.activeElement)) {
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
    const { preventScroll = false } = props;
    const timeout = setTimeout(() => {
      // @ts-ignore
      ele.focus({ preventScroll });
    });
    return () => {
      clearTimeout(timeout);
    };
  }, [response]);
}
