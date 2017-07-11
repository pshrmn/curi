import Curi from './Curi'
import CuriAddonActive from './CuriAddonActive';
import CuriAddonAncestors from './CuriAddonAncestors';
import CuriAddonPrefetch from './CuriAddonPrefetch';
import CuriSideEffectTitle from './CuriSideEffectTitle';
import CuriSideEffectScroll from './CuriSideEffectScroll'
import CuriReact from './CuriReact';
import CuriReactNavigator from './CuriReactNavigator';
import CuriReactLink from './CuriReactLink';
import CuriReactRedirect from './CuriReactRedirect';
import CuriReactBlock from './CuriReactBlock';
import CuriReactCurious from './CuriReactCurious';
import CuriReactActive from './CuriReactActive';
import CuriVue from './CuriVue';

const packages = [
  Curi,
  CuriAddonActive,
  CuriAddonAncestors,
  CuriAddonPrefetch,
  CuriSideEffectTitle,
  CuriSideEffectScroll,
  CuriReact,
  CuriReactNavigator,
  CuriReactLink,
  CuriReactRedirect,
  CuriReactBlock,
  CuriReactCurious,
  CuriReactActive,
  CuriVue
];

export const groupedPackages = packages.reduce((acc, curr) => {
  if (!acc[curr.type]) {
    acc[curr.type] = [curr];
  } else {
    acc[curr.type].push(curr);
  }
  return acc;
}, {});

export const byName = packages.reduce((acc, curr) => {
  acc[curr.name] = curr;
  return acc;
}, {});

export default packages;