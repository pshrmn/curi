import { Observer, Emitted } from "@curi/router";
export declare type TitleBuilder = (emitted: Emitted) => string;
export default function create_title_side_effect(callback: TitleBuilder): Observer;
