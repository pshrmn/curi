import { Observer, Emitted } from "@curi/types";

export type TitleBuilder = (emitted: Emitted) => string;

export default function title(callback: TitleBuilder): Observer {
  return function(emitted) {
    document.title = callback(emitted);
  };
}