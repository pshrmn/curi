import React from "react";

import TwoColumnPage from "../../components/layout/TwoColumnPage";
import PageMenu from "../../components/layout/PageMenu";
import BasePackage from "../../components/package";

export default function PackagePage({ response }) {
  let { sections, contents } = response.data.content;
  return (
    <TwoColumnPage
      base={
        <BasePackage
          name={response.data.name}
          params={response.params}
          versions={response.data.versions}
          latest={response.data.latest}
          globalName={response.data.globalName}
          script={response.data.script}
          sections={sections}
        />
      }
      menu={<PageMenu contents={contents} />}
    />
  );
}
