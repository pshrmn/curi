## Next

* Update `createServerHistory` import to new name: `create_server_history`.

## 1.0.0-beta.0

* `staticFiles` takes `history` option for passing history options.
* `staticFiles` uses `createServerHistory` to create lightweight history constructors.

## 1.0.0-alpha.7

* Use `InMemory` history constructor when creating router.

## 1.0.0-alpha.6

* Use named `InMemory` import (Hickory v2).

## 1.0.0-alpha.3

* Add dev guard to log to only call in development.

## 1.0.0-alpha.2

* Catch errors that occur while rendering/inserting/saving asynchronous routes.

## 1.0.0-alpha.1

* `render()` can return anything, not just a string. This supports more advanced output.
* `insert()` can accept anything as its first argument. The second argument is removed.
