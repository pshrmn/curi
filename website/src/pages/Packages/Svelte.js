import React from "react";
import { Link } from "@curi/react-dom";

import BasePackage from "./base/BasePackage";
import APIBlock from "./base/APIBlock";
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/PrismBlocks";
import { Section, Subsection } from "../../components/Sections";
import {
  SideBySide,
  CodeBlock,
  Explanation
} from "../../components/SideBySide";

export default class SveltePkg extends React.PureComponent {
  render() {
    const { name, version, globalName } = this.props;
    return (
      <BasePackage
        name={name}
        version={version}
        globalName={globalName}
        about={
          <div>
            <p>
              This package enables you to use Curi alongside Svelte.{" "}
              <strong>This package relies on the Svelte store.</strong>
            </p>
            <p>
              For more information on using Curi with Svelte, please check out
              the{" "}
              <Link to="Guide" params={{ slug: "svelte" }}>
                Svelte guide
              </Link>.
            </p>
          </div>
        }
      >
        <APIBlock>
          <Section tag="h3" title="curiStore" id="curiStore">
            <SideBySide>
              <Explanation>
                <p>
                  <IJS>@curi/svelte</IJS> components rely on being able to
                  access router related values (<IJS>router</IJS>,{" "}
                  <IJS>response</IJS>, and <IJS>navigation</IJS>) from a Svelte
                  store. While you can set this up manually, the{" "}
                  <IJS>curiStore</IJS> will handle this for you.
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
            </SideBySide>
            <SideBySide>
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
            </SideBySide>
          </Section>
          <Section tag="h3" title={<Cmp>Link</Cmp>} id="link">
            <SideBySide>
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
            </SideBySide>
            <Subsection title="Props" id="link-props">
              <ul>
                <li>
                  <SideBySide>
                    <Explanation>
                      <p>
                        <IJS>to</IJS> - the name of the route to link to
                      </p>
                    </Explanation>
                    <CodeBlock lang="html">
                      {`<Link to="Home">Home</Link>
<!-- <a href="/">Home</a> -->`}
                    </CodeBlock>
                  </SideBySide>
                </li>
                <li>
                  <SideBySide>
                    <Explanation>
                      <p>
                        <IJS>params</IJS> - any route params for the linked
                        route
                      </p>
                    </Explanation>
                    <CodeBlock lang="html">
                      {`<Link to="User" params='{ { userID: 5 } }'>
  Profile
</Link>
<!-- <a href="/user/5">Profile</a> -->`}
                    </CodeBlock>
                  </SideBySide>
                </li>
                <li>
                  <SideBySide>
                    <Explanation>
                      <p>
                        <IJS>hash</IJS> - the hash for the location to link to
                      </p>
                    </Explanation>
                    <CodeBlock lang="html">
                      {`<Link to="Home" hash="test">Home</Link>
<!-- <a href="/#test">Home</a> -->`}
                    </CodeBlock>
                  </SideBySide>
                </li>
                <li>
                  <SideBySide>
                    <Explanation>
                      <p>
                        <IJS>query</IJS> - the query for the location to link to
                      </p>
                    </Explanation>
                    <CodeBlock lang="html">
                      {`<Link to="Home" query="one=1">Home</Link>
<!-- <a href="/?one=1">Home</a> -->`}
                    </CodeBlock>
                  </SideBySide>
                </li>
                <li>
                  <SideBySide>
                    <Explanation>
                      <IJS>state</IJS> - the state to associated with the
                      location
                    </Explanation>
                  </SideBySide>
                </li>
              </ul>
            </Subsection>
          </Section>
        </APIBlock>

        <Section title="Usage" id="usage">
          <SideBySide>
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
          </SideBySide>
          <SideBySide>
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
          </SideBySide>
        </Section>
      </BasePackage>
    );
  }
}
