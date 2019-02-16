import React from "react";
import { Link } from "@curi/react-dom";

import PACKAGE_API from "../../constants/packages";
import Page from "../../components/layout/Page";
import { PlainSection } from "../../components/layout/Sections";
import { Note } from "../../components/Messages";
import { InlineJS as IJS } from "../../components/highlight/Inline";

const GroupPackages = ({ packages }) => (
  <ul className="link-list">
    {packages.map(p => (
      <li key={p.name} className="solo">
        <Link name="Package" params={{ package: p.name, version: p.latest }}>
          {p.name}
        </Link>
      </li>
    ))}
  </ul>
);

function PackageLinks() {
  const groups = PACKAGE_API.grouped();
  return (
    <div>
      {Object.keys(groups).map(title => (
        <div key={title}>
          <h3>{title}</h3>
          <GroupPackages packages={groups[title]} />
        </div>
      ))}
    </div>
  );
}

export default function PackageList() {
  return (
    <Page>
      <PlainSection>
        <h1>Curi Packages</h1>

        <p>
          Curi is split into a number of different packages that you can pick
          and choose from in order to only use what you need. You will always
          need the{" "}
          <Link name="Package" params={{ package: "router" }}>
            router
          </Link>{" "}
          package, but no other package is necessary.
        </p>

        <Note>
          <p>
            All of the Curi packages are scoped under <IJS>@curi</IJS>. For
            example, to install the <IJS>router</IJS> package, you would call{" "}
            <IJS>npm install @curi/router</IJS>.
          </p>
        </Note>
      </PlainSection>

      <PlainSection>
        <PackageLinks />
      </PlainSection>
    </Page>
  );
}
