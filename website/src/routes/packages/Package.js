import React from "react";

import FancyPage from "../../components/layout/FancyPage";
import PageMenu from "../../components/layout/PageMenu";
import BasePackage from "../../components/package";

export default function PackagePage({ response }) {
  const { component: Component, contents } = response.data.content;
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
        >
          <Component />
        </BasePackage>
      }
      menu={<PageMenu contents={contents} />}
    />
  );
}
