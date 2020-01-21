import React from "react";

import FancyPage from "../../components/layout/FancyPage";
import PageMenu from "../../components/layout/PageMenu";
import BasePackage from "../../components/package";

export default function PackagePage({ response }) {
  let { sections, contents } = response.data.content;
  return (
    <FancyPage
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
