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
                In order for the components provided by this package to work,
                they need to have access to your Curi router object.
              </p>
            </Explanation>
            <CodeBlock lang="html">
              {`<div>
  <Link to='Home'>Home</Link>
  <Link to='User' params='{ { userID: 5 } }'>
    Profile
  </Link>
</div>
<script>
  import { Link } from '@curi/svelte';
  export default {
    components: { Link }
  }
</script>`}
            </CodeBlock>

            <Section title="Props" id="link-props" tag="h3">
              <ul>
                <li>
                  <Explanation>
                    <p>
                      <IJS>to</IJS> - the name of the route to link to
                    </p>
                  </Explanation>
                  <CodeBlock lang="html">
                    {`<Link to="Home">Home</Link>
<!-- <a href="/">Home</a> -->`}
                  </CodeBlock>
                </li>
                <li>
                  <Explanation>
                    <p>
                      <IJS>params</IJS> - any route params for the linked route
                    </p>
                  </Explanation>
                  <CodeBlock lang="html">
                    {`<Link to="User" params='{ { userID: 5 } }'>
  Profile
</Link>
<!-- <a href="/user/5">Profile</a> -->`}
                  </CodeBlock>
                </li>
                <li>
                  <Explanation>
                    <p>
                      <IJS>hash</IJS> - the hash for the location to link to
                    </p>
                  </Explanation>
                  <CodeBlock lang="html">
                    {`<Link to="Home" hash="test">Home</Link>
<!-- <a href="/#test">Home</a> -->`}
                  </CodeBlock>
                </li>
                <li>
                  <Explanation>
                    <p>
                      <IJS>query</IJS> - the query for the location to link to
                    </p>
                  </Explanation>
                  <CodeBlock lang="html">
                    {`<Link to="Home" query="one=1">Home</Link>
<!-- <a href="/?one=1">Home</a> -->`}
                  </CodeBlock>
                </li>
                <li>
                  <Explanation>
                    <IJS>state</IJS> - the state to associated with the location
                  </Explanation>
                </li>
              </ul>
            </Section>
          </Section>
        </APIBlock>

        <Section title="Usage" id="usage">
          <Explanation>
            <p>
              For rendering your application, you should should have a base
              component that has any global layout and uses the response to
              render the correct component(s). Assuming you setup your store
              using <IJS>curiStore</IJS>, the components can access the router
              using <IJS>$router</IJS> and the response and navigation using{" "}
              <IJS>$curi.response</IJS> and <IJS>$curi.navigation</IJS>.
            </p>
          </Explanation>
          <CodeBlock lang="html">
            {`<!-- components/App.html -->
<NavLinks />
<svelte:component this={$curi.response.body} />

<script>
  import NavLinks from './NavLinks.html';

  export default {
	  components: { NavLinks }
  };
</script>`}
          </CodeBlock>

          <Explanation>
            <p>
              In your index file, setup an observer to render this component,
              making sure to pass the store to the component.
            </p>
          </Explanation>
          <CodeBlock>
            {`import app from './components/app';

const store = curiStore(router);

// use a one time subscriber for the initial render
router.once(() => {
  view = new app({ target, store });
});`}
          </CodeBlock>
        </Section>
      </React.Fragment>
    );
  }
}
