import React from 'react';
import BasePackage from './base/BasePackage';
import APIBlock from './base/APIBlock';
import {
  InlineJS as IJS,
  InlineComponent as Cmp,
  PrismBlock
} from '../components/PrismBlocks';
import { Section, Subsection } from '../components/Sections';

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={
      <p>
        This package enables you to use Curi alongside Svelte.{' '}
        <strong>This package relies on the Svelte store.</strong>
      </p>
    }
  >
    <APIBlock>
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
        The components exported by <IJS>@curi/svelte</IJS> rely on Svelte's
        store. The store should include a <IJS>curi</IJS> property that has a{' '}
        <IJS>router</IJS> property.
      </p>
      <PrismBlock lang="javascript">
        {`import { Store } from 'svelte/store';

const router = curi(history, routes);
const store = new Store({
  curi: { router }
});`}
      </PrismBlock>
      <p>
        Add a subscriber to the router to update the store whenever a new
        response is emitted.
      </p>
      <PrismBlock lang="javascript">
        {`router.respond((response, action) => {
  store.set({ curi: { router, response, action } });
});`}
      </PrismBlock>
      <p>
        As far as rendering your application goes, you should should have a base
        component that has any global layout and uses the response to render the
        correct component(s). Setup a one time subscriber to render this
        component and make sure to pass the store to the component.
      </p>
      <PrismBlock lang="html">
        {`<NavLinks />
<:Component {$curi.response.body}></:Component>

<script>
  import NavLinks from './NavLinks.html';

  export default {
	  components: { NavLinks }
  };
</script>`}
      </PrismBlock>
      <PrismBlock lang="javascript">
        {`import app from './components/app';

// use a one time subscriber for the initial render
config.respond(() => {
  view = new app({ target, store });
}, { once: true });`}
      </PrismBlock>
    </Section>
  </BasePackage>
);
