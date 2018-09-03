import { Observer, Emitted, Response } from "@curi/router";

export type TitleBuilder = (response: Response) => string;

export default function createTitleSideEffect(
  callback: TitleBuilder
): Observer {
  return function({ response }: Emitted) {
    const title = callback(response);
    document.title = title;
  };
}
