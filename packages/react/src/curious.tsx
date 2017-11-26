import React from 'react';
import PropTypes from 'prop-types';
import hoist from 'hoist-non-react-statics';
import { CuriContext } from './interface';
import { CuriConfig, Response } from '@curi/core';

export interface CuriousProps {
  internalRef?: (node: any) => void;
  children?: any;
}

export interface CuriousComponent {
  curi?: CuriConfig;
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
        curi={context.curi.config}
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
      config: PropTypes.object.isRequired,
      response: PropTypes.object.isRequired,
      action: PropTypes.string
    }).isRequired
  };

  return hoist(CuriousComponent, WrappedComponent);
}
