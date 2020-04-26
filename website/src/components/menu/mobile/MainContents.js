import React from "react";

import ActiveLink from "../../links/ActiveLink";
import CollapsibleGroup from "../../links/collapsible/CollapsibleGroup";
import PackageLinks from "../../links/collapsible/PackageLinks";
import GuideLinks from "../../links/collapsible/GuideLinks";
import ExampleLinks from "../../links/collapsible/ExampleLinks";
import TutorialLinks from "../../links/collapsible/TutorialLinks";

export default function MainContents() {
  return (
    <ul className="my-1 mx-0 p-0 list-none">
      <li>
        <ActiveLink name="Home" className="home-link">
          Curi
        </ActiveLink>
      </li>
      <li>
        <CollapsibleGroup title="API" initial={true}>
          <PackageLinks />
        </CollapsibleGroup>
      </li>
      <li>
        <CollapsibleGroup title="Guides" initial={true}>
          <GuideLinks />
        </CollapsibleGroup>
      </li>
      <li>
        <CollapsibleGroup title="Tutorials" initial={true}>
          <TutorialLinks />
        </CollapsibleGroup>
      </li>
      <li>
        <CollapsibleGroup title="Examples" initial={true}>
          <ExampleLinks />
        </CollapsibleGroup>
      </li>
      <li>
        <a href="https://github.com/pshrmn/curi">GitHub</a>
      </li>
    </ul>
  );
}
