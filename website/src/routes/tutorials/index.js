import TUTORIAL_API from "../../constants/tutorials";
import TutorialList from "./TutorialList";
import Tutorial from "./Tutorial";
import * as Tutorial404 from "./404";
import catchImportError from "../catchImportError";

export default {
  name: "Tutorials",
  path: "tutorial/",
  response: () => {
    return {
      body: TutorialList,
      title: "Tutorials"
    };
  },
  children: [
    {
      name: "Tutorial",
      path: ":slug/",
      resolve({ params }) {
        const tutorial = TUTORIAL_API.find(params.slug);
        const content = tutorial
          ? tutorial
              .import()
              .catch(catchImportError(`tutorial: ${params.slug}`))
          : Tutorial404;

        return Promise.all([tutorial, content]);
      },
      response: ({ resolved }) => {
        const [tutorial, content] = resolved;
        return {
          body: Tutorial,
          data: {
            content: content
          },
          title: tutorial ? `Tutorial ${tutorial.title}` : "Tutorial Not Found"
        };
      }
    }
  ]
};
