import { Interaction, Route, Params } from "@curi/types";

export default function generatePathname(): Interaction {
  let known: { [key: string]: (params?: Params) => string } = {};
  return {
    name: "pathname",
    register: (route: Route) => {
      known[route.name] = route.pathname;
    },
    get: (name: string, params: Params): string | void => {
      if (known[name] == null) {
        if (process.env.NODE_ENV !== "production") {
          console.error(
            `Could not generate pathname for ${name} because it is not registered.`
          );
        }
        return;
      }
      return known[name](params);
    }
  };
}
