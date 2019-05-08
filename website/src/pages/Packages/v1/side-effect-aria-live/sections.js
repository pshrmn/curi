import React from "react";

import { About, APIBlock } from "../../../../components/package/common";
import { AriaLiveAPI } from "./api/ariaLive";

export default {
  about: (
    <About>
      <p>
        When you navigate in a non-single-page application, users who rely on a
        screen reader will get an announcement about the navigation.
        Unfortunately, this behavior does not natively exist with single-page
        applications and the History API.
      </p>

      <p>
        This side-effect usea{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions">
          ARIA live regions
        </a>{" "}
        to announce navigations to users who use screen readers.
      </p>
    </About>
  ),
  api: (
    <APIBlock>
      <AriaLiveAPI />
    </APIBlock>
  )
};
