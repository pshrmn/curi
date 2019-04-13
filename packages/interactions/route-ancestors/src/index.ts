import { Route, Interaction } from "@curi/types";

export default function ancestors(): Interaction {
  let scoped: { [key: string]: Array<string> } = {};

  function get(name: string, level: number): string;
  function get(name: string): Array<string>;
  function get(name: string, level?: number) {
    const ancestors = scoped[name];
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
      parentRoutes: Array<string> = []
    ): Array<string> => {
      let { name } = route;
      scoped[name] = parentRoutes;
      return [name].concat(parentRoutes);
    },
    get
  };
}
