import React from "react";
import { Link } from "@curi/react-dom";

import PackageTemplate from "../templates/Package";
import { Note } from "../Messages";
import { InlineJS as IJS } from "../highlight/Inline";
import { Explanation } from "../layout/Groups";

const PackageList = ({
  name,
  version,
  globalName,
  children,
  about,
  unpkg = true
}) => (
  <PackageTemplate>
    <h1>Curi Packages</h1>

    <Explanation>
      <p>
        Curi is split into a number of different packages that you can pick and
        choose from in order to only use what you need. You will always need the{" "}
        <Link name="Package" params={{ package: "router" }}>
          router
        </Link>{" "}
        package, but no other package is necessary.
      </p>
      <Note>
        All of the Curi packages are scoped under <IJS>@curi</IJS>. For example,
        to install the <IJS>router</IJS> package, you would call{" "}
        <IJS>npm install @curi/router</IJS>.
      </Note>
    </Explanation>
  </PackageTemplate>
);

export default PackageList;
