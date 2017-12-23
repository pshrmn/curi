// misc
import CodeSplitting from './misc/CodeSplitting';
import ScriptTags from './misc/ScriptTags';
import ServerRendering from './misc/ServerRendering';
import SideEffect from './misc/SideEffect';
// react
import ActiveLinks from './react/ActiveLinks';
import Authentication from './react/Authentication';
import BlockingNavigation from './react/BlockingNavigation';
import Breadcrumbs from './react/Breadcrumbs';
import DataLoading from './react/DataLoading';
import Modal from './react/Modal';
import MultiBody from './react/MultiBody';
import Redux from './react/Redux';
import Transitions from './react/Transitions';
// vue
import BasicVue from './vue/Basic';
import BlockingNavigationVue from './vue/BlockingNavigation';
import BreadcrumbsVue from './vue/Breadcrumbs';
// svelte
import BasicSvelte from './svelte/Basic';


export default {
  misc: {
    'code-splitting': CodeSplitting,
    'script-tags': ScriptTags,
    'server-rendering': ServerRendering,
    'side-effect': SideEffect
  },
  react: {
    'active-links': ActiveLinks,
    'authentication': Authentication,
    'blocking-navigation': BlockingNavigation,
    'breadcrumbs': Breadcrumbs,
    'data-loading': DataLoading,
    'modal': Modal,
    'multi-body': MultiBody,
    'redux': Redux,
    'transitions': Transitions
  },
  svelte: {
    'basic': BasicSvelte
  },
  vue: {
    'basic': BasicVue,
    'blocking-navigation': BlockingNavigationVue,
    'breadcrumbs': BreadcrumbsVue
  }
}

