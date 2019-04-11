import { meta as CreateRouterComponentMeta } from "./api/create_router_component";
import { meta as LinkMeta } from "./api/link";
import { meta as AsyncLinkMeta } from "./api/asynclink";
import { meta as useResponseMeta } from "./api/useResponse";
import { meta as useRouterMeta } from "./api/useRouter";
import { meta as useActiveMeta } from "./api/useActive";
import { meta as useNavigatingMeta } from "./api/useNavigating";
import { meta as useLocationMeta } from "./api/useLocation";
import { meta as useHrefMeta } from "./api/useHref";
import { meta as CuriousMeta } from "./api/curious";

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
      useNavigatingMeta,
      useLocationMeta,
      useHrefMeta,
      CuriousMeta
    ]
  }
];
