import { meta as staticFilesMeta } from "./api/static_files";
import { meta as pathnamesMeta } from "./api/pathnames";

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
