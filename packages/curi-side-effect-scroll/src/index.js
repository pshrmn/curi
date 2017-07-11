function createScrollSideEffect(options) {

  return function(response, action) {
    if (action === 'PUSH' || action === 'REPLACE') {
      window.scrollTo(0, 0);
    }
  };
}

export default createScrollSideEffect;
