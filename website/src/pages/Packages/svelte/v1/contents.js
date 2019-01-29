import { meta as curiStoreMeta } from "./curiStore";
import { meta as LinkMeta } from "./link";

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
