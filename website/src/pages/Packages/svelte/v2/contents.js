import { meta as RouterMeta } from "./api/router";
import { meta as LinkMeta } from "./api/link";
import { meta as AsyncLinkMeta } from "./api/asynclink";
import { meta as NavigatingMeta } from "./api/navigating";
import { meta as getRouterMeta } from "./api/getRouter";
import { meta as getResponseMeta } from "./api/getResponse";
import { meta as getNavigationMeta } from "./api/getNavigation";
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
      RouterMeta,
      LinkMeta,
      AsyncLinkMeta,
      NavigatingMeta,
      getRouterMeta,
      getResponseMeta,
      getNavigationMeta
    ]
  }
];
