import React from "react";
import { Link } from "@curi/react";

import BasePackage from "./base/BasePackage";
import APIBlock from "./base/APIBlock";
import {
  PrismBlock,
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../components/PrismBlocks";
import { Section } from "../components/Sections";
import { Note } from "../components/Messages";

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={
      <p>
        This package allows you to synchronize the response objects generated by
        Curi with your Redux store. Whenever location changes occur, they will
        be dispatched to your store.
      </p>
    }
  >
    <APIBlock>
      <PrismBlock lang="javascript">
        {`import { syncResponses, curiReducer } from '@curi/redux';`}
      </PrismBlock>

      <Section tag="h3" title="syncResponses" id="syncResponses">
        <p>
          <IJS>syncResponses</IJS> is responsible for linking your Redux store
          with your Curi router. It subscribes to location changes emitted from
          your router with a function that will dispatch a "location changed"
          event to the Redux store. It will also add your Curi router to the
          store.
        </p>
        <PrismBlock lang="javascript">
          {`const router = curi(history, routes);
const store = createStore(reducer);

syncResponses(store, router);
// whenever navigation happens, the router will now
// pass the response and navigation to your Redux store.
`}
        </PrismBlock>
      </Section>

      <Section tag="h3" title="curiReducer" id="curiReducer">
        <p>
          The <IJS>curiReducer</IJS> keeps track of your Curi router, the latest
          response object, and the latest navigation object in your Redux store.
        </p>
        <PrismBlock lang="javascript">
          {`const router = curi(history, routes);
const reducer = combineReducers({
  curi: curiReducer,
  ...
});
const store = createStore(reducer);
syncResponses(store, router);
const { curi } = store.getState();
// curi = { router, response, navigation }`}
        </PrismBlock>
      </Section>
    </APIBlock>
  </BasePackage>
);
