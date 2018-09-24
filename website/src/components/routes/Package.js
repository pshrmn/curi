import React from "react";

import PackageComponents from "../../pages/Packages";
import PackageTemplate from "../templates/Package";
import BasePackage from "../package";
import { InlineJS as IJS } from "../highlight/Inline";

export default function PackagePage({ response }) {
  if (!response.data) {
    return (
      <PackageTemplate>
        <div>
          The package <IJS>{response.params.package}</IJS> could not be found
        </div>
      </PackageTemplate>
    );
  }

  const Component = PackageComponents[response.params.package];
  const { name, version, globalName, script } = response.data;
  return (
    <PackageTemplate>
      <BasePackage
        name={name}
        version={version}
        globalName={globalName}
        script={script}
      >
        <Component />
      </BasePackage>
    </PackageTemplate>
  );
}
