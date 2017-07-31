import versions from './versions';

const packages = [
  {
    name: 'core',
    version: versions['core'],
    globalName: 'Curi',
    type: 'core'
  },
  {
    name: 'addon-active',
    version: versions['addon-active'],
    globalName: 'CuriAddonActive',
    type: 'addon'
  },
  {
    name: 'addon-ancestors',
    version: versions['addon-ancestors'],
    globalName: 'CuriAddonAncestors',
    type: 'addon'
  },
  {
    name: 'addon-prefetch',
    version: versions['addon-prefetch'],
    globalName: 'CuriAddonPrefetch',
    type: 'addon'
  },
  {
    name: 'side-effect-title',
    version: versions['side-effect-title'],
    globalName: 'CuriSideEffectTitle',
    type: 'side-effect'
  },
  {
    name: 'side-effect-scroll',
    version: versions['side-effect-scroll'],
    globalName: 'CuriSideEffectScroll',
    type: 'side-effect'
  },
  {
    name: 'react',
    version: versions['react'],
    globalName: 'CuriReact',
    type: 'react'
  },
  {
    name: 'react-navigator',
    version: versions['react-navigator'],
    globalName: 'CuriReactNavigator',
    type: 'react'
  },
  {
    name: 'react-link',
    version: versions['react-link'],
    globalName: 'CuriReactLink',
    type: 'react'
  },
  {
    name: 'react-redirect',
    version: versions['react-redirect'],
    globalName: 'CuriReactRedirect',
    type: 'react'
  },
  {
    name: 'react-block',
    version: versions['react-block'],
    globalName: 'CuriReactBlock',
    type: 'react'
  },
  {
    name: 'react-curious',
    version: versions['react-curious'],
    globalName: 'CuriReactCurious',
    type: 'react'
  },
  {
    name: 'react-active',
    version: versions['react-active'],
    globalName: 'CuriReactActive',
    type: 'react'
  },
  {
    name: 'vue',
    version: versions['vue'],
    globalName: 'CuriVue',
    type: 'vue'
  }
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
