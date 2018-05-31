import { Observer } from "@curi/core";
export interface TitleOptions {
    prefix?: string;
    suffix?: string;
    delimiter?: string;
}
export default function createTitleSideEffect(options?: TitleOptions): Observer;
