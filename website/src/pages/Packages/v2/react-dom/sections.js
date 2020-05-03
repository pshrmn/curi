import React from "react";
import { Link } from "@curi/react-dom";

import {
  About,
  Paragraph,
  APIBlock,
  IJS
} from "../../../../components/package/common";
import { CreateRouterComponentAPI } from "./api/createRouterComponent";
import { LinkAPI } from "./api/link";
import { AsyncLinkAPI } from "./api/asynclink";
import { UseResponseAPI } from "./api/useResponse";
import { UseRouterAPI } from "./api/useRouter";
import { UseActiveAPI } from "./api/useActive";
import { UseConfirmAPI } from "./api/useConfirm";
import { UseNavigationFocusAPI } from "./api/useNavigationFocus";
import { UseNavigatingAPI } from "./api/useNavigating";
import { UseURLAPI } from "./api/useURL";
import { ResponseConsumerAPI } from "./api/responseconsumer";
import { RouterConsumerAPI } from "./api/routerconsumer";

export default {
  about: (
    <About>
      <Paragraph>
        The <IJS>@curi/react-dom</IJS> package provides a number of React
        components that you can use for rendering your application.
      </Paragraph>
      <Paragraph>
        For more information on using Curi with React DOM, please check out the{" "}
        <Link name="Guide" params={{ slug: "react-dom" }}>
          React DOM guide
        </Link>
        .
      </Paragraph>
    </About>
  ),
  api: (
    <APIBlock>
      <CreateRouterComponentAPI />
      <LinkAPI />
      <AsyncLinkAPI />
      <UseResponseAPI />
      <UseRouterAPI />
      <UseActiveAPI />
      <UseConfirmAPI />
      <UseNavigationFocusAPI />
      <UseNavigatingAPI />
      <UseURLAPI />
      <ResponseConsumerAPI />
      <RouterConsumerAPI />
    </APIBlock>
  )
};
