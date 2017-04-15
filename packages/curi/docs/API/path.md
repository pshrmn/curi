# Paths

## `path(path, options)`

Path takes a `path` string and an optional `options` object. The properties of the `options` object would be the [`path-to-regexp` options](https://github.com/pillarjs/path-to-regexp#usage). If you do not pass any options, the default ones will be used.

This will return an object with three properties:

* `re` - The regular expression generated from the provided `path` and `options`.
* `keys` - An array of param names parsed from the `path` string. This is used to extract the params from a pathname after executing the above regular expression.
* `path` - The `path` string that was passed to the function.

## `parentPath(path, options)`

The `parentPath` is a special type of `path` that always sets the `end` option to false. This should be used for routes that have children.
