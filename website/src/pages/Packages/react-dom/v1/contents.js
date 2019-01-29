import { meta as curiProviderMeta } from "./curiProvider";
import { meta as LinkMeta } from "./link";
import { meta as FocusMeta } from "./focus";
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
      FocusMeta,
      CuriousMeta,
      ActiveMeta,
      NavigatingMeta,
      BlockMeta
    ]
  }
];
