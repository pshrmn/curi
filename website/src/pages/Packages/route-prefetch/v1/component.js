import React from "react";

import {
  About,
  APIBlock,
  IJS,
  Note
} from "../../../../components/package/common";
import { PrefetchAPI } from "./prefetch";

export default class RoutePrefetchPkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <About>
          <p>
            The prefetch route interaction can be used fetch data for a route
            prior to navigating. The interaction will call a route's{" "}
            <IJS>resolve</IJS> functions (if they exist on the route).
          </p>
          <p>
            Prefetching data means results in faster renders after navigation
            because you don't have to wait for the data to load.
          </p>
        </About>

        <Note>
          <p>
            Prefetching <IJS>resolve</IJS> function calls is only beneficial if
            you cache the results because the function will be re-called when
            the user navigates to that route. Functions wrapped by the{" "}
            <IJS>once()</IJS> wrapper (from <IJS>@curi/helpers</IJS>) will
            automatically re-use the results from their first call.
          </p>
        </Note>

        <APIBlock>
          <PrefetchAPI />
        </APIBlock>
      </React.Fragment>
    );
  }
}
