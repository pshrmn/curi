import { Observer, Response } from "@curi/router";
export declare type TitleBuilder = (response: Response) => string;
export default function createTitleSideEffect(callback: TitleBuilder): Observer;
