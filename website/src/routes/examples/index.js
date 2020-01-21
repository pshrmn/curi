import { preferDefault } from "@curi/helpers";

import EXAMPLE_API from "../../constants/examples";
import ExampleList from "./ExampleList";
import Example from "./Example";
import * as Example404 from "./404";
import catchImportError from "../catchImportError";

export default {
  name: "Examples",
  path: "examples/",
  respond: () => {
    return {
      body: ExampleList,
      meta: {
        title: "Examples",
        description: "A list of Curi example projects"
      }
    };
  },
  children: [
    {
      name: "Example",
      path: ":slug/",
      resolve({ params }) {
        let example = EXAMPLE_API.find(params.slug);
        let content = example
          ? example
              .load()
              .then(preferDefault, catchImportError(`example: ${params.slug}`))
          : Example404;
        return Promise.all([example, content]);
      },
      respond: ({ resolved }) => {
        let [example, content] = resolved;
        return {
          body: Example,
          data: {
            content
          },
          meta: {
            title: example ? `${example.name} Example` : "Example Not Found",
            description: example
              ? `${example.name} Example`
              : "Example Not Found"
          }
        };
      }
    },
    {
      name: "Legacy Example",
      path: ":category/:slug/",
      respond: ({ match }) => {
        return {
          redirect: {
            name: "Example",
            params: { slug: match.params.slug }
          }
        };
      }
    }
  ]
};
