import React from "react";

import GuideTemplate from "../templates/Guide";
import { Explanation } from "../layout/Groups";
import GuideLinks from "../links/lists/GuideDropdown";

export default function GuideList() {
  return (
    <GuideTemplate>
      <h1>Curi Guides</h1>

      <Explanation>
        <p>
          There are a number of guides to help you make the most of Curi in your
          application.
        </p>
        <p>
          The "basic" guides are designed to give you a solid understanding of
          how to use Curi and how it works.
        </p>
        <p>
          The "rendering" guides give an overview of how to use Curi with the
          currently supported renderers.
        </p>
        <p>
          The "advanced" guides will help you take advantage of more Curi
          features to get the most out of Curi.
        </p>
        <p>
          The "migration" guides are helpful for transitioning to Curi from
          other single-page application routers.
        </p>
      </Explanation>

      <GuideLinks />
    </GuideTemplate>
  );
}
