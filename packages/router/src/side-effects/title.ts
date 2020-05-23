import { Observer, Emitted } from "@curi/types";

export type TitleBuilder = (emitted: Emitted) => string;

let title = (callback: TitleBuilder): Observer => {
  return function(emitted) {
    document.title = callback(emitted);
  };
};

export default title;
