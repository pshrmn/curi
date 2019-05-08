import { SideEffect } from "@curi/types";

export default function scroll(): SideEffect {
  return function({ response, navigation }) {
    if (navigation.action === "pop") {
      return;
    }

    // wait until after the re-render to scroll
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
