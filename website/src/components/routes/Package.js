import React from "react";

import Page from "../layout/Page";
import BasePackage from "../package";

export default function PackagePage({ response }) {
  const { content: Content } = response.data;
  return (
    <Page>
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
    </Page>
  );
}
