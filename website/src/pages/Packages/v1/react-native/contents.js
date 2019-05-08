import { meta as curiProviderMeta } from "./api/curiProvider";
import { meta as LinkMeta } from "./api/link";
import { meta as CuriousMeta } from "./api/curious";
import { meta as ActiveMeta } from "./api/active";
import { meta as NavigatingMeta } from "./api/navigating";
import { meta as BlockMeta } from "./api/block";

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
