import { meta as pathnameMeta } from "./api/pathname";
import { meta as activeMeta } from "./api/active";
import { meta as ancestorsMeta } from "./api/ancestors";
import { meta as prefetchMeta } from "./api/prefetch";

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
    children: [pathnameMeta, activeMeta, ancestorsMeta, prefetchMeta]
  }
];
