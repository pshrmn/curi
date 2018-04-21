import React from "react";
import { ReactElement } from "react";
import invariant from "invariant";
import { Curious } from "./Context";

import { CuriRouter, Response } from "@curi/core";
import { HickoryLocation } from "@hickory/root";

export type ActiveChildren = (active: boolean) => ReactElement<any>;

export interface ActiveProps {
  children: ActiveChildren;
  name: string;
  params?: object;
  partial?: boolean;
  validate?(l: HickoryLocation, d: object): boolean;
  details?: object;
}

export interface BaseActiveProps extends ActiveProps {
  router: CuriRouter;
  response: Response;
}

function isActive(props: BaseActiveProps) {
  const {
    validate,
    partial = false,
    name,
    params,
    details,
    router,
    response
  } = props;
  return (
    router.route.active(name, response, params, partial) &&
    (validate ? validate(response.location, details) : true)
  );
}

const BaseActive = (props: BaseActiveProps) => {
  invariant(
    props.router.route.active,
    'You are attempting to use the "active" prop, but have not included the "active" ' +
      "route interaction (@curi/route-active) in your Curi router."
  );

  return props.children(isActive(props));
};

const Active = (props: ActiveProps): React.ReactElement<any> => (
  <Curious>
    {({ router, response }) => (
      <BaseActive {...props} router={router} response={response} />
    )}
  </Curious>
);

export default Active;
