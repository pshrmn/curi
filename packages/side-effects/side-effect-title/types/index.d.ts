import { Observer, Emitted } from "@curi/router";
export declare type TitleBuilder = (emitted: Emitted) => string;
export default function createTitleSideEffect(callback: TitleBuilder): Observer;
