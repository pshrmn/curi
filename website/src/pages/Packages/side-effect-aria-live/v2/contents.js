import { meta as ariaLiveMeta } from "./api/ariaLive";

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
    children: [ariaLiveMeta]
  }
];
