import { preferDefault } from "@curi/helpers";

import EXAMPLE_API from "../../constants/examples";
import ExampleList from "./ExampleList";
import Example from "./Example";
import * as Example404 from "./404";
import catchImportError from "../catchImportError";

export default {
  name: "Examples",
  path: "examples/",
  response: () => {
    return {
      body: ExampleList,
      title: "Examples"
    };
  },
  children: [
    {
      name: "Example",
      path: ":category/:slug/",
      resolve({ params }) {
        const example = EXAMPLE_API.find(params.category, params.slug);

        const content = example
          ? example
              .import()
              .then(
                preferDefault,
                catchImportError(`example: ${params.category}/${params.slug}`)
              )
          : Example404;
        return Promise.all([example, content]);
      },
      response: ({ resolved }) => {
        const [example, content] = resolved;
        return {
          body: Example,
          data: {
            content
          },
          title: example ? `${example.name} Example` : "Example Not Found"
        };
      }
    }
  ]
};
