import { Interaction, Route, Params } from "@curi/types";

function generate_pathname(): Interaction {
  let known: { [key: string]: (params?: Params) => string } = {};
  let already_compiled: { [key: string]: string } = {};
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
      const hash = `${name}${JSON.stringify(params)}`;
      if (already_compiled[hash]) {
        return already_compiled[hash];
      }

      const output = known[name](params);
      already_compiled[hash] = output;
      return output;
    }
  };
}

export default generate_pathname;
