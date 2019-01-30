import { meta as onceMeta } from "./api/once";
import { meta as preferDefaultMeta } from "./api/preferDefault";

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
    children: [onceMeta, preferDefaultMeta]
  }
];
