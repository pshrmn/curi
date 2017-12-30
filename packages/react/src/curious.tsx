import React from 'react';
import PropTypes from 'prop-types';
import hoist from 'hoist-non-react-statics';
import { CuriContext } from './interface';
import { CuriRouter, Response } from '@curi/core';

export interface CuriousProps {
  internalRef?: (node: any) => void;
  children?: any;
}

export interface CuriousComponent {
  router?: CuriRouter;
  response?: Response;
  ref?: (node: any) => void;
}

export default function curious(
  WrappedComponent: React.ComponentType<CuriousComponent>
) {
  const CuriousComponent: React.StatelessComponent = (
    props: CuriousProps,
    context: CuriContext
  ) => {
    const { internalRef, ...rest } = props;
    return (
      <WrappedComponent
        router={context.curi.router}
        response={context.curi.response}
        {...rest}
        ref={internalRef}
      />
    );
  };

  CuriousComponent.displayName = `curious(${WrappedComponent.displayName ||
    WrappedComponent.name})`;

  CuriousComponent.contextTypes = {
    curi: PropTypes.shape({
      router: PropTypes.object.isRequired,
      response: PropTypes.object.isRequired,
      action: PropTypes.string
    }).isRequired
  };

  return hoist(CuriousComponent, WrappedComponent);
}
