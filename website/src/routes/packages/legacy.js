import PACKAGE_API from "../../constants/packages";
import PackageList from "./PackageList";
import Package from "./Package";
import * as Package404 from "./404";
import catchImportError from "../catchImportError";

let UNKNOWN_VERSION = "unknown version";

export default {
  name: "Legacy Packages",
  path: "packages/",
  respond: () => {
    return {
      redirect: {
        name: "Packages",
        params: { version: "v2" }
      }
    };
  },
  children: [
    {
      name: "Legacy Package",
      path: "@curi/:package/:version(v\\d)?/",
      respond: ({ match }) => {
        return {
          redirect: {
            name: "Package",
            params: match.params
          }
        };
      }
    }
  ]
};
