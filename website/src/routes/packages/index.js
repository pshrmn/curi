import PACKAGE_API from "../../constants/packages";
import PackageList from "./PackageList";
import Package from "./Package";
import * as Package404 from "./404";
import catchImportError from "../catchImportError";

const DOES_NOT_EXIST = "does not exist";
const UNKNOWN_VERSION = "unknown version";

export default {
  name: "Packages",
  path: "packages/",
  response: () => {
    return {
      body: PackageList,
      title: "Curi Packages"
    };
  },
  children: [
    {
      name: "Package",
      path: "@curi/:package/:version(v\\d)?/",
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
      response: ({ match, error, resolved }) => {
        if (error) {
          return error.returns;
        }

        const [pkg, content] = resolved;
        return {
          body: Package,
          title: pkg ? `@curi/${pkg.name}` : "Package not found",
          data: {
            ...pkg,
            content
          }
        };
      }
    }
  ]
};
