import versions from './versions';

const packages = [
  {
    name: 'curi',
    version: versions['curi'],
    globalName: 'Curi',
    type: 'base'
  },
  {
    name: 'curi-addon-active',
    version: versions['curi-addon-active'],
    globalName: 'CuriAddonActive',
    type: 'addon'
  },
  {
    name: 'curi-addon-ancestors',
    version: versions['curi-addon-ancestors'],
    globalName: 'CuriAddonAncestors',
    type: 'addon'
  },
  {
    name: 'curi-addon-prefetch',
    version: versions['curi-addon-prefetch'],
    globalName: 'CuriAddonPrefetch',
    type: 'addon'
  },
  {
    name: 'curi-side-effect-title',
    version: versions['curi-side-effect-title'],
    globalName: 'CuriSideEffectTitle',
    type: 'side-effect'
  },
  {
    name: 'curi-side-effect-scroll',
    version: versions['curi-side-effect-scroll'],
    globalName: 'CuriSideEffectScroll',
    type: 'side-effect'
  },
  {
    name: 'curi-react',
    version: versions['curi-react'],
    globalName: 'CuriReact',
    type: 'react'
  },
  {
    name: 'curi-react-navigator',
    version: versions['curi-react-navigator'],
    globalName: 'CuriReactNavigator',
    type: 'react'
  },
  {
    name: 'curi-react-link',
    version: versions['curi-react-link'],
    globalName: 'CuriReactLink',
    type: 'react'
  },
  {
    name: 'curi-react-redirect',
    version: versions['curi-react-redirect'],
    globalName: 'CuriReactRedirect',
    type: 'react'
  },
  {
    name: 'curi-react-block',
    version: versions['curi-react-block'],
    globalName: 'CuriReactBlock',
    type: 'react'
  },
  {
    name: 'curi-react-curious',
    version: versions['curi-react-curious'],
    globalName: 'CuriReactCurious',
    type: 'react'
  },
  {
    name: 'curi-react-active',
    version: versions['curi-react-active'],
    globalName: 'CuriReactActive',
    type: 'react'
  },
  {
    name: 'curi-vue',
    version: versions['curi-vue'],
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
