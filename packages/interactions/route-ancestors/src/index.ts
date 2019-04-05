import { Route, Interaction } from "@curi/types";

export default function ancestors(): Interaction {
  let route_ancestors: { [key: string]: Array<string> } = {};

  function get(name: string, level: number): string;
  function get(name: string): Array<string>;
  function get(name: string, level?: number) {
    const ancestors = route_ancestors[name];
    if (!ancestors) {
      return;
    }
    if (level == null) {
      return ancestors.slice();
    }
    if (level <= 0) {
      return;
    }
    return ancestors[level - 1];
  }

  return {
    name: "ancestors",
    register: (
      route: Route,
      parent_routes: Array<string> = []
    ): Array<string> => {
      let { name } = route;
      route_ancestors[name] = parent_routes;
      return [name, ...parent_routes];
    },
    get,
    reset() {
      route_ancestors = {};
    }
  };
}
