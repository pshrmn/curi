import React from "react";

import PackageTemplate from "../templates/Package";
import BasePackage from "../package";
import { InlineJS as IJS } from "../highlight/Inline";

export default function PackagePage({ response }) {
  const { content: Content, name, version, globalName, script } = response.data;
  return (
    <PackageTemplate>
      <BasePackage
        name={name}
        version={version}
        globalName={globalName}
        script={script}
      >
        <Content />
      </BasePackage>
    </PackageTemplate>
  );
}
