import { meta as curiPluginMeta } from "./curiPlugin";
import { meta as linkMeta } from "./link";
import { meta as blockMeta } from "./block";
import { meta as focusMeta } from "./focus";

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
