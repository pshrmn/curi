import { meta as CreateRouterComponentMeta } from "./api/createRouterComponent";
import { meta as LinkMeta } from "./api/link";
import { meta as AsyncLinkMeta } from "./api/asynclink";
import { meta as useResponseMeta } from "./api/useResponse";
import { meta as useRouterMeta } from "./api/useRouter";
import { meta as useActiveMeta } from "./api/useActive";
import { meta as useConfirmMeta } from "./api/useConfirm";
import { meta as useNavigatingMeta } from "./api/useNavigating";
import { meta as useURLMeta } from "./api/useURL";
import { meta as ResponseConsumerMeta } from "./api/responseconsumer";
import { meta as RouterConsumerMeta } from "./api/routerconsumer";

export default [
  {
    title: "Installation",
    hash: "installation"
  },
  {
    title: "About",
    hash: "about"
  },
  {
    title: "API",
    hash: "API",
    children: [
      CreateRouterComponentMeta,
      LinkMeta,
      AsyncLinkMeta,
      useResponseMeta,
      useRouterMeta,
      useActiveMeta,
      useConfirmMeta,
      useNavigatingMeta,
      useURLMeta,
      ResponseConsumerMeta,
      RouterConsumerMeta
    ]
  }
];
