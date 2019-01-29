import { meta as curiStoreMeta } from "./api/curiStore";
import { meta as LinkMeta } from "./api/link";

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
    children: [curiStoreMeta, LinkMeta]
  }
];
