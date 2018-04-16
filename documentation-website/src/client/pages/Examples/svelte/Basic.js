import React from "react";
import BaseExample from "../base/BaseExample";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../../components/PrismBlocks";
import { Note } from "../../../components/Messages";
import { Section } from "../../../components/Sections";

export default ({ name }) => (
  <BaseExample>
    <h1>{name}</h1>
    <Section title="Explanation" id="explanation">
      <p>There are a couple things to keep in mind when using Svelte:</p>
      <p>
        The first is that <Cmp>Link</Cmp>s need to access your Curi router in
        order to navigate/create <IJS>href</IJS>s. In theory you can pass this
        purely through component attributes, but that can get old quite quickly.
        Instead, <IJS>@curi/svelte</IJS> provides a <IJS>setrouter</IJS>{" "}
        function to store your router, allowing the <Cmp>Link</Cmp> to just
        import it. Once you have created your router, you should call{" "}
        <IJS>setrouter(router)</IJS> (where router is your router).
      </p>
      <p>
        The second thing is how to re-render your application when the location
        changes. By having the route's <IJS>match.response</IJS> function set
        Svelte render functions as the response's <IJS>body</IJS> we can just
        call <IJS>response.body</IJS> to render our view. We will also want to
        destroy the current view before doing this. All of this should be done
        in a response handler function (<IJS>router.respond(fn)</IJS>).
      </p>
    </Section>

    <Section title="Live Demo" id="demo">
      <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/svelte/basic" />
    </Section>

    <Section title="On GitHub" id="source">
      <p>
        If you want to run this code locally, the source code is available on
        GitHub{" "}
        <a href="https://github.com/pshrmn/curi/tree/master/examples/svelte/basic">
          here
        </a>.
      </p>
    </Section>
  </BaseExample>
);
