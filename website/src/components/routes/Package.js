import React from "react";

import PackageTemplate from "../templates/Package";
import BasePackage from "../package";
import { InlineJS as IJS } from "../highlight/Inline";

export default function PackagePage({ response }) {
  const { content: Content } = response.data;
  return (
    <PackageTemplate>
      <BasePackage
        name={response.data.name}
        params={response.params}
        versions={response.data.versions}
        latest={response.data.latest}
        globalName={response.data.globalName}
        script={response.data.script}
      >
        <Content />
      </BasePackage>
    </PackageTemplate>
  );
}
