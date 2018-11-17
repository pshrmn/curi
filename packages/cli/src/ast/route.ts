import * as t from "@babel/types";

export function createRoute(name: string, path: string): t.ObjectExpression {
  return t.objectExpression([
    t.objectProperty(t.identifier("name"), t.stringLiteral(name)),
    t.objectProperty(t.identifier("path"), t.stringLiteral(path))
  ]);
}
