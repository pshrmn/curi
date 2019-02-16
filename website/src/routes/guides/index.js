import GUIDE_API from "../../constants/guides";
import GuideList from "./GuideList";
import Guide from "./Guide";
import * as Guide404 from "./404";
import catchImportError from "../catchImportError";

export default {
  name: "Guides",
  path: "guides/",
  response: () => {
    return {
      body: GuideList,
      title: "Guides"
    };
  },
  children: [
    {
      name: "Guide",
      path: ":slug/",
      resolve({ params }) {
        const guide = GUIDE_API.find(params.slug);
        const content = guide
          ? guide.import().catch(catchImportError(`guide: ${params.slug}`))
          : Guide404;
        return Promise.all([guide, content]);
      },
      response: ({ resolved }) => {
        const [guide, content] = resolved;
        return {
          body: Guide,
          data: {
            content: content
          },
          title: guide ? `${guide.name} Guide` : "Guide Not Found"
        };
      }
    }
  ]
};