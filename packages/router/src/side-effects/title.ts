import { SideEffect, Emitted } from "@curi/types";

export type TitleBuilder = (emitted: Emitted) => string;

export default function title(callback: TitleBuilder): SideEffect {
  return function(emitted) {
    document.title = callback(emitted);
  };
}
