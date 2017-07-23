import ActiveLinks from './ActiveLinks';
import BasicVue from './BasicVue';
import BlockingNavigation from './BlockingNavigation';
import Breadcrumbs from './Breadcrumbs';
import CodeSplitting from './CodeSplitting';
import DataLoading from './DataLoading';
import Modal from './Modal';
import Redirecting from './Redirecting';
import Redux from './Redux';
import ScriptTags from './ScriptTags';
import ServerRendering from './ServerRendering';
import SideEffect from './SideEffect';
import Transitions from './Transitions';

const examples = [
  ActiveLinks,
  BasicVue,
  BlockingNavigation,
  Breadcrumbs,
  CodeSplitting,
  DataLoading,
  Modal,
  Redirecting,
  Redux,
  ScriptTags,
  ServerRendering,
  SideEffect,
  Transitions
];

export const byName = examples.reduce((acc, curr) => {
  acc[curr.slug] = curr;
  return acc;
}, {});

export default examples;
