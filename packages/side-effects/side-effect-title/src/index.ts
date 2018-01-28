import { ResponseHandler, Emitted } from "@curi/core";

export interface TitleOptions {
  prefix?: string;
  suffix?: string;
  delimiter?: string;
}

function createTitleSideEffect(options?: TitleOptions): ResponseHandler {
  const { prefix = "", suffix = "", delimiter = "" } = options || {};

  return function({ response }: Emitted) {
    const parts: Array<string> = [];
    if (prefix !== "") {
      parts.push(prefix, delimiter);
    }
    parts.push(response.title);
    if (suffix !== "") {
      parts.push(delimiter, suffix);
    }
    document.title = parts.join(" ");
  };
}

export default createTitleSideEffect;
