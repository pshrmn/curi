import React from "react";

import { About, APIBlock } from "../../../../components/package/common";
import { ScrollAPI } from "./api/scroll";

function SideEffectScrollPkg() {
  return (
    <React.Fragment>
      <About>
        <p>
          When Curi is running in a browser, it relies on the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API">
            History API
          </a>{" "}
          to change locations, but this does not trigger scrolling to the top of
          the page when you navigate. This package provides a side effect
          function that will scroll to the top of the page whenever those
          functions are used for navigation.
        </p>

        <p>
          Other types of navigation, such as clicking the browser's back and
          forward buttons, will rely on the browser to correctly restore the
          scroll position.
        </p>
      </About>

      <APIBlock>
        <ScrollAPI />
      </APIBlock>
    </React.Fragment>
  );
}

export default React.memo(SideEffectScrollPkg);
