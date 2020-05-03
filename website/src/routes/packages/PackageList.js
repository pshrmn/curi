import React from "react";
import { Link } from "@curi/react-dom";

import PACKAGE_API from "../../constants/packages";
import Page from "../../components/layout/Page";
import {
  TitledPlainSection,
  PlainSection,
  Paragraph
} from "../../components/layout/Sections";
import { Note } from "../../components/Messages";
import { InlineJS as IJS } from "../../components/highlight/Inline";

let GroupPackages = ({ packages }) => (
  <ul>
    {packages.map(p => (
      <li key={p.name}>
        <Link name="Package" params={{ package: p.name, version: p.latest }}>
          {p.name}
        </Link>
      </li>
    ))}
  </ul>
);

function PackageLinks({ version = "v2" }) {
  let groups = PACKAGE_API.versioned(version);
  return (
    <menu>
      {Object.keys(groups).map(title => (
        <section key={title}>
          <h3>{title}</h3>
          <GroupPackages packages={groups[title]} />
        </section>
      ))}
    </menu>
  );
}

export default function PackageList({ response }) {
  return (
    <Page>
      <TitledPlainSection title="Curi Packages">
        <Paragraph>
          Curi is split into a number of different packages that you can pick
          and choose from in order to only use what you need. You will always
          need the{" "}
          <Link name="Package" params={{ package: "router", version: "v2" }}>
            router
          </Link>{" "}
          package, but no other package is necessary.
        </Paragraph>

        <Note>
          <Paragraph>
            All of the Curi packages are scoped under <IJS>@curi</IJS>. For
            example, to install the <IJS>router</IJS> package, you would call{" "}
            <IJS>npm install @curi/router</IJS>.
          </Paragraph>
        </Note>
      </TitledPlainSection>

      <PlainSection>
        <PackageLinks version={response.params.version} />
      </PlainSection>
    </Page>
  );
}
