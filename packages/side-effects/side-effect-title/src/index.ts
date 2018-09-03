import { Observer, Emitted } from "@curi/router";

export type TitleBuilder = (emitted: Emitted) => string;

export default function createTitleSideEffect(
  callback: TitleBuilder
): Observer {
  return function(emitted: Emitted) {
    document.title = callback(emitted);
  };
}
