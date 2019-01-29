import { meta as staticFilesMeta } from "./staticFiles";
import { meta as pathnamesMeta } from "./pathnames";

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
    children: [staticFilesMeta, pathnamesMeta]
  }
];
