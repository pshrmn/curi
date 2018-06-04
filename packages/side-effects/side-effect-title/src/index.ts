import { Observer, Emitted } from "@curi/router";

export interface TitleOptions {
  prefix?: string;
  suffix?: string;
  delimiter?: string;
}

export default function createTitleSideEffect(
  options?: TitleOptions
): Observer {
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
