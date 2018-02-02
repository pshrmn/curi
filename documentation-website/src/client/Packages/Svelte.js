import React from "react";
import BasePackage from "./base/BasePackage";
import APIBlock from "./base/APIBlock";
import {
  InlineJS as IJS,
  InlineComponent as Cmp,
  PrismBlock
} from "../components/PrismBlocks";
import { Section, Subsection } from "../components/Sections";

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={
      <p>
        This package enables you to use Curi alongside Svelte.{" "}
        <strong>This package relies on the Svelte store.</strong>
      </p>
    }
  >
    <APIBlock>
      <Section tag="h3" title="curiStore" id="curiStore">
        <p>
          <IJS>@curi/svelte</IJS> components rely on being able to access router
          related values (<IJS>router</IJS>, <IJS>response</IJS>, and{" "}
          <IJS>navigation</IJS>) from a Svelte store. While you can set this up
          manually, the <IJS>curiStore</IJS> will handle this for you.
        </p>
        <p>
          This will setup a response handler to automatically update the store
          when new responses are emitted by the router.
        </p>
        <PrismBlock lang="javascript">
          {`import { curiStore } from '@curi/svelte';

const router = curi(history, routes);
const store = curiStore(router);`}
        </PrismBlock>
        <p>
          If you already have a store, you can pass it to <IJS>curiStore</IJS>{" "}
          and the Curi values will be added to it.
        </p>
        <PrismBlock lang="javascript">
          {`import { curiStore } from '@curi/svelte';
import { Store } from 'svelte/store';

const router = curi(history, routes);
const store = new Store({...});
curiStore(router, store);`}
        </PrismBlock>
      </Section>
      <Section tag="h3" title={<Cmp>Link</Cmp>} id="link">
        <p>
          In order for the components provided by this package to work, they
          need to have access to your Curi router object.
        </p>

        <PrismBlock lang="html">
          {`<div>
  <Link to='Home'>Home</Link>
  <Link to='User' params='{{ { userID: 5 } }}'>Profile</Link>
</div>
<script>
  import { Link } from '@curi/svelte';
  export default {
    components: { Link }
  }
</script>`}
        </PrismBlock>
        <Subsection title="Props" id="link-props">
          <ul>
            <li>
              <IJS>to</IJS> - the name of the route to link to
            </li>
            <li>
              <IJS>params</IJS> - any route params for the linked route
            </li>
            <li>
              <IJS>details</IJS> - additional location information (<IJS>
                query
              </IJS>, <IJS>hash</IJS>, <IJS>state</IJS> for the linked
              location).
            </li>
          </ul>
        </Subsection>
      </Section>
    </APIBlock>

    <Section title="Usage" id="usage">
      <p>
        For rendering your application, you should should have a base component
        that has any global layout and uses the response to render the correct
        component(s). Assuming you setup your store using <IJS>curiStore</IJS>,
        the components can access the router using <IJS>$router</IJS> and the
        response and navigation using <IJS>$curi.response</IJS> and{" "}
        <IJS>$curi.navigation</IJS>.
      </p>
      <PrismBlock lang="html">
        {`<!-- components/App.html -->
<NavLinks />
<:Component {$curi.response.body}></:Component>

<script>
  import NavLinks from './NavLinks.html';

  export default {
	  components: { NavLinks }
  };
</script>`}
      </PrismBlock>
      <p>
        In your index file, setup a one time response handler to render this
        component, making sure to pass the store to the component.
      </p>
      <PrismBlock lang="javascript">
        {`import app from './components/app';

const store = curiStore(router);

// use a one time subscriber for the initial render
router.respond(() => {
  view = new app({ target, store });
});`}
      </PrismBlock>
    </Section>
  </BasePackage>
);
