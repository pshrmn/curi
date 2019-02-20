import { Observer, Emitted } from "@curi/router";

export default function createScrollSideEffect(): Observer {
  return function({ response, navigation }: Emitted): void {
    if (navigation.action === "pop") {
      return;
    }

    // we want to wait to scroll until after the re-render,
    // so we use setTimeout to push this onto the event loop
    setTimeout(() => {
      const { hash } = response.location;
      if (hash !== "") {
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
