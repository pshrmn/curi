import React from "react";

import { InlineJS } from "../components/PrismBlocks";
import PackageComponents from "../pages/Packages";

export default ({ params, data }) => {
  if (!data) {
    return (
      <div>
        The package <InlineJS>{params.package}</InlineJS> could not be found
      </div>
    );
  }
  const Component = PackageComponents[params.package];
  const { name, version, globalName } = data;
  return <Component name={name} version={version} globalName={globalName} />;
};
