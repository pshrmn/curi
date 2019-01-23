import React from "react";

import {
  About,
  APIBlock,
  Section,
  Explanation,
  CodeBlock,
  IJS,
  Note
} from "../../../components/package/common";

export default class RouteActivePkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <About>
          <Explanation>
            <p>
              The <IJS>@curi/helpers</IJS> package provides functions that may
              be useful in a Curi application.
            </p>
          </Explanation>
        </About>
        <APIBlock>
          <Section title="once()" id="once">
            <Explanation>
              <p>
                <IJS>once()</IJS> takes a function as its argument and returns a
                new function. The first time the returned function is called, it
                will call the function passed to it and return its result. Every
                call after that will re-use the result from the first call.
              </p>
              <p>
                The <IJS>once()</IJS> function is useful for any async route{" "}
                <IJS>resolve</IJS> functions that only need to be called once.
              </p>
              <Note>
                This will not work for functions whose result depends on
                variables that will change for a route (i.e. loading data based
                on route params).
              </Note>
            </Explanation>
            <CodeBlock>
              {`import { once } from "@curi/helpers";
            
const routes = prepareRoutes([
  {
    name: "Menu",
    path: "menu",
    resolve: {
      // this function will be called every time the user
      // navigates to the "Menu" route
      nonCached: () => api.getItems(),
      // this function is only called the first time the
      // user navigates to the "Menu" route
      cached: once(() => api.getItems)
    }
  }
]);`}
            </CodeBlock>
          </Section>
          <Section title="preferDefault" id="preferDefault">
            <Explanation>
              <p>
                When using dynamic import syntax (<IJS>
                  import("someModule")
                </IJS>), the resolved module is a module object containing all
                of the exports from that module. If the module has a default
                export (<IJS>export default ...</IJS>), that will be the
                module's <IJS>default</IJS> property. The{" "}
                <IJS>preferDefault()</IJS> function will resolve with the{" "}
                <IJS>default</IJS> property of the module if it exists and with
                the module if it does not.
              </p>
            </Explanation>
            <CodeBlock>
              {`import { preferDefault } from "@curi/helpers";

const routes = prepareRoutes([
  {
    name: "Menu",
    path: "menu",
    resolve: {
      body: import("./components/Menu")
        .then(preferDefault)
    },
    response({ resolved }) {
      return { body: resolved.body }
    }
  }
]);`}
            </CodeBlock>
          </Section>
        </APIBlock>
      </React.Fragment>
    );
  }
}
