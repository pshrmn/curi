import { meta as curiProviderMeta } from "./curiProvider";
import { meta as LinkMeta } from "./link";
import { meta as CuriousMeta } from "./curious";
import { meta as ActiveMeta } from "./active";
import { meta as NavigatingMeta } from "./navigating";
import { meta as BlockMeta } from "./block";

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
    children: [
      curiProviderMeta,
      LinkMeta,
      CuriousMeta,
      ActiveMeta,
      NavigatingMeta,
      BlockMeta
    ]
  }
];
