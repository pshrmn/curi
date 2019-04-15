import { meta as curiStoreMeta } from "./api/curiStore";
import { meta as LinkMeta } from "./api/link";
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
    children: [curiStoreMeta, LinkMeta, NavigatingMeta]
  }
];
