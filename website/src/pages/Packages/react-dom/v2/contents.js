import { meta as curiProviderMeta } from "./api/curiProvider";
import { meta as LinkMeta } from "./api/link";
import { meta as useCuriMeta } from "./api/useCuri";
import { meta as useActiveMeta } from "./api/useActive";
import { meta as useNavigationFocusMeta } from "./api/useNavigationFocus";
import { meta as useNavigatingMeta } from "./api/useNavigating";
import { meta as useBlockMeta } from "./api/useBlock";
import { meta as useLocationMeta } from "./api/useLocation";
import { meta as useHrefMeta } from "./api/useHref";
import { meta as FocusMeta } from "./api/focus";
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
      useCuriMeta,
      useActiveMeta,
      useNavigationFocusMeta,
      useNavigatingMeta,
      useBlockMeta,
      useLocationMeta,
      useHrefMeta,
      FocusMeta,
      CuriousMeta,
      ActiveMeta,
      NavigatingMeta,
      BlockMeta
    ]
  }
];
