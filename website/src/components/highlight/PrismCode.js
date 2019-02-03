import React from "react";

function PrismCode(props) {
  const ref = React.createRef();
  const { component: Wrapper, children, ...rest } = props;

  React.useEffect(() => {
    // relies on Prism global...
    window.Prism && window.Prism.highlightElement(ref.current);
  }, [children]);

  return (
    <Wrapper ref={ref} {...rest}>
      {children}
    </Wrapper>
  );
}

export default React.memo(PrismCode);
