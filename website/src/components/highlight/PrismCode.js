import React from "react";

let PrismCode = props => {
  let ref = React.createRef();
  let { component: Wrapper, children, className, ...rest } = props;

  React.useEffect(() => {
    // relies on Prism global...
    window.Prism && window.Prism.highlightElement(ref.current);
  }, [children]);

  return (
    <Wrapper
      ref={ref}
      {...rest}
      className={`${className} md:whitespace-pre-wrap`}
    >
      {children}
    </Wrapper>
  );
};

export default React.memo(PrismCode);
