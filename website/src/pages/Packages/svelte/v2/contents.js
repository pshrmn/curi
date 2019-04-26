import { meta as curiStoresMeta } from "./api/curiStores";
import { meta as RouterMeta } from "./api/router";
import { meta as LinkMeta } from "./api/link";
import { meta as AsyncLinkMeta } from "./api/asynclink";
import { meta as NavigatingMeta } from "./api/navigating";

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
      curiStoresMeta,
      RouterMeta,
      LinkMeta,
      AsyncLinkMeta,
      NavigatingMeta
    ]
  }
];
