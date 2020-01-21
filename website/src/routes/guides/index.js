import GUIDE_API from "../../constants/guides";
import GuideList from "./GuideList";
import Guide from "./Guide";
import * as Guide404 from "./404";
import catchImportError from "../catchImportError";

export default {
  name: "Guides",
  path: "guides/",
  respond: () => {
    return {
      body: GuideList,
      meta: {
        title: "Guides",
        description: "A list of Curi guides"
      }
    };
  },
  children: [
    {
      name: "Guide",
      path: ":slug/",
      resolve({ params }) {
        let guide = GUIDE_API.find(params.slug);
        let content = guide
          ? guide.import().catch(catchImportError(`guide: ${params.slug}`))
          : Guide404;
        return Promise.all([guide, content]);
      },
      respond: ({ resolved }) => {
        let [guide, content] = resolved;
        return {
          body: Guide,
          data: {
            content: content
          },
          meta: {
            title: guide ? `${guide.name} Guide` : "Guide Not Found",
            description: guide ? guide.description : "Guide Not Found"
          }
        };
      }
    }
  ]
};
