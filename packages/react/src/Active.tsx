import React from "react";
import { ReactElement } from "react";
import invariant from "invariant";
import { Consumer } from "./Context";

import { CuriRouter, Response } from "@curi/core";
import { HickoryLocation } from "@hickory/root";

export interface ActiveProps {
  children: ReactElement<any>;
  name: string;
  params?: object;
  partial?: boolean;
  merge(props: object): object;
  extra?(l: HickoryLocation, d: object): boolean;
  details?: object;
}

export interface BaseActiveProps extends ActiveProps {
  router: CuriRouter;
  response: Response;
}

function isActive(props: BaseActiveProps) {
  const {
    extra,
    partial = false,
    name,
    params,
    details,
    router,
    response
  } = props;
  return (
    router.addons.active(name, response, params, partial) &&
    (extra ? extra(response.location, details) : true)
  );
}

const BaseActive = (props: BaseActiveProps) => {
  invariant(
    props.router.addons.active,
    'You are attempting to use the "active" prop, but have not included the "active" ' +
      "addon (@curi/addon-active) in your Curi router."
  );

  const { children, merge } = props;
  return isActive(props)
    ? React.cloneElement(children, merge({ ...children.props }))
    : children;
};

const Active = (props: ActiveProps): React.ReactElement<any> => (
  <Consumer>
    {({ router, response }) => (
      <BaseActive {...props} router={router} response={response} />
    )}
  </Consumer>
);

export default Active;
