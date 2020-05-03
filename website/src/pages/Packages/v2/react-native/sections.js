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
import { UseNavigatingAPI } from "./api/useNavigating";
import { UseURLAPI } from "./api/useURL";
import { ResponseConsumerAPI } from "./api/responseconsumer";
import { RouterConsumerAPI } from "./api/routerconsumer";

export default {
  about: (
    <About>
      <Paragraph>
        The <IJS>@curi/react-native</IJS> package provides components to use
        Curi routing in a React Native application.
      </Paragraph>
      <Paragraph>
        For more information on using Curi with React Native, please check out
        the{" "}
        <Link name="Guide" params={{ slug: "react-native" }}>
          React Native guide
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
      <UseNavigatingAPI />
      <UseURLAPI />
      <ResponseConsumerAPI />
      <RouterConsumerAPI />
    </APIBlock>
  )
};
