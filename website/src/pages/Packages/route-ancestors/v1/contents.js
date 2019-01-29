import { meta as ancestorsMeta } from "./api/ancestors";

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
    children: [ancestorsMeta]
  }
];
