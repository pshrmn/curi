# curi-addon-ancestors

[![npm][badge]][npm-link]

[badge]: https://img.shields.io/npm/v/curi-addon-ancestors.svg
[npm-link]: https://npmjs.com/package/curi-addon-ancestors

This package exports a Curi addon that can be used to get the name of a route's ancestor.

## Installation

```js
npm install --save curi-addon-ancestors
```

### UMD

```html
<script src="https://unpkg.com/curi-addon-ancestors@0.1.0/umd/curi-addon-ancestors.js"></script>
<!-- there is also a min script: curi-addon-ancestors.min.js -->
<script type="text/javascript">
  const createAncestorsAddon = window.CuriAddonAncestors;
</script>
```

The version number above may not always be accurate. To ensure that you are using the most
up to date version of the `curi` UMD build, open https://unpkg.com/curi-addon-ancestors/umd in your
browser and copy the link address for the `curi-addon-ancestors.js` file.. That will provide you
with the URI of the most recent release. There is also a minimized version of the bundle
if you change the file name in the URI to `curi-addon-ancestors.min.js`.

## Usage

The `ancestors` addon takes the name of the route and the ancestor "level" that you want to get. `1` refers to the route's parent`, `2` is its grandparent, etc. If the provided value is not a positive integer or if there is no ancestor at the requested level, the addon will return `undefined`.

```js
import createConfig from 'curi';
import createAncestorsAddon from 'curi-addon-ancestors';

const config = createConfig(
  history,
  [
    {
      name: 'Grandparent',
      path: '0',
      children: [
        {
          name: 'Parent',
          path: '1',
          children: [
            {
              name: 'Child',
              path: '2'
            }
          ]
        }
      ]
    }
  ],
  { addons: [createAncestorsAddon] }
);

const parent = config.addons.ancestors('Child', 1);
// parent === 'Parent'
```

If the level value is `undefined` (or `null`), then you will receive the array of all ancestors. This can be used to build breadcrumbs for a given route.

```js
const Breadcrumbs = ({ name, curi }) => {
  return (
    <li>
      {
        curi.addons.ancestors(name).map(n => (
          <Link to={n}>{n}</Link>
        ))
      }
    </li>
  )
}
```
