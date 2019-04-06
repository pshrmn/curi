## 1.0.0-beta.5

* Rename `get_router_options` to `options`.

## 1.0.0-beta.4

* Import common Curi types from `@curi/types`.

## 1.0.0-beta.3

* `pathnames` uses `in_memory` history

## 1.0.0-beta.2

* Use `create_router` export from `@curi/router`.

## 1.0.0-beta.1

* Rename `staticFiles` to `static_files`.
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
