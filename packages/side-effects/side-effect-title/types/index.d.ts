import { Observer } from "@curi/router";
export interface TitleOptions {
    prefix?: string;
    suffix?: string;
    delimiter?: string;
}
export default function createTitleSideEffect(options?: TitleOptions): Observer;
