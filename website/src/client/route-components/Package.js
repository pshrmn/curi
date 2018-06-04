import React from "react";

import { InlineJS } from "../components/PrismBlocks";
import PackageComponents from "../pages/Packages";

export default ({ response }) => {
  if (!response.data) {
    return (
      <div>
        The package <InlineJS>{response.params.package}</InlineJS> could not be
        found
      </div>
    );
  }
  const Component = PackageComponents[response.params.package];
  const { name, version, globalName } = response.data;
  return <Component name={name} version={version} globalName={globalName} />;
};
