import React from 'react';
import PropTypes from 'prop-types';
import hoist from 'hoist-non-react-statics';
import { CuriContext } from './interface';
import { CuriConfig, AnyResponse } from '@curi/core';

export interface CuriousProps {
  internalRef?: (node: any) => void;
  children?: any;
}

export interface CuriousComponent {
  curi?: CuriConfig;
  response?: AnyResponse;
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
        curi={context.curi}
        response={context.curiResponse}
        {...rest}
        ref={internalRef}
      />
    );
  };

  CuriousComponent.displayName = `curious(${WrappedComponent.displayName ||
    WrappedComponent.name})`;

  CuriousComponent.contextTypes = {
    curi: PropTypes.object.isRequired,
    curiResponse: PropTypes.object.isRequired
  };

  return hoist(CuriousComponent, WrappedComponent);
}
