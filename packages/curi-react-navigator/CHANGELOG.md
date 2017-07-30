## Next

* Switch from using `children` to `render`. This enforces there being only one way to render (instead of using either as the `children` prop or the implicit `children`).

```js
// new
<Navigator render={fn} />

// old
<Navigator children={fn} />
// or
<Navigator>
  {fn}
</Navigator>
```

## 1.0.0-beta.1

* Getting close to where this should be ready for release, so switching to beta version.

## 0.3.0

* New build (uses Rollup to output a single file for each build type).
