// misc
import CodeSplitting from "./misc/code-splitting";
import ScriptTags from "./misc/script-tags";
import ServerRendering from "./misc/server-rendering";
import SideEffect from "./misc/side-effect";
// react
import A11yReact from "./react/accessibility";
import ActiveLinksReact from "./react/active-links";
import AsyncNavReact from "./react/async-nav";
import AuthenticationReact from "./react/authentication";
import BasicReact from "./react/basic";
import BlockingNavigationReact from "./react/blocking-navigation";
import BreadcrumbsReact from "./react/breadcrumbs";
import DataLoadingReact from "./react/data-loading";
import ModalReact from "./react/modal";
import MultiBodyReact from "./react/multi-body";
import TransitionsReact from "./react/transitions";
// vue
import A11yVue from "./vue/accessibility";
import ActiveLinksVue from "./vue/active-links";
import AsyncNavVue from "./vue/async-nav";
import AuthenticationVue from "./vue/authentication";
import BasicVue from "./vue/basic";
import BlockingNavigationVue from "./vue/blocking-navigation";
import BreadcrumbsVue from "./vue/breadcrumbs";
import ModalVue from "./vue/modal";
import TransitionsVue from "./vue/transitions";
// svelte
import BasicSvelte from "./svelte/basic";
// full
import TwitchFull from "./full/twitch";

export default {
  misc: {
    "code-splitting": CodeSplitting,
    "script-tags": ScriptTags,
    "server-rendering": ServerRendering,
    "side-effect": SideEffect
  },
  react: {
    accessibility: A11yReact,
    "active-links": ActiveLinksReact,
    "async-nav": AsyncNavReact,
    authentication: AuthenticationReact,
    basic: BasicReact,
    "blocking-navigation": BlockingNavigationReact,
    breadcrumbs: BreadcrumbsReact,
    "data-loading": DataLoadingReact,
    modal: ModalReact,
    "multi-body": MultiBodyReact,
    transitions: TransitionsReact
  },
  svelte: {
    basic: BasicSvelte
  },
  vue: {
    accessibility: A11yVue,
    "active-links": ActiveLinksVue,
    "async-nav": AsyncNavVue,
    authentication: AuthenticationVue,
    basic: BasicVue,
    "blocking-navigation": BlockingNavigationVue,
    breadcrumbs: BreadcrumbsVue,
    modal: ModalVue,
    transitions: TransitionsVue
  },
  full: {
    twitch: TwitchFull
  }
};
