import React from "react";
import { Link } from "@curi/react-dom";

import PackageTemplate from "../templates/Package";
import { Note } from "../Messages";
import { InlineJS as IJS } from "../highlight/Inline";
import PackageLinks from "../links/lists/PackageDropdown";

export default function PackageList() {
  return (
    <PackageTemplate>
      <h1>Curi Packages</h1>

      <p>
        Curi is split into a number of different packages that you can pick and
        choose from in order to only use what you need. You will always need the{" "}
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
      <PackageLinks />
    </PackageTemplate>
  );
}
