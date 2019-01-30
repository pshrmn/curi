import { meta as curiPluginMeta } from "./api/curiPlugin";
import { meta as linkMeta } from "./api/link";
import { meta as blockMeta } from "./api/block";
import { meta as focusMeta } from "./api/focus";

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
    children: [curiPluginMeta, linkMeta, blockMeta, focusMeta]
  }
];
