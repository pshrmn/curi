import React from "react";
import BaseExample from "../base/BaseExample";
import { Section } from "../../components/Sections";
import CodeSandboxDemo from "../../components/CodeSandboxDemo";
import {
  InlineJS as IJS,
  InlineComponent as Cmp,
  PrismBlock
} from "../../components/PrismBlocks";

export default ({ name }) => (
  <BaseExample>
    <h1>{name}</h1>
    <Section title="Explanation" id="explanation">
      <p>
        MobX is easy to integrate with a Curi project. To start, you should
        create a MobX store using the class provided by <IJS>@curi/mobx</IJS>.
        Then (assuming you are using React), you just need to use the{" "}
        <Cmp>Provider</Cmp> to make the store available to components and the{" "}
        <IJS>inject</IJS> and <IJS>observer</IJS> higher-order components to
        make components react to new responses.
      </p>

      <PrismBlock lang="javascript">
        {`import { CuriStore } from '@curi/mobx'
const curiStore = new CuriStore(router);

ReactDOM.render((
  <Provider curi={curiStore}>
    <CuriProvider router={router}>
      {render}
    </CuriProvider>
  </Provider>
), holder);
`}
      </PrismBlock>
    </Section>

    <Section title="Live Demo" id="demo">
      <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/mobx" />
    </Section>

    <Section title="On GitHub" id="source">
      If you want to run this code locally, the source code is available on
      GitHub{" "}
      <a href="https://github.com/pshrmn/curi/tree/master/examples/react/redux">
        here
      </a>.
    </Section>
  </BaseExample>
);
