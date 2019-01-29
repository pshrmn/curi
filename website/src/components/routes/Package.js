import React from "react";

import Page from "../layout/Page";
import BasePackage from "../package";

export default function PackagePage({ response }) {
  const { component: Component, contents } = response.data.content;
  return (
    <Page>
      <BasePackage
        name={response.data.name}
        params={response.params}
        versions={response.data.versions}
        latest={response.data.latest}
        globalName={response.data.globalName}
        script={response.data.script}
        contents={contents}
      >
        <Component />
      </BasePackage>
    </Page>
  );
}
