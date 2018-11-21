import React from "react";
import { Link } from "@curi/react-dom";

import APIBlock from "../../components/package/APIBlock";
import About from "../../components/package/About";
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/highlight/Inline";
import { Section } from "../../components/layout/Sections";
import { CodeBlock, Explanation } from "../../components/layout/Groups";

export default class SveltePkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <About>
          <Explanation>
            <p>
              This package enables you to use Curi alongside Svelte.{" "}
              <strong>This package relies on the Svelte store.</strong>
            </p>
            <p>
              For more information on using Curi with Svelte, please check out
              the{" "}
              <Link name="Guide" params={{ slug: "svelte" }}>
                Svelte guide
              </Link>.
            </p>
          </Explanation>
        </About>
        <APIBlock>
          <Section tag="h3" title="curiStore" id="curiStore">
            <Explanation>
              <p>
                <IJS>@curi/svelte</IJS> components rely on being able to access
                router related values (<IJS>router</IJS>, <IJS>response</IJS>,
                and <IJS>navigation</IJS>) from a Svelte store. While you can
                set this up manually, the <IJS>curiStore</IJS> will handle this
                for you.
              </p>
              <p>
                This will setup an observer to automatically update the store
                when new responses are emitted by the router.
              </p>
            </Explanation>
            <CodeBlock>
              {`import { curiStore } from '@curi/svelte';

const router = curi(history, routes);
const store = curiStore(router);`}
            </CodeBlock>

            <Explanation>
              <p>
                If you already have a store, you can pass it to{" "}
                <IJS>curiStore</IJS> and the Curi values will be added to it.
              </p>
            </Explanation>
            <CodeBlock>
              {`import { curiStore } from '@curi/svelte';
import { Store } from 'svelte/store';

const router = curi(history, routes);
const store = new Store({...});
curiStore(router, store);`}
            </CodeBlock>
          </Section>

          <Section tag="h3" title={<Cmp>Link</Cmp>} id="link">
            <Explanation>
              <p>
                The <Cmp>Link</Cmp> component is used to create an anchor for
                navigating to another route.
              </p>
            </Explanation>
            <CodeBlock lang="html">
              {`<div>
  <Link name='Home'>Home</Link>
  <Link name='User' params={{ userID: 5 }}>
    Profile
  </Link>
</div>

<script>
  import Link from '@curi/svelte/components/Link.html';
  export default {
    components: { Link }
  }
</script>`}
            </CodeBlock>

            <Section title="Props" id="link-props" tag="h3">
              <Section title="name" id="link-name" tag="h4">
                <Explanation>
                  <p>The name of the route to link to.</p>
                </Explanation>
                <CodeBlock lang="html">
                  {`<Link name="Home">Home</Link>
<!-- <a href="/">Home</a> -->`}
                </CodeBlock>
              </Section>

              <Section title="params" id="link-params" tag="h4">
                <Explanation>
                  <p>An object of route params for the linked route.</p>
                </Explanation>
                <CodeBlock lang="html">
                  {`<Link name="User" params={{ userID: 5 }}>
  Profile
</Link>
<!-- <a href="/user/5">Profile</a> -->`}
                </CodeBlock>
              </Section>

              <Section title="hash" id="link-hash" tag="h4">
                <Explanation>
                  <p>The hash for the location to link to.</p>
                </Explanation>
                <CodeBlock lang="html">
                  {`<Link name="Home" hash="test">Home</Link>
<!-- <a href="/#test">Home</a> -->`}
                </CodeBlock>
              </Section>

              <Section title="query" id="link-query" tag="h4">
                <Explanation>
                  <p>The query for the location to link to.</p>
                </Explanation>
                <CodeBlock lang="html">
                  {`<Link name="Home" query="one=1">Home</Link>
<!-- <a href="/?one=1">Home</a> -->`}
                </CodeBlock>
              </Section>

              <Section title="state" id="link-state" tag="h4">
                <Explanation>
                  Some (ephemeral) state associated with the location.
                </Explanation>
              </Section>
            </Section>

            <Section tag="h3" title={<Cmp>Navigating</Cmp>} id="navigating">
              <Explanation>
                <p>
                  The <Cmp>Navigating</Cmp> component is used to cancel an
                  active asynchronous navigation.
                </p>
                <p>
                  A component is passed to <Cmp>Navigating</Cmp>. When there is
                  an active asynchronous navigation, the component will be given
                  a <IJS>cancel</IJS> function. When there is not an active
                  asynchronous navigation, <IJS>cancel</IJS> will be{" "}
                  <IJS>undefined</IJS>.
                </p>
              </Explanation>
              <CodeBlock lang="html">
                {`<Navigating component={Cancel} />

<script>
  import Navigating from "@curi/svelte/components/Navigating.html";
  import Cancel from "./Cancel";

  export default {
    components: { Navigating },
    data() {
      return { Cancel };
    }
  }
</script>`}
              </CodeBlock>

              <Section title="Props" id="navigating-props" tag="h3">
                <Section title="component" id="navigating-component" tag="h4">
                  <Explanation>
                    <p>
                      A component that receives a <IJS>cancel</IJS> function
                      when there is an active asynchronous navigation.
                    </p>
                  </Explanation>
                  <CodeBlock lang="html">
                    {`{#if typeof cancel === "function"}
  <button on:click="cancelHandler(event, cancel)">
    Cancel Navigation
  </button>
{/if}

<script>
  export default {
    methods: {
      cancelHandler(event, cancel) {
        event.preventDefault();
        cancel();
      }
    }
  };
</script>`}
                  </CodeBlock>
                </Section>
              </Section>
            </Section>
          </Section>
        </APIBlock>
      </React.Fragment>
    );
  }
}
