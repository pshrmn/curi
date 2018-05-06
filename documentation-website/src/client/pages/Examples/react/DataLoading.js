import React from "react";
import BaseExample from "../base/BaseExample";
import { PrismBlock, InlineJS as IJS } from "../../../components/PrismBlocks";
import { Section } from "../../../components/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";

export default ({ name }) => (
  <BaseExample>
    <h1>{name}</h1>
    <Section title="Explanation" id="explanation">
      <p>
        When a user navigates to one of your routes, the re-rendering will not
        be triggered until a response has been created. If the route that
        matches has a <IJS>on.every()</IJS> function that makes a request to the
        server, the re-render will be delayed, possibly giving the user the
        impression that nothing is happening. One way that you can attempt to
        show that something is happening is by adding a loading bar to your page
        that will demonstrate to the user that their request is going through.
      </p>

      <p>
        The <IJS>nprogress</IJS> package allows you to render a loading bar that
        will run across the top of your page. There are many possible solutions,
        but this one has a simple api (<IJS>start()</IJS> and <IJS>done()</IJS>),
        so it works well for our example. The basis of what we will do is to
        tell <IJS>nprogress</IJS> to start when the user clicks a link, and then
        when we re-render, we tell <IJS>nprogress</IJS> that we are done
        loading.
      </p>

      <PrismBlock lang="javascript">
        {`// when the user clicks a <Link>
nprogress.start();
// when we are re-rendering
nprogress.done();
`}
      </PrismBlock>
    </Section>

    <Section title="Live Demo" id="demo">
      <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/data-loading" />
    </Section>

    <Section title="On GitHub" id="source">
      If you want to run this code locally, the source code is available on
      GitHub{" "}
      <a href="https://github.com/pshrmn/curi/tree/master/examples/react/data-loading">
        here
      </a>.
    </Section>
  </BaseExample>
);
