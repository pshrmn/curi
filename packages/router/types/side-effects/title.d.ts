import { Observer, Emitted } from "@curi/types";
export declare type TitleBuilder = (emitted: Emitted) => string;
export default function title(callback: TitleBuilder): Observer;
