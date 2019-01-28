# Contribution Guide

## Creating a new branch

Curi's `master` branch is used for currently released code. The `dev` branch is used for unreleased code.

Pull requests for packages should be made from branches checked out from `dev`, while pull requests that update the documentation website or examples (i.e. changes that would be applied immediately) can be made against the `master` branch.

```bash
git clone https://github.com/<your_username>/curi.git
cd curi

# add the original repo as a remote repo
git remote add upstream

# for PRs that touch packages
git checkout dev
git checkout -b <pr_branch_name>

# for PRs that only touch docs/examples
git checkout master
git checkout -b <pr_branch_name>
```

**Note:** The `dev` branch may periodically be force pushed when documentation/example PRs are merged into `master`. If this affects your PR, you can rebase your local `dev` branch from the upstream repo and rebase your PR off of that.

```bash
git checkout dev
git pull --rebase upstream dev
git checkout <pr_branch_name>
git rebase dev
```

## Monorepo

Curi uses [Lerna](https://github.com/lerna/lerna) to manage its monorepo.

There are three locations for packages within the monorepo:

- `packages` contains all of the packages that are published to NPM
- `website` contains the documentation website package
- `examples` contains the source code for example applications

**Note:** All command line scripts should be run from the root directory.

### Installation

You can call `npm install` from the command line to install the dependencies for each package. This will also build all of the NPM packages (those in the `packages` directory).

```bash
npm install
```

## NPM Packages

The packages in `packages` all contain a `src` directory for source code and a `tests` directory for testing (using Jest).

## Example Packages

The examples packages are linked to the NPM packages so that they run off the latest (possibly unpublished) code. For each example, you can build it using `npm run example:build` and serve it using `npm run example:serve`.

```bash
# build the example
npm run example:build -- <example-dir>/<example-name> <type>
# for example
npm run example:build -- react/active-links react

# serve the example (port 8000)
npm run example:serve -- <example-dir>/<example-name>
# for example
npm run example:serve -- react/active-links
```

## Documentation Website Package

The documentation website's code is in the `website` directory.

If you need to run the site locally, you can call `npm run website:dev` to build and run it. The site will run on port `8080`. This will setup hot module reloading, so the website will reload automatically when you save.

```bash
npm run website:dev
```

The content for the packages, guides, examples, and tutorials live in the `website/src/pages` directory.

## Building

You can build all of the packages using `npm run build`.

```bash
npm run build
```

If you only want to build one package at a time, you can do this with `lerna exec` by specifying which package you want to build.

```bash
npx lerna exec --scope=@curi/<package_name> -- npm run build
# build the react-universal bundles
npx lerna exec --scope=@curi/react-universal -- npm run build
```

## Testing

Each package is setup to test its source code, its CJS build, and its UMD build (for packages that build one).

```bash
# run all tests for a package (source, CJS, UMD)
npx lerna exec --scope=@curi/<package_name> -- npm test
```

During development, it is often easiest to only run tests against the source code (especially with `watch` mode on).

```bash
# run source tests in watch mode
npx lerna exec --scope=@curi/<package_name> -- npx jest --watch
```

## Submitting a PR

When submitting a PR, make sure to submit it against the correct branch. If the PR touches any of the NPM packages, submit it against the `dev` branch. If the PR does not touch any packages, it should be submitted against the `master` branch\*.

\* If the PR doesn't touch any NPM packages, but is related to unreleased changes, then it should be made against the `dev` branch.
