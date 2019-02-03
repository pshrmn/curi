import { meta as curiProviderMeta } from "./api/curiProvider";
import { meta as LinkMeta } from "./api/link";
import { meta as useCuriMeta } from "./api/useCuri";
import { meta as useActiveMeta } from "./api/useActive";
import { meta as useNavigatingMeta } from "./api/useNavigating";
import { meta as useBlockMeta } from "./api/useBlock";
import { meta as useLocationMeta } from "./api/useLocation";
import { meta as useHrefMeta } from "./api/useHref";
import { meta as CuriousMeta } from "./api/curious";

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
      useCuriMeta,
      useActiveMeta,
      useNavigatingMeta,
      useBlockMeta,
      useLocationMeta,
      useHrefMeta,
      CuriousMeta
    ]
  }
];
