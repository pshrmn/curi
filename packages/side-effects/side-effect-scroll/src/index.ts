import { ResponseHandler, Response } from '@curi/core';

function createScrollSideEffect(): ResponseHandler {
  return function(response: Response, action: string): void {
    if (action === 'POP') {
      return;
    }

    // we want to wait to scroll until after the re-render,
    // so we use setTimeout to push this onto the event loop
    setTimeout(() => {
      const { hash } = response.location;
      if (hash !== '') {
        const element = document.getElementById(hash);
        if (element && element.scrollIntoView) {
          element.scrollIntoView();
          return;
        }
      }
      // if there is no hash, no element matching the hash,
      // or the browser doesn't support, we will just scroll
      // to the top of the page
      window.scrollTo(0, 0);
    }, 0);
  };
}

export default createScrollSideEffect;
