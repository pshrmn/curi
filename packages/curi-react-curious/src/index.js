import React from 'react';
import PropTypes from 'prop-types';
import hoist from 'hoist-non-react-statics';

export default function curious(WrappedComponent) {
  function CuriousComponent(props, context) {
    const { internalRef, ...rest } = props;
    return (
      <WrappedComponent
        curi={context.curi}
        response={context.curiResponse}
        {...rest}
        ref={internalRef}
      />
    );
  }

  CuriousComponent.displayName = `curious(${WrappedComponent.displayName || WrappedComponent.name})`;
  CuriousComponent.contextTypes = {
    curi: PropTypes.object.isRequired,
    curiResponse: PropTypes.object.isRequired
  };
  CuriousComponent.propTypes = {
    internalRef: PropTypes.func
  };

  return hoist(CuriousComponent, WrappedComponent);
}
