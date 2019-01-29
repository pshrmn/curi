import { meta as onceMeta } from "./once";
import { meta as preferDefaultMeta } from "./preferDefault";

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
