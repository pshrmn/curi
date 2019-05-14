import PACKAGE_API from "../../constants/packages";
import PackageList from "./PackageList";
import Package from "./Package";
import * as Package404 from "./404";
import catchImportError from "../catchImportError";

const UNKNOWN_VERSION = "unknown version";

export default {
  name: "Packages",
  path: ":version(v\\d)/",
  respond: () => {
    return {
      body: PackageList,
      meta: {
        title: "Curi Packages",
        description: "A list of official Curi package"
      }
    };
  },
  children: [
    {
      name: "Package",
      path: "@curi/:package/",
      resolve({ params }) {
        const pkg = PACKAGE_API.find(params.package);
        if (!pkg) {
          return Promise.all([undefined, Package404]);
        }

        // for unknown versions, redirect to current version
        if (
          params.version === undefined ||
          (params.version && pkg.versions[params.version] === undefined)
        ) {
          return Promise.reject({
            type: UNKNOWN_VERSION,
            returns: {
              redirect: {
                name: "Package",
                params: {
                  package: params.package,
                  version: pkg.latest
                }
              }
            }
          });
        }

        const content = pkg
          ? pkg
              .import(params.version)
              .catch(catchImportError(`package: ${params.package}`))
          : Package404;
        return Promise.all([pkg, content]);
      },
      respond: ({ match, error, resolved }) => {
        if (error) {
          return error.returns;
        }

        const [pkg, content] = resolved;
        return {
          body: Package,
          meta: {
            title: pkg ? `@curi/${pkg.name}` : "Package not found",
            description: pkg
              ? `API documentation for @curi/${pkg.name}`
              : "Package not found"
          },
          data: {
            ...pkg,
            content
          }
        };
      }
    }
  ]
};
